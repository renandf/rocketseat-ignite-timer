import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from "react"
import { TasksContext } from '../../../contexts/TasksContext'
import { CountdownContainer, Separator } from "./styles"

export function Countdown() {
  const {
    activeTask,
    activeTaskId,
    secondsPassed,
    markCurrentTaskAsFinished,
    setNumberOfSecondsPassed
  } = useContext(TasksContext)
  
  const taskSeconds = activeTask ? activeTask.durationMinutes * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeTask) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeTask.startDate
        )

        if (secondsDifference >= taskSeconds) {
          markCurrentTaskAsFinished()
          setNumberOfSecondsPassed(taskSeconds)
          clearInterval(interval)
        } else {
          setNumberOfSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeTask,
    activeTaskId,
    taskSeconds,
    markCurrentTaskAsFinished,
    setNumberOfSecondsPassed
  ])

  const currentSeconds = activeTask ? taskSeconds - secondsPassed : 0
  
  const minutesLeft = Math.floor(currentSeconds / 60)
  const secondsLeft = currentSeconds % 60

  const minutesLeftStr = String(minutesLeft).padStart(2, '0')
  const secondsLeftStr = String(secondsLeft).padStart(2, '0')

  useEffect(() => {
    if (activeTask) {
      document.title = `${minutesLeftStr}:${secondsLeftStr}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [activeTask, minutesLeftStr, secondsLeftStr])

  return (
    <CountdownContainer>
      <span>{minutesLeftStr[0]}</span>
      <span>{minutesLeftStr[1]}</span>
      <Separator>:</Separator>
      <span>{secondsLeftStr[0]}</span>
      <span>{secondsLeftStr[1]}</span>
    </CountdownContainer>
  )
}