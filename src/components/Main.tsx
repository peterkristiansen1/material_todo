import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import AboutPage from './AboutPage/AboutPage';
import HomePage from './HomePage/HomePage';

const Main: React.FC = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
      </Switch>
    </Router>
  );
};

export default Main;
