import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { Button, Card,  Spin } from "antd";
import HomeFooter from "./HomeFooter";
import ClassTitle from "./ClassesTitle";
import { LoadingOutlined } from '@ant-design/icons';
import SessionModal from "./SessionModal";
import EmptyData from "./EmptyData";
import BookSessionModal from "./BookSessionModal";
import {CheckCircleTwoTone, BookTwoTone, ClockCircleTwoTone, CheckSquareTwoTone} from "@ant-design/icons";
import SelectTrainerModal from "./SelectTrainerModal";
import CompletedModal from "./CompletedModal";

export default function ClientDashboard(props) {
  const client = useSelector(state => state.auth.client);
  const classes = useSelector(state => state.classes.sessions);
  const completed = useSelector(state => state.classes.completed);
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [classesLoading, setClassesLoading] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [completedOpen, setCompletedOpen] = useState(false);
  const [active, setActive] = useState({});
  const [trainerOpen, setTrainerOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [allCompleteOpen, setAllCompleteOpen] = useState(false);

  const close = () => {
    setOpen(false);
    setBookOpen(false);
  }

  const openSession = (session) => {
    setActive(session);
    setOpen(true);
  }

  const openCompleted = (session) => {
    setActive(session);
    setCompletedOpen(true);
  }

  const closeCompleted = () => {
    setCompletedOpen(false);
  }

  const openBookModal = () => {
    setBookOpen(true);
  }

  if (!isAuth) {
    return <Redirect to="/" />
  } else if (loading) {
    return (
      <Loading />
    )
  } else {
    return (
      <div>
        <NavBar header="BookFitt" />
        <div className="dashboard">
          <div className="client-dashboard-buttons">
            <Button onClick={() => openBookModal()} className="book-button" type="primary">
              Book Now
            </Button>
            {
              !client.trainer ?
                <Button onClick={() => setTrainerOpen(true)} type="primary" className="assign-trainer-button">
                  Assign Trainer
                </Button> : null
            }
          </div>
          <BookSessionModal open={bookOpen} close={close} />
          <SelectTrainerModal open={trainerOpen} cancel={() => setTrainerOpen(false)} />
          <div className="classes-div">
              <Card title={<ClassTitle displayAll="display" title="My Sessions" icon={<BookTwoTone className="session-icon" />} onClick={() => history.push("/sessions")} />} className="dashboard-card">
                <div className="classes">
                {
                  !classes && classesLoading ?
                    <div className="loading-classes">
                      <Spin indicator={<LoadingOutlined style={{ fontSize: 50, marginTop: "30px" }} spin />} />
                    </div> :
                    classes && classes.length > 0 ? classes.slice(0, 3).reverse().map((c, idx) => (
                      <div onClick={() => openSession(c)} key={c.id} className="session">
                        <h3>{c.sessionType}</h3>
                        <h3>{c.dateBooked}</h3>
                        <h3>{c.timeBooked}</h3>
                      </div>
                    )) :
                      classesLoading ?
                      <div className="loading-classes">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 50, marginTop: "30px" }} spin />} />
                      </div> :
                        classes.length < 1 ?
                        <EmptyData
                          displayButton={true}
                          onClick={() =>  openBookModal()}
                          message="No Sessions Booked"
                        />
                        : null
                }
                </div>
                <SessionModal avatar={true} completed={false} open={open} name={active.trainerName} session={active} close={close} />
              </Card>
              <Card title={<ClassTitle  title="My Performance" page="/performance" icon={<ClockCircleTwoTone className="session-icon" />} />} className="performance-card">
                {
                  client ?
                    <div className="performance">
                      <div className="performance-stats">
                        <h3>Sessions Completed</h3>
                        {
                          client.sessionsCompleted
                        }
                      </div>
                      <div className="performance-stats hours">
                        <h3>Hours Completed</h3>
                        {
                          client.hoursCompleted
                        }
                      </div>
                    </div>
                    : null
                }
              </Card>
              <Card title={<ClassTitle displayAll="display"  onClick={() => setAllCompleteOpen(true)} title="Completed Sessions" icon={<CheckSquareTwoTone className="session-icon" />} />} className="completed-card">
                <div className="completed-div">
                  {
                    client ?
                      <div className="completed">
                        <div className="completed-sessions">
                          {
                            !completed && classesLoading ?
                              <div className="loading-classes">
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 50, marginTop: "30px" }} spin />} />
                              </div> :
                              completed.length > 0 ? completed.map((s, idx) => (
                                <div onClick={() =>  openCompleted(s)} key={s.id} className="session">
                                  <CheckCircleTwoTone className="tick-icon" twoToneColor="#52c41a" />
                                  <h3>{s.sessionType}</h3>
                                  <h3>{s.dateBooked}</h3>
                                  <h3>{s.timeBooked}</h3>
                                </div>
                              )): <EmptyData displayButton={false} message="No Sessions Completed" />
                          }
                        </div>
                      </div>
                      : <Loading />
                  }
                </div>
              </Card>
              <SessionModal completed="completed" open={completedOpen} session={active} close={closeCompleted}  />
              <CompletedModal open={allCompleteOpen} data={completed} cancel={() => setAllCompleteOpen(false)} /> 
              
          </div>
         
        </div>
      </div>
    )
  }
}