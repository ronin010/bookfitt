import React, {} from "react";
import { Card } from 'antd';

export default function HomeBox(props) {
  return (
    <Card title={props.title} extra={<a href="/book">Book</a>} style={{ width: 300 }}>
      <img className="card-img" src={props.img} />
      <p className="card-content">
        {props.content}
      </p>
    </Card>
  )
}