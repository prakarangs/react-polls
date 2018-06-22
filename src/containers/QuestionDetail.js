import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchSingleQuestion, postVote} from '../actions/api';
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ControlLabel,
  Button,
  ProgressBar
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../styles/detail.css';

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

    this.handleVoteSubmit = this
      .handleVoteSubmit
      .bind(this);
  }

  componentDidMount() {
    const {questionId} = this.props.match.params;

    this.props.fetchSingleQuestion(questionId, () => {
      let total = 0;
      _.map(this.props.activeQuestion.choices, (choice) => {
        total = total + choice.votes;
      });
      this.setState({total: total});
    });
  }

  handleChoiceOnClick({choice, url}) {
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

  calculatePercentage(votes) {
    return Math.floor((votes / this.state.total) * 100);
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
          <div className="choices_wrapper">
            <div className="choices_inner choices_inner--title">
              <small>Choice</small>
              <h3>{choice.choice}</h3>
            </div>
            <div className="choices_inner">
              <small>Number of votes</small>
              <strong>{choice.votes}</strong>
            </div>
            <div className="choices_inner choices_inner--percentage">
              <small>Percentagae</small>
              <strong>{String(this.calculatePercentage(choice.votes))}</strong>
            </div>
            <div className="choices_inner choices_inner--progress">
              <ProgressBar bsStyle="info" now={this.calculatePercentage(choice.votes)} />
            </div>
          </div>
        </ListGroupItem>
      );
    });

  }

  render() {
    const {question} = this.props.activeQuestion;

    if (this.props.isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <React.Fragment>
          <header className="header_detail">
            <Grid>
              <Row>
                <Col sm={12}>
                  <h1>{question}</h1>
                  <div className="cta_back">
                    <Link to={'/'}>
                      <Button bsSize="small">Back to all questions</Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Grid>
          </header>
          <section>
            <Grid>
              <Row>
                <Col sm={12}>
                  <p>Click to select your choice</p>
                  <form onSubmit={this.handleVoteSubmit}>
                    <ListGroup>
                      {this.renderChoices()}
                    </ListGroup>
                    <div className="clearfix">
                      <ControlLabel>
                        <small>You selected</small>
                        <span className="choice--selected">{this.state.choice.title}</span>
                      </ControlLabel>
                      <Button className="cta_submit--vote" bsStyle="warning" type="submit">Save vote</Button>
                    </div>

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

QuestionDetail.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  activeQuestion: PropTypes.object.isRequired,
  fetchSingleQuestion: PropTypes.func.isRequired,
  postVote: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {fetchSingleQuestion, postVote})(QuestionDetail);