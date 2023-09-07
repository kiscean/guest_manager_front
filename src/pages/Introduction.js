import React from "react";

import TableIntroreg from "../components/table_introreg/TableIntroreg";
import RegForm from "../components/reg_form/RegForm";
import QRcode_Generator from "../components/qrcode_generator/QrCodeGenerator";

import {Col, Row} from "antd";

const Introduction = () => {
    return (
        <div>
            <Row>
                <Col xl={12} sm={24}>
                    <RegForm />
                </Col>
                <Col xl={12} sm={24}>
                    <TableIntroreg />
                </Col>
            </Row>
        </div>
    );
}

export default Introduction;