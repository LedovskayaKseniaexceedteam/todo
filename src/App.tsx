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
import { add, remove, toggle, removeAll } from "./redux/todoSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux";
import { Todo } from "./components/Todo";
import { useTodos } from "./hooks/useTodos";

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

  const dispatch: AppDispatch = useDispatch();
  const [input, setInput] = useState("");
  const addTodo = (task: Todo["task"]) => dispatch(add(task));
  const toggleTodo = (id: Todo["id"]) => dispatch(toggle(id));
  const removeTodo = (id: Todo["id"]) => dispatch(remove(id));
  const removeAllTodos = () => dispatch(removeAll());
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input.trim());
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
                key={todo.id}
                toggle={toggleTodo}
                remove={removeTodo}
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
            onClick={removeAllTodos}
            onKeyDown={(e) => (e.key === "Enter" ? removeAllTodos() : null)}
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
