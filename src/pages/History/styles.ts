import styled from 'styled-components';

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.4rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${props => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-block-start: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${props => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${props => props.theme['gray-100']};
      font-size: .875rem;
      line-height: 1.6;

      &:first-child {
        border-start-start-radius: 8px;
        padding-inline-start: 1.5rem;
      }

      &:last-child {
        border-start-end-radius: 8px;
        padding-inline-end: 1.5rem;
      }
    }

    td {
      background-color: ${props => props.theme['gray-700']};
      border-block-start: 4px solid ${props => props.theme['gray-800']};
      padding: 1rem;
      font-size: .875rem;
      line-height: 1.6;

      &:first-child {
        padding-inline-start: 1.5rem;
        width: 50%;
      }

      &:last-child {
        padding-inline-end: 1.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: .5rem;

  &::before {
    content: '';
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    background: ${props => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`