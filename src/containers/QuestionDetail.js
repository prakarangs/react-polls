import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchSingleQuestion} from '../actions/api';
import {Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';

class QuestionDetail extends Component {

  componentDidMount() {
    const { questionId } = this.props.match.params;
    this
      .props
      .fetchSingleQuestion(questionId);
  }

  renderChoices() {
    const { choices } = this.props.activeQuestion;
    return _.map(choices, (choice, index) => {
      console.log(choice);
      return (
        <ListGroupItem key={index}>
          <h3>Choice: {choice.choice}</h3>
          <span>Number of votes: {choice.votes}</span>
          <span></span>
        </ListGroupItem>
      );
    });
  }

  render() {
    const { question } = this.props.activeQuestion;

    if (this.props.isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <React.Fragment>
          <header>
            <Grid>
              <Row>
                <Col sm={12}>
                  <h1>Questions Detail</h1>
                  <h2>{question}</h2>
                </Col>
              </Row>
            </Grid>
          </header>
          <section>
            <Grid>
              <Row>
                <Col sm={12}>
                  <ListGroup>
                    {this.renderChoices()}
                  </ListGroup>
                </Col>
              </Row>
            </Grid>
          </section>
        </React.Fragment>
      );
    }
  }
}
function mapStateToProps({activeQuestion, questionsLoading}) {
  return {activeQuestion, isLoading: questionsLoading}
}
export default connect(mapStateToProps, {fetchSingleQuestion})(QuestionDetail);