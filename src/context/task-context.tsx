import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createTask, deleteTask, fetchTasks, loadTasks, toggleTask } from "../api/task-api";

export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  deleteTaskById: (id: number) => Promise<void>;
  toggleCompleteById: (id: number) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then((res) => setTasks(res.data));
  }, []);

  const addTask = async (task: Omit<Task, "id">) => {
    await createTask(task);      
    const fresh = loadTasks(); 
    setTasks(fresh);
  };



  const deleteTaskById = async (id: number) => {
  try {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  } catch (err) {
    console.error("Error deleting task:", err);
  }
};


  const toggleCompleteById = async (id: number) => {
    await toggleTask(id);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTaskById, toggleCompleteById }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTask = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTask must be used inside TaskProvider");
  return ctx;
};