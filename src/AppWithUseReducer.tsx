import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useReducer } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';
import { TaskType, Todolist } from './components/Todolist';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueType;
};
export type TasksStateType = {
  [todolistId: string]: Array<TaskType>;
};

function AppWithUseReducer() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchToTodos] = useReducer(todolistsReducer, [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'JS Book', isDone: true },
    ],
  });

  const removeTask = (todoId: string, taskId: string) => {
    dispatchToTasks(removeTaskAC(todoId, taskId));
  };

  const addTask = (taskName: string, todoId: string) => {
    dispatchToTasks(addTaskAC(taskName, todoId));
  };

  const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todoId: string) => {
    dispatchToTasks(changeTaskStatusAC(taskId, newTaskStatus, todoId));
  };

  const changeTaskTitle = (todoId: string, taskId: string, newTitle: string) => {
    dispatchToTasks(changeTaskTitleAC(todoId, taskId, newTitle));
  };

  const changeTodoFilter = (todoId: string, value: FilterValueType) => {
    dispatchToTodos(changeTodolistFilterAC(todoId, value));
  };

  const changeTodoTitle = (todoId: string, newTitle: string) => {
    dispatchToTodos(changeTodolistTitleAC(todoId, newTitle));
  };

  const removeTodolist = (todoId: string) => {
    const action = removeTodolistAC(todoId); //?????????????? ????????????????????,?????? ???? ???? ?????????????????? 2 ?????????????? ActionCreate
    dispatchToTodos(action);
    dispatchToTasks(action);
  };

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title); //???????????? ???????????????????? action ?????? ???????????????????? todoId ?? ?????? ??????????????????
    dispatchToTodos(action);
    dispatchToTasks(action);
  };

  return (
    <div className="App">
      <AppBar color="inherit" position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={5}>
          {todolists.map((tl) => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === 'active') {
              tasksForTodolist = allTodolistTasks.filter((t) => {
                return t.isDone === false;
              });
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = allTodolistTasks.filter((t) => {
                return t.isDone === true;
              });
            }

            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: '20px' }}>
                  <Todolist
                    todoId={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeTodoFilter={changeTodoFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodoTitle={changeTodoTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithUseReducer;
