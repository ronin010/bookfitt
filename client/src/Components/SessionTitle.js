import React, {useState} from "react";
import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { cancelSession } from "../Actions/SessionActions";
import { Spin } from "antd";
import { BookTwoTone } from "@ant-design/icons";

export default function(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const cancel = (sessionId) => {
    setDeleteLoading(true);
    dispatch(cancelSession(sessionId, token));
    setTimeout(() => {
      setDeleteLoading(false);
    }, 2000)
  }

  return (
    <div className="session-title">
      <h3 style={{marginRight: "auto"}}>
        <BookTwoTone style={{marginRight: "10px"}} />
        {props.title}
      </h3>
        <Button onClick={() => setConfirmOpen(true)} className="session-card-item" type="primary" danger>
          Cancel
        </Button>
        <Modal 
          visible={confirmOpen}
          title="Cancel Session?"
          onCancel={() => setConfirmOpen(false)}
          footer={[
            <Button type="primary"  key="confirm" onClick={() => cancel(props.sessionId)}>
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
  )
}