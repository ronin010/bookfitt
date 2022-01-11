import React, {useState, useEffect} from "react";
import NavBar from "./NavBar";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, login, loginTrainer, loadTrainer } from "../Actions/AuthActions";
import { Redirect, useParams } from "react-router";
import { Input, Alert, Button, Spin } from 'antd';
import AccountSelect from "./AccountSelect";

export default function Login(props) {

	const token = localStorage.getItem("token");
	const [loading, setLoading] = useState(true);
	const isAuth = useSelector(state => state.auth.isAuthenticated);
	const error = useSelector(state => state.auth.error);
	const dispatch = useDispatch();
	const [postLoading, setPostLoading] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const {accountType} = useParams();

	useEffect(() => {
    if (token) {
      setTimeout(() => {

		if (accountType === "client") {
			dispatch(loadUser(token));
		} else if (accountType === "trainer") {
			dispatch(loadTrainer(token));
		}
       
        if (isAuth) {
        setLoading(false);
        }
      }, 1000)
    } else {
      setLoading(false)
    }
  }, [dispatch])

	const emailHandler = (e) => {
		setEmail(e.target.value);
	}

	const passwordHandler = (e) => {
		setPassword(e.target.value);
	}

	const submit = () => {
		setPostLoading(true);

		const user = {
		email,
		password
		}

		setTimeout(() => {
			if (accountType === "trainer") {
				dispatch(loginTrainer(user));
			} else if (accountType === "client") {
				dispatch(login(user));
			}
		}, 2000)
    
	}

	if (isAuth) {
    return <Redirect to={"/dashboard/" + accountType} />
  } else if (loading) {
    return <Loading />
  } else if (!accountType) {
		return <AccountSelect path="/login" />
	} else {
		return (
			<div>
				<NavBar header="Login" />
				<h3 className="login-header">
            {"Login With A " + accountType + " Account"}
				</h3>
				{
					error ? <Alert className="login-err" type="error" message={error} /> : null
				}
				<div className="login-inputs">
					
					<Input onPressEnter={submit} className="login-input" type="text" onChange={emailHandler} placeholder="Email..." />
					<Input onPressEnter={submit} className="login-input" type="password" onChange={passwordHandler} placeholder="Password..." />
					<div style={{marginBottom: "20px"}}>
            <a href={"/register/" + accountType}>
              Need An Account?
            </a>
          </div>
					<Button onClick={submit} className="login-button">
						{postLoading ? <div>{"Loading..."} <Spin size="small" /></div> : "Login"}
					</Button>
				</div>
			</div>
		)
	}
}