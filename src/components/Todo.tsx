import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  todo: Todo;
  toggle: () => void;
  remove: () => void;
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
    fontSize: 20,
    display: "flex",
    alignItems: "center",
  },
});

export const Todo = ({ todo, toggle, remove }: Props) => {
  const classes = useStyles();
  return (
    <Typography
      className={`${classes.todo} ${todo.done ? classes.todo_done : ""}`}
      onClick={toggle}
    >
      <span className={classes.task}>{todo.task}</span>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          remove();
        }}
        onKeyDown={(e) => (e.key === "Enter" ? remove() : null)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    </Typography>
  );
};
