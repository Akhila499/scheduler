import DayListItem from "./DayListItem";
import React from 'react';

export default function DayList(props) {
  console.log('daylist',props);
  const { days } = props;
  const parsedDataList =  days.map(day => <DayListItem key= {day.id} {...day} setDay = {props.setDay} selected = {props.day === day.name}/>);
  console.log(parsedDataList);
  return(
    <ul>
      {parsedDataList}
    </ul>
  );
}