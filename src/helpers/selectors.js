export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const dayFromData = state.days.find(dataday => dataday.name === day )
  if(dayFromData){
    return dayFromData.appointments.map(id => state.appointments[id]); 
  }
  return [];
  // console.log(dayFromData);
}