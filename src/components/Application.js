// import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import React, { useState, useEffect } from "react";
import "components/Appointment"
import Appointment from "components/Appointment";
// import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from '../hooks/useApplicationData';

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  

  
  // const setDays = days => setState({ ...state, days });
    
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // const dailyInterviewers = getInterviewersForDay(state, state.day);
  
  // const schedule = appointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //     />
  //   );
  // });
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment =>  <Appointment key = {appointment.id} {...appointment} interviewers = {getInterviewersForDay(state, state.day)} bookInterview = {bookInterview} 
        interview={getInterview(state, appointment.interview)} cancelInterview = {cancelInterview}
        />)}
        {/* {dailyInterviewers.map(interviewer => <Appointment key={interviewer.id}{...interviewer}/>)} */}
      </section>
    </main>
  );
}
