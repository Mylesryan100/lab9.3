
import React from "react";

export type TaskStatus = "pending" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; 
}

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(+d) ? iso : d.toLocaleDateString();
}

function isOverdue(task: Task) {
  const due = new Date(task.dueDate);
  return task.status !== "completed" && !Number.isNaN(+due) && due < new Date();
}

function TaskListItem({
  task,
  onStatusChange,
  onDelete,
}: {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}) {
  const overdue = isOverdue(task);

  const statusBorder =
    task.status === "pending"
      ? "border-l-slate-400"
      : task.status === "in-progress"
      ? "border-l-sky-500"
      : "border-l-emerald-500";

  const priorityPill =
    task.priority === "low"
      ? "border-emerald-200 text-emerald-700 bg-emerald-50 dark:border-emerald-900/40 dark:text-emerald-300 dark:bg-emerald-900/20"
      : task.priority === "medium"
      ? "border-amber-200 text-amber-800 bg-amber-50 dark:border-amber-900/40 dark:text-amber-300 dark:bg-amber-900/20"
      : "border-rose-200 text-rose-800 bg-rose-50 dark:border-rose-900/40 dark:text-rose-300 dark:bg-rose-900/20";

  return (
    <li
      className={[
        "flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-slate-800 dark:bg-slate-900",
        "border-l-4",
        statusBorder,
        overdue ? "ring-1 ring-rose-300/60 dark:ring-rose-800/50" : "",
      ].join(" ")}
      aria-label={`${task.title}${overdue ? " (overdue)" : ""} — priority ${task.priority}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <strong
            className={[
              "truncate text-base font-semibold text-slate-900 dark:text-slate-100",
              task.status === "completed" ? "line-through text-slate-400 dark:text-slate-500" : "",
            ].join(" ")}
            title={task.title}
          >
            {task.title}
          </strong>

          {overdue && (
            <span
              className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-800 dark:border-rose-900/50 dark:bg-rose-900/30 dark:text-rose-300"
              role="status"
            >
              Overdue
            </span>
          )}
          {task.status === "in-progress" && (
            <span className="inline-flex items-center gap-1 rounded-md border border-sky-200 bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-800 dark:border-sky-900/50 dark:bg-sky-900/30 dark:text-sky-300">
              In progress
            </span>
          )}
          {task.status === "completed" && (
            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-900/30 dark:text-emerald-300">
              Done
            </span>
          )}
        </div>

        {task.description && (
          <p className="mt-1 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{task.description}</p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className={["inline-flex items-center gap-1 rounded-full border px-2 py-0.5", priorityPill].join(" ")}>
            Priority: {task.priority}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-0.5 text-slate-600 dark:border-slate-800 dark:text-slate-400">
            Due: {formatDate(task.dueDate)}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <label className="sr-only" htmlFor={`status-${task.id}`}>
          Change status
        </label>
        <select
          id={`status-${task.id}`}
          aria-label={`Change status for ${task.title}`}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-4 focus:ring-sky-300/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-sky-800/40"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-100 active:bg-rose-200 focus:outline-none focus:ring-4 focus:ring-rose-300/40 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:bg-rose-900/30 dark:active:bg-rose-900/40 dark:focus:ring-rose-900/40"
        >
          Delete
        </button>
      </div>
    </li>
  );
}


export default function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  if (!tasks.length) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-3 rounded-xl border border-dashed border-slate-300/60 bg-slate-50 p-4 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400"
      >
        No tasks to show.
      </div>
    );
  }

  return (
    <section className="mt-4">
      <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">Task List</h2>
      <ul className="grid gap-3" aria-live="polite">
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}                
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}