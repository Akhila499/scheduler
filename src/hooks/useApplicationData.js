import { useState, useEffect } from 'react';
import axios from 'axios';


const useApplicationData = () => {

  function bookInterview(id, interview) {
    // const appointment = {...state.appointments[id]}
    const appointment = {
      ...state.appointments[id], //{...state}
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios
    .put(`/api/appointments/${id}`, {interview})
    .then(res => {
      
      setState({...state, appointments});
      console.log('bookinterview',id, interview, state.appointments[id], appointments);
      spotsUpdate(id,appointments);
    })
    

  }


  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]:appointment
    }
    return axios
    .delete(`/api/appointments/${id}`)
    .then(() => {
      setState({...state, appointments});
      spotsUpdate(id, appointments);
    })
   
  }

  const spotsUpdate = (appntmtid,appointments ) => {
    //have to first find the appointment day index for the new booking or deleting
    const indexOfDayOfAppointment = state.days.filter(day => {
      
      return day.appointments.includes(appntmtid)
    
    })[0]['id'] - 1;
   //array of appointments of that day spots
    const appntmntsArrayDay = state.days.filter(day => {
    
      return day.appointments.includes(appntmtid)
    
    })[0].appointments;
    //checking appointments array, which has appointments id for a specified day. Using that ids check the interview is null in the appointments object. and store it in an array(remainingSpotsAvailForDay) and use the length of the array.
    const remainingSpotsAvailForDay = appntmntsArrayDay.filter((eleid) =>!appointments[eleid].interview).length;
    //update the remaining spots using set 
    const updateDaysArray = [...state.days];
    updateDaysArray[indexOfDayOfAppointment] = {...updateDaysArray[indexOfDayOfAppointment], spots : remainingSpotsAvailForDay }
    setState(prev => ({...prev, days: [...updateDaysArray]}));
  }

  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  useEffect(()=>{
    const axiodaysapi = `http://localhost:8001/api/days`;
    const axioappointments = `http://localhost:8001/api/appointments`
    const axiointerviewers = `http://localhost:8001/api/interviewers`
    Promise.all([
      axios.get(axiodaysapi),
      axios.get(axioappointments),
      axios.get(axiointerviewers),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data  }));
      console.log('intervcsdf',all[2].data);
    }); 
  }, []);



  return { state, setDay, bookInterview, cancelInterview };

}

export default useApplicationData;