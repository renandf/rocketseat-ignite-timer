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