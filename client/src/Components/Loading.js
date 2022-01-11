import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

export default function Loading() {
  return (
    <div className="loading-div">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
    </div>
  )
}