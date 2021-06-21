import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { Todo } from '../../types';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

type TodoListProps = {
  todoList: Todo[];
  updateTodo: (newTodo: Todo) => void;
  deleteTodo: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todoList, updateTodo, deleteTodo }) => {
  if (todoList.length === 0) {
    return null;
  }
  return (
    <div className={styles.todoList}>
      <Typography variant="h4" variantMapping={{ h4: 'h2' }}>
        Todo list
      </Typography>
      <TableContainer className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.done}>Done</TableCell>
              <TableCell className={styles.task}>Task</TableCell>
              <TableCell className={styles.edit}>Edit</TableCell>
              <TableCell className={styles.delete}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onEditSubmit={updateTodo} onDelete={deleteTodo} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TodoList;
