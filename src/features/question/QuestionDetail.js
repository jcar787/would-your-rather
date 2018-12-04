import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  RadioGroup,
  FormLabel,
  Radio,
  FormControlLabel
} from '@material-ui/core';

const styles = theme => {
  return {};
};

class QuestionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: 'optionOne'
    };
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      answer: e.target.value
    });
  };
  handleClick = e => {
    e.preventDefault();
    console.log(this.state);
    // dispatch and save the answer to the user answer object
    // add userId to votes of the option
    // show the votes of each option only if user answered the question
  };

  render() {
    const { classes, question } = this.props;
    const { answer } = this.state;
    return (
      <div>
        <h2>Question Detail</h2>
        <form>
          <FormControl className={classes.block}>
            <FormLabel>Would You Rather...?</FormLabel>
            <RadioGroup
              name="answer"
              onChange={this.handleChange}
              value={answer}
            >
              <FormControlLabel
                value="optionOne"
                control={<Radio />}
                label={question.optionOne.text}
              />
              <FormControlLabel
                value="optionTwo"
                control={<Radio />}
                label={question.optionTwo.text}
              />
            </RadioGroup>
          </FormControl>
          <br />
          <FormControl>
            <Button
              label="Submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={event => this.handleClick(event)}
              className={classes.submitButton}
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  console.log(state.question.questions);
  const question = state.question.questions[id];

  return {
    question
  };
};

export default connect(mapStateToProps)(withStyles(styles)(QuestionDetail));
