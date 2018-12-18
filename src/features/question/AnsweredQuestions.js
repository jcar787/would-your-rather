import React from 'react';
import { Question } from '../question';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {
    questionElement: {
      marginTop: '10px'
    },
    questionUl: {
      listStyleType: 'none'
    },
    title: {
      marginBottom: '25px',
      marginTop: '50px'
    }
  };
};

const answeredQuestions = props => {
  const { questions, classes } = props;
  return (
    <div>
      <h3 className={classes.title}>Answered Questions</h3>
      <ul className={classes.questionUl}>
        {questions.length > 0 ? (
          questions.map(question => (
            <li key={question.id} className={classes.questionElement}>
              <Question question={question} />
            </li>
          ))
        ) : (
          <li>
            <Typography>You haven't answered any questions</Typography>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withStyles(styles)(answeredQuestions);
