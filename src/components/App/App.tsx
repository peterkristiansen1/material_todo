import { Container } from '@material-ui/core';
import Main from '../Main';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <main>
      <Container className={styles.appContainer}>
        <Main />
      </Container>
    </main>
  );
};

export default App;
