// import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import React, { useState, useEffect } from "react";
import "components/Appointment"
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  
  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => {
    //   //... your code here ...
    //   setState(prev => ({ ...prev, days }));
    // }
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // const dailyInterviewers = getInterviewersForDay(state, state.day);
  useEffect(()=>{
    const axiodaysapi = `http://localhost:8001/api/days`;
    const axioappointments = `http://localhost:8001/api/appointments`
    const axiointerviewers = `http://localhost:8001/api/interviewers`
    Promise.all([
      axios.get(axiodaysapi),
      axios.get(axioappointments),
      axios.get(axiointerviewers),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      console.log('intervcsdf',all[2].data);
    }); 
  }, []);
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
        {dailyAppointments.map(appointment =>  <Appointment key = {appointment.id} {...appointment} interviewers = {getInterviewersForDay(state, state.day)}/>)}
        {/* {dailyInterviewers.map(interviewer => <Appointment key={interviewer.id}{...interviewer}/>)} */}
      </section>
    </main>
  );
}
