// import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import React, { useState, useEffect } from "react";
import "components/Appointment"
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id:3,
//     time:"2pm",
//     interview: {
//       student:"Akhila",
//       interviewer:{
//         id: 1,
//         name: "LCJohn",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id:4,
//     time:"3pm"
//   },
//   {
//     id:"last",
//     time:"4pm"
//   }
// ];


export default function Application(props) {
  
  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => {
    //   //... your code here ...
    //   setState(prev => ({ ...prev, days }));
    // }
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  useEffect(()=>{
    const axiodaysapi = `http://localhost:8001/api/days`;
    const axioappointments = `http://localhost:8001/api/appointments`
    const axiointerviewers = `http://localhost:8001/api/interviewers`
    Promise.all([
      axios.get(axiodaysapi),
      axios.get(axioappointments),
      axios.get(axiointerviewers),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, third: all[2].data }));
    }); 
  }, []);
  
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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        
       {dailyAppointments.map(appointment =>  <Appointment key = {appointment.id} {...appointment}/> )}
       
      </section>
    </main>
  );
}
