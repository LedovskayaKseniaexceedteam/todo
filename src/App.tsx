import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { FormEvent, useEffect, useState } from "react";
import { add, remove, toggle, removeAll } from "./redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux";
import { Todo } from "./components/Todo";

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
});

export const App = () => {
  const classes = useStyles();

  const dispatch: AppDispatch = useDispatch();
  const [input, setInput] = useState("");
  const todos = useSelector((state: RootState) => state.todo.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(add(input));
    setInput("");
  };
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

  return (
    <Container className={classes.view}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} variant="h5" component="h2">
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
          {!filteredTodos.value.length && (
            <Typography className={classes.message}>
              No records found
            </Typography>
          )}
          {!!filteredTodos.value.length &&
            filteredTodos.value.map((todo) => (
              <Todo
                toggle={() => dispatch(toggle(todo.id))}
                remove={() => dispatch(remove(todo.id))}
                todo={todo}
              />
            ))}
        </CardContent>
        <CardActions>
          <Button
            onClick={() => setFilter("all")}
            onKeyDown={(e) => (e.key === "Enter" ? setFilter("all") : null)}
            size="small"
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("completed")}
            onKeyDown={(e) =>
              e.key === "Enter" ? setFilter("completed") : null
            }
            size="small"
          >
            Completed
          </Button>
          <Button
            onClick={() => setFilter("inProgress")}
            onKeyDown={(e) =>
              e.key === "Enter" ? setFilter("inProgress") : null
            }
            size="small"
          >
            In Progress
          </Button>
          <Button
            onClick={() => dispatch(removeAll())}
            onKeyDown={(e) =>
              e.key === "Enter" ? dispatch(removeAll()) : null
            }
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
