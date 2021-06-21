import {
  Checkbox,
  IconButton,
  InputLabel,
  TableCell,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import { Todo } from '../../types';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  todo: Todo;
  onEditSubmit: (newTodo: Todo) => void;
  onDelete: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo: { id, name, checked },
  onEditSubmit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(checked);
  const [newName, setNewName] = useState(name);

  const editSubmit = () => {
    onEditSubmit({ id, name: newName, checked: isChecked });
    setIsEditing(false);
  };

  const editCancel = () => {
    setIsEditing(false);
    setNewName(name);
  };

  const saveOnEnter = (event: React.KeyboardEvent) => {
    if (newName && event.key === 'Enter') {
      editSubmit();
    }
  };

  const handleCheck = () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);
    onEditSubmit({ id, name: newName, checked: newCheckedStatus });
  };

  const editJsx = (
    <TableRow>
      <TableCell></TableCell>
      <TableCell>
        <InputLabel htmlFor="newname" className={styles.inputLabel}>
          Input task name
        </InputLabel>
        <TextField
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          onKeyDown={(event) => saveOnEnter(event)}
          className={styles.inputWrapper}
          id="newname"
        />
      </TableCell>
      <TableCell>
        <IconButton
          onClick={editSubmit}
          disabled={!newName}
          aria-label="Save todo entry"
          type="submit"
        >
          <CheckIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton onClick={editCancel} aria-label="Cancel">
          <ClearIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const displayJsx = (
    <TableRow>
      <TableCell className={styles.button}>
        <Checkbox
          checked={isChecked}
          color="primary"
          onChange={handleCheck}
          aria-label="Mark task as done"
        />
      </TableCell>
      <TableCell>
        <Typography className={styles.name}>{name}</Typography>
      </TableCell>
      <TableCell className={styles.button}>
        <IconButton onClick={() => setIsEditing(true)} aria-label="Edit todo entry">
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell className={styles.button}>
        <IconButton onClick={() => onDelete(id)} aria-label="Delete todo entry">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return isEditing ? editJsx : displayJsx;
};

export default TodoItem;
