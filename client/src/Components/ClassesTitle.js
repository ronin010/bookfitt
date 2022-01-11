import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "antd";

export default function ClassTitle(props) {
  const history = useHistory();

  return (
    <div className="class-title">
      <h3 style={{marginRight: "auto", marginBottom: "10px"}}>
        {
          props.icon != null ? props.icon : null
        }
        {props.title}
      </h3>
      {

        props.modal ? 
          <Modal
            visible={props.open}
            onCancel={props.close}
            title={props.title}
            footer={[
              <Button key="close" onClick={props.close}>
                Close
              </Button>
            ]}
          > 
            <div className="clients-list">
              {
                props.data.map((e, idx) => (
                  <div key={idx} className="modal-client">
                    {
                      e.firstName + " " + e.lastName
                    }
                  </div>
                ))
              }
            </div>
          </Modal>
          : null

       
      }
      {
         props.displayAll == "display" ?
         <Button href={props.page} onClick={props.onClick}>
           View All
         </Button> : null
      }
      
    </div>
  )
}