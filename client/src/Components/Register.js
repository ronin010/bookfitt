import React, {useState, useEffect} from "react";
import { Input, Alert, Button, Spin } from 'antd';
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { register, loadUser, addTrainer } from "../Actions/AuthActions";
import NavBar from "./NavBar";
import { useHistory, Redirect, useParams } from "react-router-dom";
import Loading from "./Loading";
import AccountSelect from "./AccountSelect";

export default function Register(props) {

  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const error = useSelector(state => state.auth.error);
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");

  const {accountType} = useParams();

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        dispatch(loadUser(token));

        if (isAuth) {
          setLoading(false);
        }
      }, 1000)
    } else {
      setLoading(false)
    }
  }, [dispatch])

  const submit = () => {
    setPostLoading(true)
    const user = {
      email,
      firstName,
      lastName,
      mobileNumber,
      password
    }

    setTimeout(() => {
      if (accountType === "trainer") {
        dispatch(addTrainer(user));
      } else if (accountType === "client") {
        dispatch(register(user));
      }
    }, 2000)
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  }

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  }

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  }

  const mobileHandler = (e) => {
    setMobileNumber(e.target.value);
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  }

  if (isAuth) {
    return <Redirect to={`/dashboard/${accountType}`} />
  } else if (loading) {
    return <Loading />
  } else if (!accountType) {
    return <AccountSelect path="/register" />
  } else {
    return (
      <div>
        <NavBar header="Register" />
        <div className="register-div">
          <div className="register-content">
          <h3 className="register-header">
            Register For Free
          </h3>
          <Input onPressEnter={submit} onChange={emailHandler} className="register-input" placeholder="Email" />
          <Input onPressEnter={submit} onChange={firstNameHandler} className="register-input" placeholder="First Name" />
          <Input onPressEnter={submit} onChange={lastNameHandler} className="register-input" placeholder="Last Name" />
          <Input onPressEnter={submit} onChange={mobileHandler} className="register-input" placeholder="Mobile Number" />
          <Input onPressEnter={submit} onChange={passwordHandler} className="register-input" type="password" placeholder="Password" />
          {
            error ? <Alert className="auth-err" type="error" message={error} /> : null
          }
          <div style={{marginBottom: "20px"}}>
            <a href="/login">
              Already Have An Account?
            </a>
          </div>
          <Button onClick={submit} className="register-submit">
            {postLoading ? <div>{"Loading..."} <Spin size="small" /></div> : "Register"} 
          </Button>
          </div>
        </div>
      </div>
    )
  }
}