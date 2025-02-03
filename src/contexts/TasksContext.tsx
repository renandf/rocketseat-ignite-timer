import { createContext, ReactNode, useReducer, useState } from 'react';
import { ActionTypes, Task, tasksReducer } from '../reducers/tasks';

interface CreateTaskData {
  task: string;
  durationMinutes: number;
}

interface TasksContextType {
  tasks: Task[]
  activeTask: Task | undefined
  activeTaskId: string | null
  secondsPassed: number
  markCurrentTaskAsFinished: () => void
  setNumberOfSecondsPassed: (seconds: number) => void
  createNewTask: (data: CreateTaskData) => void
  stopCurrentTask: () => void
}

export const TasksContext = createContext({} as TasksContextType)

interface TasksContextProviderProps {
  children: ReactNode
}

export function TasksContextProvider({
  children
}: TasksContextProviderProps) {
  const [tasksState, dispatch] = useReducer(tasksReducer, {
      tasks: [],
      activeTaskId: null,
    },
  )

  const [secondsPassed, setSecondsPassed] = useState(0)
  
  const { tasks, activeTaskId } = tasksState

  const activeTask = tasks.find(task => task.id === activeTaskId)

  function setNumberOfSecondsPassed(seconds: number) {
    setSecondsPassed(seconds)
  }

  function markCurrentTaskAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_TASK_AS_FINISHED,
      payload: {
        activeTaskId,
      },
    })
  }

  function createNewTask(data: CreateTaskData) {
    const newTask: Task = {
      id: String(new Date().getTime()),
      task: data.task,
      durationMinutes: data.durationMinutes,
      startDate: new Date(),
    }

    dispatch({
      type: ActionTypes.ADD_NEW_TASK,
      payload: {
        newTask,
      },
    })

    setSecondsPassed(0)
  }

  function stopCurrentTask() {
    dispatch({
      type: ActionTypes.STOP_CURRENT_TASK,
      payload: {
        activeTaskId,
      },
    })
  }

  return (
    <TasksContext.Provider value={{
      tasks,
      activeTask,
      activeTaskId,
      secondsPassed,
      markCurrentTaskAsFinished,
      setNumberOfSecondsPassed,
      createNewTask,
      stopCurrentTask
    }}>
      { children }
    </TasksContext.Provider>
  )
}