import React from "react";
import {Modal, Button} from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import EmptyData from "./EmptyData";

export default function CompletedModal(props) {

  const completedSessions = props.data;

  return (
    <Modal
      visible={props.open}
      onCancel={props.cancel}
      title="Completed Sessions"
      footer={[
        <Button key="close" onClick={props.cancel}>
          Close
        </Button>
      ]}
    >
      <div className="completed-modal-div">
        {
         completedSessions.length > 0 ? completedSessions.map((d, idx) => (
            <div key={idx} className="session-complete">
              <CheckCircleTwoTone className="tick-icon" twoToneColor="#52c41a" />
              <h3>{d.sessionType}</h3>
              <h3>{d.dateBooked}</h3>
              <h3>{d.timeBooked}</h3>
            </div>
          )) :  
            <div className="completed-modal-empty">
              <EmptyData displayButton={false} message="No Sessions Completed" />
            </div>
          
        }
      </div>
    </Modal>
  )
}