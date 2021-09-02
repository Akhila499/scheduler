import React from "react";
import "components/DayListItem.scss";
import classnames from 'classnames';

  export default function DayListItem(props) {
    const formatSpots = () => (
      props.spots ? `${props.spots} spot${props.spots > 1 ? `s`:``} remaining`: `no spots remaining` 
    );
    const avail = !(props.spots); 
    //console.log('avail',avail);
    const dayClass = classnames("day-list__item", 
      {"day-list__item--selected":props.selected,
      "day-list__item--full": avail}
      );
    //console.log(props);
    return (
      <li className={dayClass} onClick={() => props.setDay(props.name)}>
        <h2 >{props.name}</h2> 
        <h3 >{formatSpots()}</h3>
      </li>
    );
  }