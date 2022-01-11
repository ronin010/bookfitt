import AxiosInstance from "../AxiosInstance";
import React, {useEffect, useState} from "react";
import{Modal, Button, Input, Alert, Spin} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import TrainerProfileModal from "./TrainerProfileModal";
const {Search} = Input; 

export default function SelectTrainerModal(props) {

	const [loading, setLoading] = useState(false);
	const [type, setType] = useState("");
	const [err, setErr] = useState("");
	const token = localStorage.getItem("token");
	const [trainers, setTrainers] = useState([]);
  const [trainerProfileOpen, setTrainerProfileOpen] = useState(false);
  const [activeTrainer, setActiveTrainer] = useState({});

	const close = () => {
		setType("");
    setTrainers([])
		props.cancel();
	}

	const loadTrainers = () => {
		
		setLoading(true);

		if (type === "") {
			setLoading(false)
			setErr("Please enter a session type.")
			setTimeout(() => {
				setErr("");
			}, 2000)
		} else {
			setTimeout(() => {
				const config = {
					headers: {
						"Authorization": token
					}
				}
	
				AxiosInstance.get(`/api/trainers/session-type/trainers/${type}`, config)
				.then((res) => {
					setTrainers(res.data)
					setLoading(false)
				})
				.catch((err) => {
					setLoading(false)
					if (err.response.data.status === 500) {
						setErr("Internal Server Error")
					} else {
						setErr(err.response.data.message);
					}
				})
			}, 2000)
		}
	}

  const closeProfile = () =>  {
    setTrainerProfileOpen(false)
    setActiveTrainer({});
  }
  

	return (
		<Modal
			visible={props.open}
			onCancel={close}
			title="Find A Trainer"
			footer={[
				<Button type="primary" danger onClick={close} key="cancel">
					Cancel
				</Button>
			]}
		>
			<div className="trainer-search">
				{
					err ? <Alert message={err} type="error" showIcon /> : null
				}
				<h3 style={{marginBottom: "20px"}}>Search By Session Type (eg: boxing, cardio, etc...)</h3>
				{
					<Search onChange={(e) => setType(e.target.value)} value={type} placeholder="Type..." onSearch={loadTrainers}  />
				}
				<div className={loading ? "search-loading" : "trainer-search-div"}>
					{

						loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 45}} className="trainer-search-spin" spin />} /> :
							trainers ?
									trainers.map((trainer, idx) => (
										<div onClick={() => {setActiveTrainer(trainer); setTrainerProfileOpen(true);}} className="trainer-search-button" key={idx}>
											<h3>{trainer.firstName + " " + trainer.lastName}</h3>
                      <p>
                        [
                          {trainer.sessionTypes.map((type, idx) => (
                            <span key={idx}>{type.type},</span>
                          ))}
                        ]
                      </p>
                      
										</div>
									)) : <h3 className="empty-trainers">No Trainers Found</h3>
					}
          <TrainerProfileModal title={activeTrainer.firstName + " " + activeTrainer.lastName} open={trainerProfileOpen} cancel={closeProfile} trainer={activeTrainer} />
				</div>
			</div>
		</Modal>
	)
}