import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchQuestions} from '../actions/api';
import {Grid, Row, Col} from 'react-bootstrap';
import QuestionItem from '../components/QuestionItem';
import PropTypes from 'prop-types';

class QuestionsList extends Component {
  componentDidMount() {
    this
      .props
      .fetchQuestions();
  }

  renderQuestionItem() {
    const questions = this.props.questions;

    return _.map(questions, (item, index) => {
      return <QuestionItem key={index} title={item.question} published_at={item.published_at} choices={item.choices.length}/>;
    });
  }

  renderList() {
    if (this.props.isLoading) {
      return <p>Loading...</p>;
    } else {
      return this.renderQuestionItem();
    }
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <Grid>
            <Row>
              <Col xs={12}>
                <h1>Questions</h1>
              </Col>
            </Row>
          </Grid>
        </header>
        <section>
          <Grid>
            <Row>
              {this.renderList()}
            </Row>
          </Grid>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ questions, questionsLoading }) {
  return {
    questions,
    isLoading: questionsLoading
  }
}

QuestionsList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  fetchQuestions: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {fetchQuestions})(QuestionsList);