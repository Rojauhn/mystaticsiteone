import Head from "next/head";
import { useState } from "react";
import tasksData from "../../public/tasks"; // Import the static JSON file
import styles from "@/styles/Home.module.css";

export default function Home() {
  // Use local state for tasks
  const [tasks, setTasks] = useState(tasksData);
  const [newTask, setNewTask] = useState("");

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      const nextId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
      const updatedTasks = [...tasks, { id: nextId, task: newTask, done: false }];
      setTasks(updatedTasks);
      setNewTask(""); // Reset the input field
    }
  };

  // Handle deleting a task
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Handle toggling task completion
  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <Head>
        <title>Simple To-Do List</title>
        <meta name="description" content="A static To-Do app with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Rojauhn's To-Do List</h1>
          <h2>100849533</h2>

          {/* Task Input Section */}
          <div className={styles.addTaskSection}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className={styles.inputField}
            />
            <button onClick={handleAddTask} className={styles.addButton}>
              Add Task
            </button>
          </div>

          {/* Task List */}
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <li key={task.id} className={styles.taskItem}>
                <span
                  onClick={() => handleToggleTask(task.id)}
                  className={task.done ? styles.completed : ""}
                >
                  {task.task}
                </span>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </main>

        <footer className={styles.footer}>
          <p>Static To-Do List App using Next.js</p>
        </footer>
      </div>
    </>
  );
}
