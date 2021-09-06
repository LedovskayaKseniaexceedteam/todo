import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../redux";

export const useTodos = () => {
  const todos = useSelector((state: RootState) => state.todos);

  const [filter, setFilter] = useState<FilterType>("all");
  const [filteredTodos, setFilteredTodos] = useState({
    filter,
    value: todos,
  });

  useEffect(() => {
    if (filter === "all") {
      setFilteredTodos({
        filter,
        value: todos,
      });
    } else if (filter === "completed") {
      setFilteredTodos({
        filter,
        value: todos.filter((todo) => todo.isDone),
      });
    } else if (filter === "in progress") {
      setFilteredTodos({
        filter,
        value: todos.filter((todo) => !todo.isDone),
      });
    } else {
      throw new Error("wrong filter");
    }
  }, [filter, todos]);

  return [filteredTodos, setFilter] as const;
};
