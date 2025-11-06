
import type { TaskStatus } from "./TaskList";

export default function TaskFilters({ filters, setFilters }: Props) {
  const u = <K extends keyof FilterState>(k: K, v: FilterState[K]) =>
    setFilters({ ...filters, [k]: v });

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
  }) => void;
}

import { useState } from "react";

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }) => void;
}

function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const [filters, setFilters] = useState({
    status: undefined,
    priority: undefined,
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target
    setFilters(prev => {
      return {
        ...prev,
        [name]: value
      }
    })

    onFilterChange(filters)
  }

  return (
    <div>
      <select name="status" onChange={handleChange}>
        <option value=''>All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select name="priority" onChange={handleChange}>
        <option value=''>All</option>
        <option value='low'>low</option>
        <option value='medium'>medium</option>
        <option value='high'>high</option>
      </select>
    </div>
  );
}

export default TaskFilter;