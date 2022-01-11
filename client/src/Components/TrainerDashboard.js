import React, {useState} from "react";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { Button, Spin, Card, Modal } from "antd";
import SessionTypeModal from "./SessionTypeModal";
import { deleteSessionType } from "../Actions/AuthActions";
import EmptyData from "./EmptyData";
import ClassTitle from "./ClassesTitle";
import SessionModal from "./SessionModal";
import {BookTwoTone, TeamOutlined} from "@ant-design/icons";
import HomeFooter from "./HomeFooter";
import { DeleteOutlined } from "@ant-design/icons";
import ClientProfileModal from "./ClientProfileModal";
import { useHistory } from "react-router";

export default function TrainerDasboard() {
  
  const history = useHistory();
  const dispatch = useDispatch(); 
  const trainer = useSelector(state => state.auth.trainer);
  const clients = useSelector(state => state.auth.clientsList);
  const sessionTypes = useSelector(state => state.auth.sessionTypes);
  const token = localStorage.getItem("token");
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const sessions = useSelector(state => state.classes.sessions);
  const [active, setActive] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activeType, setActiveType] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [popen, setPopen] = useState(false);
  const [activeClient, setActiveClient] = useState({});
  const [clientsOpen, setClientsOpen] = useState(false);

  const deleteSession = () => {
    setDeleteLoading(true);
    setTimeout(() => {
      dispatch(deleteSessionType(trainer.id, activeType, activeType.id, token));
      setDeleteLoading(false);
      setConfirmOpen(false);
    }, 2000)
  }

  if (!isAuth) {
    return <Redirect to="/login/trainer" />
  } else {
    return (
      <div>
        <NavBar header="Trainer Dashboard" />
        <div className="trainer-dashboard">
          <div className="dashboard-buttons">
            <Button className="dashboard-button" onClick={() => setOpen(true)} type="primary">
              New Session Type
            </Button>
            <SessionTypeModal open={open} close={() => setOpen(false)} />
          </div>
          <Card title={<ClassTitle displayAll="display" onClick={() => history.push("/sessions")} title="Booked Sessions" icon={<BookTwoTone className="session-icon" />} />} className="dashboard-card">
            <div className="sessions">
            {
                trainer.sessions && trainer.sessions.length > 0 ?  trainer.sessions.slice(0, 3).reverse().map((c, idx) => (
                  <div onClick={() => {setActive(c); setSessionOpen(true)}} key={c.id} className="session trainer-session">
                    <h3>{c.clientName}</h3>
                    <h3 style={{textTransform: "capitalize"}}>{c.sessionType}</h3>
                    <h3>{c.dateBooked}</h3>
                    <h3>{c.timeBooked}</h3>
                  </div>
                )) :
                    sessions.length < 1 ?
                    <EmptyData
                      displayButton={false}
                      message="No Sessions Booked By Clients"
                    />
                    : null
            }
            </div>
            <SessionModal trainer completed={false} open={sessionOpen} session={active} name={active.clientName} close={() => setSessionOpen(false)} />
          </Card>
          <Card className="clients-card" title={<ClassTitle onClick={() => setClientsOpen(true)} open={clientsOpen} close={() => setClientsOpen(false)} modal={true} data={clients} title="Your Clients" icon={<TeamOutlined className="client-icon" />} displayAll="display" />}>
              <div className="clients">
              {
                clients && clients.length > 0 ?
                clients.map((client, idx) => (
                  <div onClick={() => {setPopen(true); setActiveClient(client)}} key={idx} className="trainer-dashboard-client">
                    {client.firstName + " " + client.lastName} 
                  </div>
                ))
                :
                clients.length < 1 ? 
                  <EmptyData
                    displayButton={false}
                    message="No Clients Follow You"
                  /> : null
              } 
              <ClientProfileModal open={popen} close={() => {setActiveClient({}); setPopen(false)}} client={activeClient} />
            </div>
          </Card>
          <Card className="types-card" title={<ClassTitle title="Your Session Types" />}>
            <div className="session-types">
              {   

                sessionTypes && sessionTypes.length > 0  ?
                  sessionTypes.map((t, idx) => (
                    <div key={idx} className="session-type-box">
                      {t.type} 
                      <DeleteOutlined 
                        className="delete-type-button" 
                        onClick={() => {
                          setConfirmOpen(true); setActiveType(t)
                          }
                        } 
                      />
                    </div>
                  )) :sessionTypes.length < 1 ?
                      <div className="empty-session-types">
                        <EmptyData 
                          displayButton={false}
                          message="No Session Types Created"
                        />
                      </div>
                    : null
              }
            </div>
            <Modal
              title="Confirm Deletion"
              visible={confirmOpen}
              close={() => setConfirmOpen(false)}
              onCancel={() => {setConfirmOpen(false); setActiveType({})}}
              onOk={() => dispatch(deleteSessionType(trainer.id, activeType, activeType.id, token))}
              footer={[
                <Button type="primary" key="confirm" onClick={deleteSession}>
                  {
                    deleteLoading ? <div>{"Deleting"} <Spin size="small" /></div> : "Confirm"
                  }
                </Button>,
                <Button  type="primary" danger key="cancel" onClick={() => {setConfirmOpen(false); setActiveType({})}}>
                  Cancel
                </Button>
              ]}
            >
              <div className="confirm-type-delete">
                <h3>Are you sure you want to delete <span style={{fontWeight: "bold"}}>{activeType.type}</span> from your session types?</h3>
              </div>
            </Modal>
          </Card>
         
        </div>
      </div>
    )
  }
}