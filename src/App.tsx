
//import UserList from './components/UserList'
import { useState } from 'react';
import './App.css'
import TaskList,{type Task} from './components/TaskList';


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
 const onDelete = () => {

    }

    const onStatusChange = () => {};

  return (
    <div className="p-5 bg-zinc-900 text-white h-screen">
      <h1 className="text-5x1">Tasks Manager App</h1> 

      {/*<UserList  /> */}


      {/*<ContactForm /> */}

      <TaskList tasks={tasks}
       onDelete={onDelete}
       onStatusChange={onStatusChange}
       />
    </div>
  )
}

export default App;