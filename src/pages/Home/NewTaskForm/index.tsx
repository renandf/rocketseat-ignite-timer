import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { TasksContext } from '../../../contexts/TasksContext'

import {
  DurationMinutesInput,
  FormContainer,
  TaskInput
} from "./styles"

export function NewTaskForm() {
  const { activeTask } = useContext(TasksContext)
  const { register } = useFormContext()

  return (
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
  )
}