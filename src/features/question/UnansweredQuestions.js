import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Question } from '../question';

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

const unansweredQuestions = props => {
  const { questions, classes } = props;
  return (
    <div>
      <h3 className={classes.title}>Unanswered Questions</h3>
      <ul className={classes.questionUl}>
        {questions.map(question => (
          <li key={question.id} className={classes.questionElement}>
            <Question question={question} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withStyles(styles)(unansweredQuestions);
