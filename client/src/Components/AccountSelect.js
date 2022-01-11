import React from "react";
import NavBar from "./NavBar";
import { useHistory } from "react-router";
import { Button, Card } from "antd";

export default function AccountSelect(props) {

  const history = useHistory();

  return (
    <div>
      <NavBar header="Account Type" />

      <h2 className="account-type-header">Select Type Of Account</h2>
      <div className="account-select">
        <Button
          onClick={() => history.push(props.path + "/trainer")} 
          className="account-select-button"
        >
          Trainer Account
        </Button>

        <h3 style={{marginBottom: "20px"}}>Or</h3>

        <Button
          onClick={() => history.push(props.path + "/client")} 
          className="account-select-button"
        >
          Client Account
        </Button>
      </div>
    </div>
  )
}