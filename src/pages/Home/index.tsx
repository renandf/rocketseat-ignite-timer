import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import {
  ActiveTaskTitle,
  CountdownContainer,
  DurationMinutesInput,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput
} from './styles'

const newTaskFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Please name your activity'),
  durationMinutes: zod.number().min(5).max(90),
})

// zod can infer type, which replaces
// the need for an interface
type NewTaskFormData = zod.infer<typeof newTaskFormValidationSchema>

interface Task {
  id: string;
  task: string;
  durationMinutes: number;
  startDate: Date;
  stopDate?: Date;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      task: '',
      durationMinutes: 0,
    }
  })

  const activeTask = tasks.find(task => task.id === activeTaskId)

  useEffect(() => {
    let interval: number

    if (activeTask) {
      interval = setInterval(() => {
        setSecondsPassed(
          differenceInSeconds(new Date(), activeTask.startDate)
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeTask])

  function handleNewTask(data: NewTaskFormData) {
    const newTask: Task = {
      id: String(new Date().getTime()),
      task: data.task,
      durationMinutes: data.durationMinutes,
      startDate: new Date(),
    }

    setTasks(state => [...state, newTask])
    setActiveTaskId(newTask.id)
    setSecondsPassed(0)

    reset()
  }

  function handleStopTask() {
    setTasks(tasks.map(task => {
      if (task.id === activeTaskId) {
        return { ...task, stopDate: new Date() }
      } else {
        return task
      }
    }))
    
    setActiveTaskId(null)
  }

  const taskSeconds = activeTask ? activeTask.durationMinutes * 60 : 0
  const currentSeconds = activeTask ? taskSeconds - secondsPassed : 0

  const minutesLeft = Math.floor(currentSeconds / 60)
  const secondsLeft = currentSeconds % 60

  const minutesLeftStr = String(minutesLeft).padStart(2, '0')
  const secondsLeftStr = String(secondsLeft).padStart(2, '0')

  useEffect(() => {
    if (activeTask) {
      document.title = `${minutesLeftStr}:${secondsLeftStr}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [activeTask, minutesLeftStr, secondsLeftStr])

  // Watch 'task' input to enable submit button
  const task = watch('task')

  return (
    <HomeContainer>
      <form
        onSubmit={handleSubmit(handleNewTask)}
        action=""
      >
        { activeTask ? (
          <ActiveTaskTitle>
            <span>Focusing on:</span>
            <h2>{activeTask.task}</h2>
          </ActiveTaskTitle>
        ) : (
          <FormContainer>
            <label htmlFor="task">I will focus on</label>
            <TaskInput
              type="text"
              id="task"
              placeholder="type activity name..."
              list="task-suggestions"
              disabled={!!activeTask}
              {...register('task')}
            />

            <datalist id="task-suggestions">
              <option value="Project example 1" />
              <option value="Project example 2" />
              <option value="Project example 3" />
              <option value="Another example" />
            </datalist>

            <label htmlFor="durationMinutes">for</label>
            <DurationMinutesInput
              type="number"
              id="durationMinutes"
              placeholder="00"
              step={5}
              min={5}
              max={90}
              disabled={!!activeTask}
              {...register(
                'durationMinutes',
                { valueAsNumber: true }
              )}
            />

            <span>minutes.</span>
          </FormContainer>
        )}

        <CountdownContainer>
          <span>{minutesLeftStr[0]}</span>
          <span>{minutesLeftStr[1]}</span>
          <Separator>:</Separator>
          <span>{secondsLeftStr[0]}</span>
          <span>{secondsLeftStr[1]}</span>
        </CountdownContainer>

        { activeTask ? (
          <StopCountdownButton
            type="button"
            onClick={handleStopTask}
          >
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            type="submit"
            disabled={!task}
          >
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}