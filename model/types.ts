export interface APIResponse {
  data: Task[];
}

export interface Task {
  createdAt?: Date;
  done?: boolean;
  id?: string;
  title: string;
  updatedAt?: Date;
}
