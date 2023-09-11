import React from "react";

import TableIntroreg from "../components/table_introreg/TableIntroreg";
import RegForm from "../components/reg_form/RegForm";

import {Col, Row} from "antd";

import './Pages.css'

const Introduction = () => {
    return (
        <div className='container'>
            <Row>
                <Col xl={6} sm={24}>
                    <RegForm />
                </Col>
                <Col xl={18} sm={24}>
                    <TableIntroreg />
                </Col>
            </Row>
        </div>
    );
}

export default Introduction;