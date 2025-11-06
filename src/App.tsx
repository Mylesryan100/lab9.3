
//import UserList from './components/UserList'
import { useState } from 'react';
import './App.css'
// import TaskList,{type Task} from './components/TaskList';
// import TaskItem from './components/TaskItem';
// import TaskFilter from './components/TaskFilter';
import TaskList, { type Task, type TaskStatus } from "./components/TaskList";


function App() {
  const [tasks, setTasks] = useState<Task[]>(
    [{

   

      id: "1",
      title: "Design landing page",
      description:
        "Create the initial wireframe and mockups for the landing page.",
      status: "pending",
      priority: "high",
      dueDate: "2025-06-20",
    },
    {
      id: "2",
      title: "Set up CI/CD pipeline",
      description:
        "Configure GitHub Actions for automated testing and deployment.",
      status: "pending",
      priority: "medium",
      dueDate: "2025-06-18",
    },
    {
      id: "3",
      title: "Fix login bug",
      description:
        "Resolve the issue where users can't log in with Google OAuth.",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-06-14",
    },
    {
      id: "4",
      title: "Write unit tests",
      description: "Add coverage for the user service module.",
      status: "in-progress",
      priority: "low",
      dueDate: "2025-06-22",
    },
    {
      id: "5",
      title: "Deploy to staging",
      description: "Push the latest build to the staging environment for QA.",
      status: "completed",
      priority: "medium",
      dueDate: "2025-06-10",
    },
  ])
 const onDelete = (taskId: string) => {
    setTasks(prev => {
      const next = prev.filter(t => t.id !== taskId);
      console.log("delete", { taskId, before: prev.length, after: next.length });
      return next;
    });
  };

  const onStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="h-screen bg-zinc-900 p-5 text-white">
      <h1 className="text-5xl">Tasks Manager App</h1>

      <TaskList
        tasks={tasks}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}

export default App;