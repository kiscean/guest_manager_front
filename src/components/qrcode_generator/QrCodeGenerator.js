import React, {useState} from "react";

import QRCode from 'qrcode';
import {Button, Input} from "antd";

import './QrCodeGenerator.css';

const QrCodeGenerator = () => {

    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(text);
            setImageUrl(response);
        }catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Input placeholder="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
            <Button type='primary' danger onClick={() => generateQrCode()}>Генерировать</Button>

            {imageUrl ? (
                <a href={imageUrl} download>
                    <img src={imageUrl} alt="img"/>
                </a>) : null}
        </div>
    );
}

export default QrCodeGenerator;