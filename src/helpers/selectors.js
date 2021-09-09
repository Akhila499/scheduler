export function getAppointmentsForDay(state, day) {
  const dayFromData = state.days.find(dataday => dataday.name === day )
  if(dayFromData){
    return dayFromData.appointments.map(id => state.appointments[id]); 
  }
  return [];
};

export function getInterview(state, interview){
  if(!interview){
    console.log('Null interview');
    return null
  }
  const id = interview.interviewer;
  const interviewer = state.interviewers[id];
  const result = {...interview, interviewer};
  return result;
};


export function getInterviewersForDay(state, day) {
  const dayFromData = state.days.find(dataday => dataday.name === day )
  if(dayFromData){
    return dayFromData.interviewers.map(id => state.interviewers[id]); 
  }
  return [];
};