import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

export default function NoMatch(props) {
  const history = useHistory();

  return (
    <div>
      <Result 
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={() => history.push("/login")} type="primary">Back Home</Button>}
      />
    </div>
  )
}