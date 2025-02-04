import { ActionTypes } from "./actions";

export interface Task {
  id: string;
  task: string;
  durationMinutes: number;
  startDate: Date;
  stopDate?: Date;
  finishDate?: Date;
}

interface TasksState {
  tasks: Task[];
  activeTaskId: string | null;
}

// type ActionAddTask = {
//   type: ActionTypes.ADD_NEW_TASK;
//   payload: { newTask: Task }
// }
// type ActionMarkAsFinished = {
//   type: ActionTypes.MARK_CURRENT_TASK_AS_FINISHED
// }
// type ActionStopTask = {
//   type: ActionTypes.STOP_CURRENT_TASK
// }

// type TasksReducerActions = ActionAddTask | ActionMarkAsFinished | ActionStopTask

export function tasksReducer(state: TasksState, action: any) {
  switch(action.type) {
    case ActionTypes.ADD_NEW_TASK:
      return {
        ...state, 
        tasks: [...state.tasks, action.payload.newTask],
        activeTaskId: action.payload.newTask.id,
      }

    case ActionTypes.STOP_CURRENT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === state.activeTaskId) {
            return { ...task, stopDate: new Date() }
          } else {
            return task
          }
        }),
        activeTaskId: null,
      }

    case ActionTypes.MARK_CURRENT_TASK_AS_FINISHED:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === state.activeTaskId) {
            return { ...task, finishDate: new Date() }
          } else {
            return task
          }
        }),
        activeTaskId: null,
      }

    default:
      return state
  }
}