import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Todo } from "./components/Todo";
import { useTodos } from "./hooks/useTodos";
import { addTodo, removeAllTodos, removeTodo, toggleTodo } from "./redux/AC";

const useStyles = makeStyles({
  view: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    maxWidth: 450,
    width: "90vw",
    margin: "0 auto",
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  footer: {
    display: "flex",
    backgroundColor: "#f2f2f2",
  },
  clear: {
    flex: 1,
    marginLeft: "auto",
  },
  form: {
    display: "flex",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
  },
  message: {
    marginTop: 10,
    textAlign: "center",
  },
  currentFilter: {
    textDecoration: "underline",
  },
});

export const App = () => {
  const classes = useStyles();
  const [todos, setFilter] = useTodos();

  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const add = (task: Todo["title"]) => dispatch(addTodo(task));
  const toggle = (id: Todo["_id"]) => dispatch(toggleTodo(id));
  const remove = (id: Todo["_id"]) => dispatch(removeTodo(id));
  const removeAll = () => dispatch(removeAllTodos());
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    add(input.trim());
    setInput("");
  };
  const filterButtons: FilterType[] = ["all", "completed", "in progress"];

  return (
    <Container className={classes.view}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} variant="h5" component="h1">
            ToDos
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <TextField
              className={classes.input}
              id="standard-basic"
              label="What needs to be done?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" variant="outlined" color="primary">
              add
            </Button>
          </form>
          {!todos.value.length && (
            <Typography className={classes.message}>
              No records found
            </Typography>
          )}
          {!!todos.value.length &&
            todos.value.map((todo) => (
              <Todo
                key={todo._id}
                toggle={toggle}
                remove={remove}
                todo={todo}
              />
            ))}
        </CardContent>
        <CardActions>
          {filterButtons.map((button) => (
            <Button
              key={button}
              className={todos.filter === button ? classes.currentFilter : ""}
              onClick={() => setFilter(button as FilterType)}
              onKeyDown={(e) => (e.key === "Enter" ? setFilter(button) : null)}
              size="small"
            >
              {button}
            </Button>
          ))}
          <Button
            onClick={removeAll}
            onKeyDown={(e) => (e.key === "Enter" ? removeAll() : null)}
            className={classes.clear}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Remove All
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};
