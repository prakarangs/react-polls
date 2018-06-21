import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchQuestions} from '../actions/api';

class QuestionsList extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>Show some list</div>
    );
  }
}

function mapStateToProps({questions}) {
  return {questions}
}

export default connect(mapStateToProps, { fetchQuestions })(QuestionsList);