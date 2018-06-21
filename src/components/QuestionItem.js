import React from 'react';
import { Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

const QuestionItem = ({ title, published_at, choices }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Published at: {published_at}</p>
      <p>Choices: {choices}</p>
      <Button bsSize="small">Vote now</Button>
    </div>
  );
}


export default QuestionItem;