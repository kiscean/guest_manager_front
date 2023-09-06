import React from "react";

import Introreg from "../components/introduction/Introreg";
import QRcode_Generator from "../components/qrcode_generator/QrCodeGenerator";

import './style.css';

const Introduction = () => {
    return (
        <div>
            <Introreg />
            <QRcode_Generator />
        </div>
    );
}

export default Introduction;