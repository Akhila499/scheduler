// props for InterviewerListItem
// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection

import "components/InterviewerListItem.scss";

import React from 'react';
import classnames from 'classnames';

export default function InterviewerListItem(props) { 
  console.log('interviewerlistitem',props, props.avatar,props.name);
  // const { } = props;
  const InterviewerListClass =  classnames("interviewers__item",
    {"interviewers__item-image":props.avatar,
      "interviewers__item--selected": props.selected,
      
    });

  return (

    <li className={InterviewerListClass} onClick={props.setInterviewer}>
      <img className={InterviewerListClass} src={props.avatar}/>
      {props.selected ? <span>{props.name}</span> : '' } 

    </li>
  
  );
}