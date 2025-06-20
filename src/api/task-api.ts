import type { Task } from "../context/task-context";

const STORAGE_KEY = "dummy_tasks";

export const loadTasks = (): Task[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
        ? JSON.parse(stored)
        : [
            { id: 1, title: "Learn React", description: "Use Context", completed: false },
            { id: 2, title: "Build UI", description: "Use Tailwind", completed: true },
        ];
};


let dummyTasks: Task[] = loadTasks();

const saveTasks = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyTasks));
};

export const fetchTasks = async () => {
    return new Promise<{ data: Task[] }>((resolve) => {
        setTimeout(() => resolve({ data: dummyTasks }), 300);
    });
};

export const createTask = async (task: Omit<Task, "id">) => {
    return new Promise<{ data: Task }>((resolve) => {
        const newTask = { ...task, id: Date.now() };
        dummyTasks.push(newTask);
        saveTasks();
        setTimeout(() => resolve({ data: newTask }), 300);
    });
};

export const deleteTask = async (id: number) => {
    return new Promise<{ data: null }>((resolve) => {
        dummyTasks = dummyTasks.filter((t) => t.id !== id);
        saveTasks();
        setTimeout(() => resolve({ data: null }), 300);
    });
};

export const toggleTask = async (id: number) => {
    return new Promise<{ data: null }>((resolve) => {
        dummyTasks = dummyTasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
        saveTasks();
        setTimeout(() => resolve({ data: null }), 300);
    });
};
