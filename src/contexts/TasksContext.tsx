import { differenceInSeconds } from 'date-fns';
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState
} from 'react';
import {
  addNewTaskAction,
  markCurrentTaskAsFinishedAction,
  stopCurrentTaskAction
} from '../reducers/tasks/actions';
import { Task, tasksReducer } from '../reducers/tasks/reducer';

interface AddTaskData {
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
  addNewTask: (data: AddTaskData) => void
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
  (initialState) => {
    const storedStateAsJSON = localStorage.getItem(
      '@ignite-timer:tasks-state-1.0.0'
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return initialState
  })

  const { tasks, activeTaskId } = tasksState

  const activeTask = tasks.find(task => task.id === activeTaskId)

  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (activeTask) {
      return differenceInSeconds(new Date(), new Date(activeTask.startDate))
    }
    
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(tasksState)

    localStorage.setItem('@ignite-timer:tasks-state-1.0.0', stateJSON)
  }, [tasksState])

  function setNumberOfSecondsPassed(seconds: number) {
    setSecondsPassed(seconds)
  }

  function markCurrentTaskAsFinished() {
    dispatch(markCurrentTaskAsFinishedAction())
  }

  function addNewTask(data: AddTaskData) {
    const newTask: Task = {
      id: String(new Date().getTime()),
      task: data.task,
      durationMinutes: data.durationMinutes,
      startDate: new Date(),
    }

    dispatch(addNewTaskAction(newTask))

    setSecondsPassed(0)
  }

  function stopCurrentTask() {
    console.log(activeTaskId)
    dispatch(stopCurrentTaskAction())
  }

  return (
    <TasksContext.Provider value={{
      tasks,
      activeTask,
      activeTaskId,
      secondsPassed,
      markCurrentTaskAsFinished,
      setNumberOfSecondsPassed,
      addNewTask,
      stopCurrentTask
    }}>
      { children }
    </TasksContext.Provider>
  )
}