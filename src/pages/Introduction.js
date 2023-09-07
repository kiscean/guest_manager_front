import React from "react";

import TableIntroreg from "../components/table_introreg/TableIntroreg";
import RegForm from "../components/reg_form/RegForm";
import QRcode_Generator from "../components/qrcode_generator/QrCodeGenerator";

import './style.css';

const Introduction = () => {
    return (
        <div>
            <RegForm />
            <TableIntroreg />
        </div>
    );
}

export default Introduction;