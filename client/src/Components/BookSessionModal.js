import React, {useState} from "react";
import {Menu, Alert, Dropdown, Button, TimePicker, Modal, DatePicker, Spin} from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { bookSession } from "../Actions/SessionActions";
import { useSelector } from "react-redux";

export default function BookSessionModal(props) {

	const [typeActive, setTypeActive] = useState("Select Type");
  const [timeActive, setTimeActive] = useState("07");
  const [sentLoading, setSentLoading] = useState(false);
  const user = useSelector(state => state.auth.client);
  const error = useSelector(state => state.classes.error);

  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("07");

  const disabled_hours = [0, 1, 2 , 3, 4 ,5 , 6, 20, 21, 22, 23];
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

	const selectType = (type) => {
    setType(type);
    setTypeActive(type);
  }

  const onChange = (date, dateString) => {
    setDate(dateString)
  }

  const menu = (
    <Menu>
      { 
        user.trainer ? 
          user.trainer.sessionTypes.map((type, idx) => (
            <Menu.Item key={idx}>
              <a onClick={() => selectType(type.type)}>
              {type.type}
              </a>
            </Menu.Item> 
          ))
        : null
      }
    </Menu>
  )

  const submit = () => {
    const session = {
      sessionType: type,
      dateBooked: date,
      timeBooked: time
    }
  
    dispatch(bookSession(session, token, user.id))
    setSentLoading(true);

    // clear values
    if (!error) {
      setSentLoading(true);
      setTimeout(() => {
        setDate("");
        setTime("");
        setTimeActive("00");
        setType("");
        setTypeActive("Select Type");
        setSentLoading(false);
        props.close()
      }, 2000)
    } else if (error) {
      setSentLoading(false);
    }
  }

  const format = "h a";

  
  if (!user.trainer) {
    return (
     <Modal
      title="Select A Trainer"
      visible={props.open}
      onCancel={props.close}
      footer={[
        <Button onClick={props.close} key="ok">
          Ok
        </Button>
      ]}
     >
       <h3>
         Please select a trainer before attempting to book sessions.
       </h3>
     </Modal>
    )
  } else {
    return (
      <Modal 
        title="Book Session" 
        visible={props.open} 
        onCancel={props.close} 
        className="book-modal"
        footer={[
          <Button key="Book" onClick={() => submit()} type="primary">
            {
              !error && sentLoading ? 
                <div key="booking">
                  {"Booking..."} <Spin size="small" />
                </div> : "Book"
            }
          </Button>,
          <Button key="Cancel" onClick={props.close} type="primary" danger>
            Cancel
          </Button>
        ]}>	
      <h2 className="book-modal-header">Book New Session</h2>
      {
        user ? <h3 style={{width: "65%", textAlign: "center", margin: "0 auto"}}>Your session will be with : <span style={{fontWeight: "bold"}}>{user.trainer.firstName + " " + user.trainer.lastName}</span></h3> : null
      }
      {
        error ? <Alert className="book-error" message={error} type="error" /> : null
      }
        <div className="book-main">
          <div className="session-type">
            <Dropdown trigger="click" overlay={menu} placement="bottomCenter">
              <div className="select-div">
                <h3 className="session-type-header">Type: </h3>
                <Button>{typeActive} &#8595;</Button>
              </div>
            </Dropdown>
          </div>
          <div className="session-date">
            <div className="date-div">
              <h3 className="session-type-header">Date: </h3>
              <DatePicker onChange={onChange} />
            </div>
          </div>  
          <div className="session-time">
            <div className="time-div">
              <h3 className="session-time-header">Time: </h3>
              <TimePicker 
                value={moment(timeActive, format)}
                format={format}
                disabledHours={() => disabled_hours} 
                onSelect={(value) => {
                  const timeString = moment(value).format("HH");
                  setTime(timeString + ":00");
                  setTimeActive(timeString)
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}