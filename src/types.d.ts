type Todo = {
  isDone: boolean;
  title: string;
  _id: number;
  updatedAt: string;
  createdAt: string;
};
type FilterType = "all" | "completed" | "in progress";
type TError = { message: string };
