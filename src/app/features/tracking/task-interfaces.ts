export type TaskStatus = keyof AllColumns;

export interface AllColumns {
    pending: Task[],
    in_progress: Task[],
    completed: Task[],
    cancelled: Task[]
}

export interface Task {
    id: number,
    title: string,
    description: string,
    status: string,
    active?: string,
    createdAt: string,
    updatedAt: string
}