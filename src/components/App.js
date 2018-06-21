import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import QuestionsList from '../containers/QuestionsList';

const App = () => (
  <BrowserRouter>
    <React.Fragment>
    <Route exact path="/" render={() => <Redirect to="/questions" />} />
    <Switch>
      <Route path="/questions" component={QuestionsList} />
    </Switch>
    </React.Fragment>
  </BrowserRouter>
)

export default App;