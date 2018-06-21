import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchSingleQuestion, postVote } from '../actions/api';
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ControlLabel,
  Button
} from 'react-bootstrap';

class QuestionDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      choice: {
        title: 'no selected choice',
        url: null
      }
    };

    this.handleVoteSubmit = this.handleVoteSubmit.bind(this);
  }

  componentDidMount() {
    const {questionId} = this.props.match.params;
    this.props.fetchSingleQuestion(questionId);
  }

  handleChoiceOnClick({choice, url}) {
    console.log(this.props);
    this.setState({
      choice: {
        title: choice,
        url: url
      }
    });
  }

  handleVoteSubmit(event) {
    event.preventDefault();
    this.props.postVote(this.state.choice.url, () => {
      this.props.history.push(`${this.props.match.url}/voted`);
    });
  }

  renderChoices() {
    const {choices} = this.props.activeQuestion;
    return _.map(choices, (choice, index) => {
      return (
        <ListGroupItem
          key={index}
          onClick={(event) => {
            event.preventDefault();
            this.handleChoiceOnClick(choice);
          }}>
          <h3>Choice: {choice.choice}</h3>
          <span>Number of votes: {choice.votes}</span>
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
                <Col md={6}>
                  <h1>Questions Detail</h1>
                </Col>
                <Col md={6}>
                <Link to={'/'}>
                  <Button>Back to all questions</Button>
                  </Link>
                </Col>
              </Row>
            </Grid>
          </header>
          <section>
            <Grid>
              <Row>
                <h2>{question}</h2>
                <Col sm={12}>
                  <form onSubmit={this.handleVoteSubmit}>
                    <ListGroup>
                      {this.renderChoices()}
                    </ListGroup>
                    {this.state.choice.url}
                    <ControlLabel>Your vote: <span>{this.state.choice.title}</span></ControlLabel>
                    <Button type="submit">Save vote</Button>
                  </form>
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

export default connect(mapStateToProps, {fetchSingleQuestion, postVote})(QuestionDetail);