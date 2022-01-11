import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";

export default function AllClients(props) {
  const clients = useSelector(state => state.auth.clientsList);

  return (
    <div className="all-clients">
      <NavBar header="All Clients" />
      All clients for trainer:
      {
        clients && clients.length > 0 ?
          clients.map((client, idx) => (
            <div key={idx}>
            {
              client.firstName + client.lastName
            }
            </div>
          ))
          : <h2>No clients for this trainers</h2>
      }
    </div>
  )
}