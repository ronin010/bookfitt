import React, {useEffect, useState} from "react";
import HomeFooter from "./HomeFooter";
import NavBar from "./NavBar";
import {CardData} from "../CardData";
import HomeBox from "./HomeBox";
import { Button } from 'antd';
import { useHistory, Redirect } from "react-router-dom";
import { loadUser, loadTrainer } from "../Actions/AuthActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loading from "./Loading"
import jwt_decode from 'jwt-decode';

export default function(props) {

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        if (jwt_decode(token).accountType === "client") {
          dispatch(loadUser(token));
        } else if (jwt_decode(token).accountType === "trainer") {
          dispatch(loadTrainer(token));
        }
        if (isAuth) {
          setLoading(false);
        }
      }, 2000)
    } else {
      setLoading(false);
    }
  }, [dispatch])

  if (isAuth && token) {
    return <Redirect to={"/dashboard/" + jwt_decode(token).accountType} />
  } else if (loading) {
    return <Loading />
  } else {
    return (
    <div style={{height: "100vh"}}>
      <NavBar header="BookFitt" />
      <div className="home-img-div">
        <img src="https://images.pexels.com/photos/2011384/pexels-photo-2011384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className="home-page-img" />
        <h2 className="home-text">
          Access to personal trainers and private sessions!
          <Button color="primary" type="primary" className="register-btn" onClick={() => history.push("/register")}>Register Now</Button>
        </h2>
      </div>
      <section id="wrapper" class="skewed">
    <div class="layer bottom">
      <div class="content-wrap">
        <div class="content-body">
          <h1>Manage Diet</h1>
          <ul>
            <li className="list-dark-el">Get free access to advice on a healthy diet plan as you work alongside a trainer of your choice.</li>
            <li className="list-dark-el">Access to updated information on the right ways to lose fat and build more muscle while staying healthy.</li>
            <li className="list-dark-el">Guides on meal plans for the most optimal diet for your workout goals.</li>
          </ul>
        </div>
        <img src="https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="trainer-img" />
      </div>
    </div>

    <div class="layer top">
        <div class="content-wrap">
          <div class="content-body">
            <h1 style={{width: "110%"}}>Booking Sessions</h1>
            <ul>
            <li className="list-light-el">Select a trainer suited to your fitness goals with access to session types you want.</li>
            <li className="list-light-el">Book sessions through a trainer and cancel anytime with no additional charge.</li>
            <li className="list-light-el">Track your completed sessions and record your statistics.</li>
          </ul>
          </div>
          <img src="https://images.pexels.com/photos/949132/pexels-photo-949132.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" />
        </div>
      </div>

      <div class="handle"></div>
      </section>
      <div className="home-account-information">
        <h2 style={{textAlign: "center",color: "#1890ff", margin: "10px auto 20px auto", width: "80%", fontSize: "32px", fontFamily: "'Ubuntu'"}}>
         Account Types:
        </h2>
        <div className="account-information">
          <div className="trainer-account-information">
            
            <div className="trainer-account-content">
              <h3 style={{textAlign: "center", textDecoration: "underline"}}>
               Trainer Account
                <a href="/register/trainer" style={{marginLeft: "10px", fontSize: "14px"}}>Create Now</a>
              </h3>
              <ul>
                <li>Create account for clients to book sessions through.</li>
                <li>Specify up to 6 unique session types for your clients.</li>
                <li>Delete any session types you no longer want.</li>
                <li>View all your sessions that clients have booked.</li>
                <li>Keep track of all the clients that follow you.</li>
                <li>Cancel any sessions that you cannot attend.</li>
              </ul>
            </div>
          </div>
          <div className="client-account-information">
            <div className="client-account-content">
              <h3 style={{textAlign: "center", textDecoration: "underline"}}>
                Client Account
                <a style={{marginLeft: "10px", fontSize: "14px"}} href="/register/client">Create Now</a>
              </h3>
              <ul>
                <li>Create account to book sessions through a selected trainer.</li>
                <li>Search for trainers that match the session types you want.</li>
                <li>Book sessions through a trainer.</li>
                <li>Select a type, time and date for your session.</li>
                <li>Keep track of your completed sessions and statistics for your account.</li>
                <li>Cancel sessions anytime if you cannot attend one.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  )
  }
}