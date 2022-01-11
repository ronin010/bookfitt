import React from "react";
import {Modal, Button} from "antd";

export default function ClientProfileModal(props) {

	const {firstName, lastName, email, mobileNumber, accountPrivacy} = props.client;
	const fullName = firstName + " " + lastName;

	return (
		<Modal 
			classNamee="client-profile-modal"
			visible={props.open}
			onCancel={props.close}
			title="Client Profile"
			footer={[
				<Button key="close" onClick={props.close} type="primary" danger>
					Close
				</Button>
			]}
		>
			<div className="client-profile">
				<h2>
					{fullName}
				</h2>
				
					
				<div>
					<h4>Email Address: {email}</h4>
					<h4>phone Number: {mobileNumber}</h4>
				</div>
						
				
			</div>
		</Modal>
	)
}