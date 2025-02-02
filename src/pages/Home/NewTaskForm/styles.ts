import styled from 'styled-components'

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