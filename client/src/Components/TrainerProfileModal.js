import React, {useState} from "react";
import {Modal, Button, Spin} from "antd"
import { assignTrainer } from "../Actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";

export default function TrainerProfileModal(props) {

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const client = useSelector(state => state.auth.client);

  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    sessionTypes
  } = props.trainer;

  const close = () => {
    setLoading(false)
    props.cancel()
  }

  const submit = () => {
    dispatch(assignTrainer(client.id, props.trainer.id, token));
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
      close();
    }, 2500);
  }

  return (
    <Modal
      visible={props.open}
      onCancel={close}
      title={props.title}
      footer={[
        <Button type="primary" key="set" onClick={submit}>
          {
            loading ? <div>{"Saving..."} <Spin size="small" /></div> : "Set As Trainer"
          }
        </Button>,
        <Button type="primary" danger key="close" onClick={close}>
          Close
        </Button>
        
      ]}
    > 
    <div className="trainer-profile-div">
      <div className="trainer-profile-section">
        <h3 className="trainer-profile-name">{firstName + " " + lastName}</h3>
        <h4>{email}</h4>
        <h4>{mobileNumber}</h4>
      </div>
      <div className="trainer-profile-section">
        <h3 className="trainer-profile-types-header">Session Types:</h3>
        {
          props.trainer.sessionTypes ? props.trainer.sessionTypes.map((type, idx) => (
            <h4 className="profile-session-types-item" key={idx}> - {type.type}</h4>
          )) : null
        }
      </div>
    </div>
     
    </Modal>
  )
}