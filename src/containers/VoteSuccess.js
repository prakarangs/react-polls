import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

class VoteSuccess extends Component {
  render() {
    return (
      <div>
        You have successfully voted.
        <Link to={`/questions/${this.props.match.params.questionId}`}>
          <Button>
            Go Back
          </Button>
        </Link>
      </div>
    );
  }
}

export default VoteSuccess;