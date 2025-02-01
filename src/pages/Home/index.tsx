import { zodResolver } from '@hookform/resolvers/zod'
import { Play } from 'phosphor-react'
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

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      task: '',
      durationMinutes: 0,
    }
  })

  function handleNewTask(data: NewTaskFormData) {
    console.log(data)
    reset()
  }

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
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