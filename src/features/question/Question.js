import React from 'react';
import Card from '@material-ui/core/Card';
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
        <Typography>Option One: {optionOne.text}</Typography>
        <Typography>Option Two: {optionTwo.text}</Typography>
      </CardContent>
    </Card>
  );
};
