// props for InterviewerList
// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id
import React from 'react';
import "components/InterviewerList.scss";
import classnames from 'classnames';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

function InterviewerList(props) {
  console.log('in interviewerlist',props);
 
  const { interviewers } = props;
  const parsedinterviewers = interviewers.map(interviewer => {
    return <InterviewerListItem key={interviewer.id} {...interviewer} setInterviewer={(e)=>props.onChange(interviewer.id)} selected = {interviewer.id === props.interviewer} />
  });
  const interviewersClass = classnames("interviewers",
  {"interviewers__header text--light":props.Interviewer,
  "interviewers__list":props.interviewers
  });
  return  (
    <section className={interviewersClass}>
        {/* <h4 className={interviewersClass}>{props.interviewer}</h4> */}
        <ul className={interviewersClass}>
          {parsedinterviewers}
        </ul>
      </section>
    );
  };

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
export default InterviewerList;

