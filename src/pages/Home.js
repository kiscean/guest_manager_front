import React from "react";

import {Col, Row} from "antd";
import Hello from "../components/hello/Hello";
import StartInfo from "../components/start_info/StartInfo";

import './Pages.css'

const Home = () => {
    return (
        <div className='container'>
            <Row gutter={50} className='homeblocks'>
                <Col xl={12}>
                    <Hello />
                </Col>
                <Col xl={12}>
                    <StartInfo />
                </Col>
            </Row>
        </div>
    );
}

export default Home;