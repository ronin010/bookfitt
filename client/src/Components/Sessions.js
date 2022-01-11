import React, {useState, useEffect} from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { Card, } from "antd";
import { Redirect } from "react-router";
import EmptyData from "./EmptyData"
import SessionTitle from "./SessionTitle";

export default function Classes(props) {
  const classes = useSelector(state => state.classes.sessions);
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  if (!isAuth) {
    return <Redirect to="/" />
  } else {
    return (
      <div>
        <NavBar header="Booked Sessions" />
        <div className="classes-div">
          {
            classes ? classes.map((session, idx) => (
              <Card 
                key={idx} 
                title={
                <SessionTitle 
                  title={session.sessionType + " Session"} 
                  sessionId={session.id}
                />}> 
                <div className="session-card">
                  <div className="session-details">
                    <h3 className="session-card-item">Session with: {session.trainerName}</h3>
                    <h3 className="session-card-item">Session Date: {session.dateBooked}</h3>
                    <h3 className="session-card-item">Session Time: {session.timeBooked}</h3>
                  </div>
                </div>
              </Card>
            )) 
            : <EmptyData message="No Sessions Booked" />
          }
        </div>
      </div>
    )
  }
}