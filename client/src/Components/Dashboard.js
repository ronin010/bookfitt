import React, {useEffect, useState} from "react";
import ClientDashboard from "./ClientDashboard";
import TrainerDasboard from "./TrainerDashboard";
import { useParams, Redirect } from "react-router";
import { useSelector } from "react-redux";
import NoMatch from "./NoMatch";

export default function Dashboard(props) {
  const {accountType} = useParams();
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  if (!accountType && !isAuth) {
    return <Redirect to="/" />
  } else if (accountType === "trainer") {
    return <TrainerDasboard />
  } else if (accountType === "client") {
    return <ClientDashboard />
  } else {
    return <NoMatch />
  }  
}