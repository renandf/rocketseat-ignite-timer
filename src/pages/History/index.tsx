import { formatDistanceToNow } from 'date-fns'
import { useContext } from 'react'
import { TasksContext } from '../../contexts/TasksContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { tasks } = useContext(TasksContext)

  return (
    <HistoryContainer>
      <h1>Activity history</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Started</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map(task => {
              return (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>{task.durationMinutes} minutes</td>
                  <td>
                    {formatDistanceToNow(
                      task.startDate,
                      {addSuffix: true}
                    )}
                  </td>
                  <td>
                    {task.finishDate && (
                      <Status 
                        statusColor="green"
                      >
                        Completed
                      </Status>
                    )}
                    {task.stopDate && (
                      <Status 
                        statusColor="red"
                      >
                        Stopped
                      </Status>
                    )}
                    {(!task.finishDate && !task.stopDate) && (
                      <Status 
                        statusColor="yellow"
                      >
                        In progress
                      </Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}