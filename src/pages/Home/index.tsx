import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  DurationMinutesInput,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
  TaskInput
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">I will focus on</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="type activity name..."
            list="task-suggestions"
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
          disabled
        >
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}