import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

const QuestionItem = ({title, published_at, choices, url}) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Published at: {published_at}</p>
      <p>Choices: {choices}</p>
      <Link to={`${url}`}>
      <Button bsSize="small">
        Vote Now
      </Button>
      </Link>
    </div>
  );
}

export default QuestionItem;