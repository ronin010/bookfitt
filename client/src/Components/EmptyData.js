import React from "react";
import { Empty, Button } from "antd";

export default function EmptyDate(props) {
  return (
    <Empty 
      className="empty-icon"
      description={
        <span>
         {props.message}
        </span>
      }
    > 
    {
      props.displayButton ?  
      <Button onClick={() => props.onClick()}>
        Book Now
      </Button> : null
    }
    </Empty>
  )
}