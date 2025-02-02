import { createContext, ReactNode, useState } from 'react';

interface CreateTaskData {
  task: string;
  durationMinutes: number;
}

interface Task {
  id: string;
  task: string;
  durationMinutes: number;
  startDate: Date;
  stopDate?: Date;
  finishDate?: Date;
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

export function TasksContextProvider({ children }: TasksContextProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const activeTask = tasks.find(task => task.id === activeTaskId)

  function setNumberOfSecondsPassed(seconds: number) {
    setSecondsPassed(seconds)
  }

  function markCurrentTaskAsFinished() {
    setTasks(state => state.map(task => {
      if (task.id === activeTaskId) {
        return { ...task, finishDate: new Date() }
      } else {
        return task
      }
    }))
  }

  function createNewTask(data: CreateTaskData) {
    const newTask: Task = {
      id: String(new Date().getTime()),
      task: data.task,
      durationMinutes: data.durationMinutes,
      startDate: new Date(),
    }

    setTasks(state => [...state, newTask])
    setActiveTaskId(newTask.id)
    setSecondsPassed(0)

    // reset()
  }

  function stopCurrentTask() {
    setTasks(state => state.map(task => {
      if (task.id === activeTaskId) {
        return { ...task, stopDate: new Date() }
      } else {
        return task
      }
    }))
    
    setActiveTaskId(null)
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