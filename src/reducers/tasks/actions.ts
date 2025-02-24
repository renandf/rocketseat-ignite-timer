import { Task } from "./reducer";

export enum ActionTypes {
  ADD_NEW_TASK = 'ADD_NEW_TASK',
  STOP_CURRENT_TASK = 'STOP_CURRENT_TASK',
  MARK_CURRENT_TASK_AS_FINISHED = 'MARK_CURRENT_TASK_AS_FINISHED',
}

export function addNewTaskAction(newTask: Task) {
  return {
    type: ActionTypes.ADD_NEW_TASK,
    payload: {
      newTask,
    },
  }
}

export function markCurrentTaskAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_TASK_AS_FINISHED,
  }
}

export function stopCurrentTaskAction() {
  return {
    type: ActionTypes.STOP_CURRENT_TASK,
  }
}