import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchQuestions} from '../actions/api';
import _ from 'lodash';
import PropTypes from 'prop-types';

class QuestionsList extends Component {
  componentDidMount() {
    this.props.fetchQuestions();
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

QuestionsList.propTypes = {
  questions: PropTypes.object.isRequired,
  fetchQuestions: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchQuestions })(QuestionsList);