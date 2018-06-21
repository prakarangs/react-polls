import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import QuestionsList from '../containers/QuestionsList';
import QuestionDetail from '../containers/QuestionDetail';

const App = () => (
  <BrowserRouter>
    <React.Fragment>
    <Route exact path="/" render={() => <Redirect to="/questions" />} />
    <Switch>
      <Route path="/questions/:questionId" component={QuestionDetail} />
      <Route path="/questions" component={QuestionsList} />
    </Switch>
    </React.Fragment>
  </BrowserRouter>
)

export default App;