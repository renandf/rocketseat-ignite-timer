import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { TasksContext } from '../../contexts/TasksContext'
import { Countdown } from './Countdown'
import { NewTaskForm } from './NewTaskForm'
import {
  ActiveTaskTitle,
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newTaskFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Please name your activity'),
  durationMinutes: zod.number().min(5).max(90),
})

/* 
* zod can infer type, which replaces the need
* for an interface
*/
type NewTaskFormData = zod.infer<typeof newTaskFormValidationSchema>

export function Home() {
  const {
    activeTask,
    addNewTask,
    stopCurrentTask
  } = useContext(TasksContext)

  const newTaskForm = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      task: '',
      durationMinutes: 0,
    }
  })

  const { handleSubmit, watch, reset } = newTaskForm

  function handleAddNewTask(data: NewTaskFormData) {
    addNewTask(data)
    reset()
  }

  // Watch 'task' input to enable submit button
  const task = watch('task')

  return (
    <HomeContainer>
      <form
        onSubmit={handleSubmit(handleAddNewTask)}
        action=""
      >
        
        { activeTask ? (
          <ActiveTaskTitle>
            <span>Focusing on:</span>
            <h2>{activeTask.task}</h2>
          </ActiveTaskTitle>
        ) : (
          <FormProvider {...newTaskForm}>
            <NewTaskForm />
          </FormProvider>
        )}

        <Countdown />

        { activeTask ? (
          <StopCountdownButton
            type="button"
            onClick={stopCurrentTask}
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