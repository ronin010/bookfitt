import React, { useState} from "react"
import { Modal, Button } from "antd"
import { cancelSession } from "../Actions/SessionActions";
import {useDispatch} from "react-redux"
import { Spin, Alert } from 'antd';

export default function SessionModal(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false);

  const cancel = () => {
    setDeleteLoading(true);
    dispatch(cancelSession(props.session.id, token));
    setTimeout(() => {
      setDeleteLoading(false);
      setConfirmOpen(false);
      props.close()
    }, 2000)
  }

  return (
    <div className="session-modal">
      <Modal 
      title={<span style={{textTransform: "capitalize"}}>{props.session.sessionType + " Session"}</span>}
      visible={props.open} 
      onCancel={props.close}
      width={350}
      footer={[
        <div key="cancel">
          {
            props.completed == "completed" ? null : 
              <Button key="cancel" className="session-button" type="primary" danger onClick={() => setConfirmOpen(true)}>
                {
                  "Cancel Session"
                }
              </Button> 
            }
        </div>
      ]}
    > 
    {
     
        <div className="session-header">
          <div className="session-modal-header">
            <h2 style={{textTransform: "capitalize"}} className="header-text">
              {props.session.sessionType}
            </h2>
          </div>        
          <div className="session-info">
            
              <h3>Session with: {props.name}</h3>
            
            <h3>Session Date: {props.session.dateBooked}</h3>
            <h3>Session Time: {props.session.timeBooked}</h3>
          </div>
          <div>
            {
            props.completed == "completed" ? 
              <div className="completed-banner">
                <Alert message="Completed Session" type="success" showIcon />
              </div>: null
            }
          </div>
          <div className="session-actions">
            <Modal 
              visible={confirmOpen}
              title="Cancel Session?"
              onCancel={() => setConfirmOpen(false)}
              footer={[
                <Button type="primary"  key="confirm" onClick={cancel}>
                   {deleteLoading ? <div>{"Deleting"} <Spin size="small" /></div> :  "Confirm"}
                </Button>,
                <Button type="primary" danger key="keep" onClick={() => setConfirmOpen(false)}>
                  Keep
                </Button>
              ]}
            >
              <div className="confirm-delete">
                <h3>Are you sure you want to cancel this session?</h3>
              </div>
            </Modal>
          </div>
        </div>
    }
      </Modal>
    </div> 
  )
}