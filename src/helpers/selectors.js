export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const dayFromData = state.days.find(dataday => dataday.name === day )
  if(dayFromData){
    return dayFromData.appointments.map(id => state.appointments[id]); 
  }
  return [];
  // console.log(dayFromData);
};

export function getInterview(state, interview){
  if(!interview){
    console.log('Null interview');
    return null
  }
  const interviewerdata = state.interviewers[interview.interviewer]
  let result =  { ...interview, interviewer : {id : interviewerdata.id, avatar : interviewerdata.avatar, name:interviewerdata.name}}
  console.log('output',result);
  return result;
  
};


export function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  const dayFromData = state.days.find(dataday => dataday.name === day )
  if(dayFromData){
    return dayFromData.interviewers.map(id => state.interviewers[id]); 
  }
  return [];
  // console.log(dayFromData);
};