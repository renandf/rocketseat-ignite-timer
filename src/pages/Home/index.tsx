import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import {
  CountdownContainer,
  DurationMinutesInput,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
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
    if (activeTask) {
      setInterval(() => {
        setSecondsPassed(
          differenceInSeconds(new Date(), activeTask.startDate)
        )
      }, 1000)
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

    reset()
  }

  const taskSeconds = activeTask ? activeTask.durationMinutes * 60 : 0
  const currentSeconds = activeTask ? taskSeconds - secondsPassed : 0

  const minutesLeft = Math.floor(currentSeconds / 60)
  const secondsLeft = currentSeconds % 60

  const minutesLeftStr = String(minutesLeft).padStart(2, '0')
  const secondsLeftStr = String(secondsLeft).padStart(2, '0')

  // Watch 'task' input to enable submit button
  const task = watch('task')

  return (
    <HomeContainer>
      <form
        onSubmit={handleSubmit(handleNewTask)}
        action=""
      >
        <FormContainer>
          <label htmlFor="task">I will focus on</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="type activity name..."
            list="task-suggestions"
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
            {...register(
              'durationMinutes',
              { valueAsNumber: true }
            )}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutesLeftStr[0]}</span>
          <span>{minutesLeftStr[1]}</span>
          <Separator>:</Separator>
          <span>{secondsLeftStr[0]}</span>
          <span>{secondsLeftStr[1]}</span>
        </CountdownContainer>

        <StartCountdownButton
          type="submit"
          disabled={!task}
        >
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}