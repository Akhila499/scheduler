import "components/Appointment/styles.scss";
import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import { useVisualMode } from "hooks/useVisualMode";


export default function Appointment(props) {
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const SAVING = 'SAVING';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id,interview)
    .then(() => transition(SHOW))
    .catch(e => {
      transition(ERROR_SAVE, true);
      console.log('error in bookInterview', e);
    })
  }

  function cancel(){
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(e => {
      transition(ERROR_DELETE, true);
      console.log('error in cancelInterview', e);
    })
    
  }

  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && 
      (
        <Show
          student={props.interview.student} interviewer={props.interview.interviewer}
          onEdit = {()=>transition(EDIT)}
          onDelete = {()=>transition(CONFIRM)}
        />
      )}
      {mode === CREATE && 
      (
        <Form interviewers={props.interviewers} 
          onCancel = {back}
          onSave = {save}
          
        />
      )}
      {mode === SAVING && 
      (
        <Status message = "Saving"
          onComplete = {()=> transition(SHOW)}
        />
      )}
      {mode === DELETING &&
        (
          <Status message = "Deleting"
          onComplete = {() => transition(EMPTY)}
          />
        )
      }
      {mode === CONFIRM &&
        (
          <Confirm onCancel = {back}
          message = "Are you sure to do this?"
            onConfirm = {cancel}
          />
        )
      }
      {mode === EDIT &&
        (
          <Form 
          onCancel={back} 
          onSave = {save}
          interviewers={props.interviewers}
          interviewer = {props.interview.interviewer.id}
          name={props.interview.student}
          />
        )
      }
      {mode === ERROR_SAVE &&
        <Error 
         message = {"Error occurred while saving"}
         onClose = {back}
        />
      }

      {mode === ERROR_DELETE &&
        <Error 
        message = {"Error occurred while deleting"}
        onClose = {back}
       />
      }
    </article>
  );
};