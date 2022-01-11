import React from "react";
import { ExclamationCircleTwoTone } from "@ant-design/icons";

export default function TrainerNotificationHeader(props) {
	return (
		<div className="trainer-notification-header">
			<ExclamationCircleTwoTone />
			<h3>Select Trainer</h3>
		</div>
	)
}