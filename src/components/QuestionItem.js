import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Timestamp from 'react-timestamp';
import '../styles/card.css';

const QuestionItem = ({title, published_at, choices, url}) => {
  return (
    <div className="card">
      <h3 className="card_title">{title}</h3>
      <div className="card_inner">
        <small className="card_label">Published at</small>
        <p className="card_date">
          <Timestamp time={published_at} autoUpdate={60}/>
        </p>
      </div>
      <div className="card_inner">
        <small className="card_label">Number of choices</small>
        <p className="card_choices">{choices}</p>
      </div>
      <div className="card_action"><Link to={`${url}`}>
        <Button bsSize="small">
          Vote Now
        </Button>
      </Link></div>

    </div>
  );
}

export default QuestionItem;