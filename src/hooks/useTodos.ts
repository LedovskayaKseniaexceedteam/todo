import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { useEffect, useState } from "react";

export const useTodos = () => {
  const todos = useSelector((state: RootState) => state.todo.value);

  const [filter, setFilter] = useState<"all" | "completed" | "inProgress">(
    "all"
  );
  const [filteredTodos, setFilteredTodos] = useState({
    filter,
    value: todos,
  });

  useEffect(() => {
    if (filter == "all") {
      setFilteredTodos({
        filter,
        value: todos,
      });
    } else if (filter == "completed") {
      setFilteredTodos({
        filter,
        value: todos.filter((todo) => todo.done),
      });
    } else if (filter == "inProgress") {
      setFilteredTodos({
        filter,
        value: todos.filter((todo) => !todo.done),
      });
    } else {
      throw new Error("wrong filter");
    }
  }, [filter, todos]);

  return [filteredTodos.value, setFilter] as const;
};
