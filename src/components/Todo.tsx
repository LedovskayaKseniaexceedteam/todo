import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { FC } from "react";

type Props = {
  todo: Todo;
  toggle: (id: Todo["_id"]) => void;
  remove: (id: Todo["_id"]) => void;
  isDisabled: boolean;
};

const useStyles = makeStyles({
  todo: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItem: "center",
    padding: 10,
  },
  todo_done: {
    color: "#666",
    textDecoration: "line-through",
  },
  task: {
    flex: 1,
    fontSize: 20,
    display: "flex",
    alignItems: "center",
  },
});

export const Todo: FC<Props> = ({ todo, toggle, remove, isDisabled }) => {
  const classes = useStyles();
  return (
    <Typography
      className={`${classes.todo} ${todo.isDone ? classes.todo_done : ""}`}
    >
      <span
        onClick={() => (!isDisabled ? toggle(todo._id) : null)}
        className={classes.task}
      >
        {todo.title}
      </span>
      <IconButton
        disabled={isDisabled}
        onClick={() => {
          remove(todo._id);
        }}
        onKeyDown={(e) => (e.key === "Enter" ? remove(todo._id) : null)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    </Typography>
  );
};
