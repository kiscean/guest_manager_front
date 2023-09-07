import React, {useEffect, useState} from "react";

import {Html5Qrcode} from "html5-qrcode";

import './Scanner.css';
import {Button} from "antd";

const Scanner = () => {
    const [isEnabled, setEnabled] = useState(false);
    const [qrMessage, setQrMessage] = useState("");

    useEffect(() => {
        const config = {fps: 10, qrbox: {width: 200, height: 200}};
        const html5QrCode = new Html5Qrcode("qrCodeContainer");

        const qrScanerStop = () => {
            if(html5QrCode && html5QrCode.isScanning) {
                html5QrCode
                    .stop()
                    .then(() => console.log("Scaner stop"))
                    .catch(() => console.log("Scaner error"))
            }
        }

        const qrCodeSuccess = (decodedText) => {
            setQrMessage(decodedText);
            setEnabled(false);
        }

        if(isEnabled) {
            html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccess);
            setQrMessage("")
        } else {
            qrScanerStop()
        }

        return(() => {
            qrScanerStop();
        })
    }, [isEnabled])
    return (
        <div>
            <div className='scanner'>
                <div id='qrCodeContainer'></div>
                {qrMessage && <div className='qr-message'>{qrMessage}</div>}
            </div>
            <div className='button-center'>
                <Button className='scaner__button' danger type='primary' size='large' onClick={() => setEnabled(!isEnabled)}>{isEnabled ? "Сканировать" : "Остановить"}</Button>
            </div>
        </div>
    );
}

export default Scanner;