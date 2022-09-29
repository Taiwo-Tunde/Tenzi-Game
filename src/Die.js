import React from "react";

export const Die = (props) => {
  const isHeld = props.isHeld;
  const style = { backgroundColor: isHeld ? "#59E391" : "#ffffff" };

  return (
    <div className="die-component" style={style} onClick={props.handleHold}>
      <h2 className="die-number"> {props.value} </h2>
    </div>
  );
};
