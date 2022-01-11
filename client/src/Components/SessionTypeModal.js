import React, {useState, useEffect} from "react";
import {Modal, Button, Input, Spin, Alert} from "antd"
import { addSessionType } from "../Actions/AuthActions";
import {useDispatch, useSelector} from "react-redux";

export default function SessionTypeModal(props) {

	const [type, setType] = useState("");
	const [error, setError] = useState("");
	const [sentLoading, setSentLoading] = useState(false);

	const trainer = useSelector(state => state.auth.trainer)
	const err = useSelector(state => state.auth.typeError);
	
	const dispatch = useDispatch();
	const token = localStorage.getItem("token");

	useEffect(() => {
		dispatch({type: "CLEAR_ERROR"});
	}, [dispatch])

	const changeHandler = (e) => {
		setType(e.target.value);
	}

	const close = () => {
		setType("");
		props.close();
	}

	const submit = () => {
		setSentLoading(true);
		if (type === "") {
			setError("Please Enter A Session Type");
		} else {
			dispatch(addSessionType(token, type, trainer.id));
		}

		if (!err) {
			setSentLoading(true);
			setTimeout(() => {
				setSentLoading(false);
				close();
			}, 2000)
		} else {
			setSentLoading(false);
		}
	}

	return (
		<Modal
			title="Add Session Type"
			visible={props.open}
			onCancel={close}
			width={350}
			onOk={submit}
			footer={[
        <Button key="Save" onClick={() => submit()} type="primary">
          {
            !err && !error && sentLoading ? 
              <div key="saving">
                {"Saving..."} <Spin size="small" />
              </div> : "Save"
          }
        </Button>,
        <Button key="Cancel" onClick={close} type="primary" danger>
          Cancel
        </Button>
      ]}
		>		
			{
      	err || error ? <Alert className="type-error" message={err ? err : error} type="error" /> : null
    	}
			<Input value={type} type="text" placeholder="New Session Type..." onChange={changeHandler} />
		</Modal>
	)
}