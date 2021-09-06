import "components/Appointment/styles.scss";
import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import { useVisualMode } from "hooks/useVisualMode";


export default function Appointment(props) {
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const SAVING = 'SAVING';
  const EDIT = 'EDIT';

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id,interview);
    console.log('------',props);
    transition(SHOW);
    
  }
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const { interview, time } = props;
  console.log('index', props);
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && 
      (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit = {()=>transition(EDIT)}
          onDelete = {()=>transition(CONFIRM)}
        />
      )}
      {mode === CREATE && 
      (
        <Form interviewers={props.interviewers} 
          onCancel = {()=> back()}
          onSave = {save}
          
        />
      )}
      {mode === SAVING && 
      (
        <Status
          onComplete = {()=> transition(SHOW)}
        />
      )}
      {mode === DELETING &&
        (
          <Status 
          onComplete = {() => transition(EMPTY)}
          />
        )
      }
      {mode === CONFIRM &&
        (
          <Confirm onCancel = {() => back()}
            onConfirm = {()=> transition(DELETING)}
          />
        )
      }
      {mode === EDIT &&
        (
          <Form onCancel={back} 
          onSave = {save}
          interviewers={props.interviewers}
          interviewer = {props.interview.interviewer.id}
          name={props.interview.student}
          />
        )
      }


    </article>
    
  );
};