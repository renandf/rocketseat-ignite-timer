import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  color: ${props => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-block-end: 2px solid ${props => props.theme['gray-500']};
  font-weight: bold;
  font-style: 1.125rem;
  padding: 0 .5rem;
  color: ${props => props.theme['green-300']};
  
  transition: border-color .2s;
  
  &::placeholder {
    color: ${props => props.theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${props => props.theme['green-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  /* Hide datalist arrow on Chrome  */
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const DurationMinutesInput = styled(BaseInput)`
  width: 4rem;
`

export const ActiveTaskTitle = styled.div`
  width: 100%;

  h2 {
    color: ${props => props.theme['green-300']};
  }

  span {
    font-size: .875rem;
    font-style: normal;
    color: ${props => props.theme['gray-500']};
  }
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${props => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background-color: ${props => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${props => props.theme['green-500']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  font-weight: bold;
  cursor: pointer;
  
  color: ${props => props.theme['gray-100']};

  transition: background-color .2s, color .2s;

  &:disabled {
    cursor: not-allowed;
    background-color: ${props => props.theme['gray-700']};
    color: ${props => props.theme['gray-500']};
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${props => props.theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${props => props.theme['green-700']};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${props => props.theme['red-500']};

  &:not(:disabled):hover {
    background-color: ${props => props.theme['red-700']};
  }
`