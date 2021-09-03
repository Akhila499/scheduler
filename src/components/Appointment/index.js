import "components/Appointment/styles.scss";
import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const { interview, time } = props;
  console.log('gttttt',interview, time, props)
   //when I console log the props iam getting undefined
  return (
    <article className="appointment">
      {props.interview ? <><Header time={time}/><Show student={interview.student} interviewer={interview.interviewer}/></> : <><Header time={time}/><Empty /></>}
    </article>
    
  );
};