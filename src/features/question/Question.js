import React from 'react';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

export default props => {
  const {
    question: { id, author, timestamp, optionOne, optionTwo }
  } = props;

  return (
    <Card className="test">
      <CardContent>
        <Typography>Username: {author}</Typography>
        <Typography>Date: {timestamp}</Typography>
        <Typography>
          <Link to={`/question/${id}`}>Option One: {optionOne.text}</Link>
        </Typography>
        <Typography>
          <Link to={`/question/${id}`}>Option Two: {optionTwo.text}</Link>
        </Typography>
      </CardContent>
    </Card>
  );
};
