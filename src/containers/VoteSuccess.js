import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../styles/confirmation.css';

class VoteSuccess extends Component {
  render() {
    return (
      <div className="container_confirmation">
      <Alert bsStyle="success"><p>You have successfully voted.</p>
      </Alert>
        <Link to={`/questions/${this.props.match.params.questionId}`}>
          <Button bsStyle="info" bsSize="large">
            Go Back
          </Button>
        </Link>
      </div>
    );
  }
}

VoteSuccess.propTypes = {
  match: PropTypes.object.isRequired
};

export default VoteSuccess;