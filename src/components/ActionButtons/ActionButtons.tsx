import { Button, Popover, Typography } from '@material-ui/core';
import { useRef, useState } from 'react';
import styles from './ActionButtons.module.css';

type ActionButtonsProps = {
  saveTodos: () => void;
  deleteTodos: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ saveTodos, deleteTodos }) => {
  const deleteAllButtonRef = useRef<HTMLButtonElement>(null);
  const [isDeleteAllPopoverVisible, setIsDeleteAllPopoverVisible] = useState(false);

  const deleteAllTodos = () => {
    deleteTodos();
    setIsDeleteAllPopoverVisible(false);
  }

  return (
    <div className={styles.actionButtons}>
      <Button
        variant="contained"
        color="primary"
        onClick={saveTodos}
      >
        Save todo list
      </Button>
      <Button
        variant="outlined"
        ref={deleteAllButtonRef}
        onClick={() => setIsDeleteAllPopoverVisible(true)}
      >
        Delete all todos
      </Button>
      <Popover
        anchorEl={deleteAllButtonRef.current}
        open={isDeleteAllPopoverVisible}
        onClose={() => setIsDeleteAllPopoverVisible(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography>Are you sure? This action cannot be undone.</Typography>
        <Button onClick={() => setIsDeleteAllPopoverVisible(false)}>Cancel</Button>
        <Button onClick={deleteAllTodos}>Yes</Button>
      </Popover>
    </div>
  );
};

export default ActionButtons;
