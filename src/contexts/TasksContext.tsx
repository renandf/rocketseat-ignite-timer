import {
  createContext,
  ReactNode,
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
  )

  const [secondsPassed, setSecondsPassed] = useState(0)
  
  const { tasks, activeTaskId } = tasksState

  const activeTask = tasks.find(task => task.id === activeTaskId)

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