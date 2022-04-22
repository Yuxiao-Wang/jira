export interface Task {
  id: number;
  name: string;
  //经办人
  processorId: number;
  projectId: number;
  epicId: number;
  kanbanId: number;
  //Bug or Task
  typeId: number;
  note: string;
}
