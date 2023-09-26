import React, {useEffect, useState} from "react";

import {Html5Qrcode} from "html5-qrcode";

import './Scanner.css';
import {Button, Input, Modal, Space} from "antd";
import axios from "axios";

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

    const success = () => {
        Modal.success({
            content: 'Гость зарегистрирован',
        });
    };

    const error = () => {
        Modal.error({
            title: 'Такой гость уже зарегистрирован',
            content: 'Иван Иванович прибыл на мероприятие в 16:32',
        });
    };

    const [guests, setGuests] = useState([])

    const getGuests = async () => {

        const response = await axios.get('http://127.0.0.1:8000/api/guests/')
        setGuests(response.data)
    }

    useEffect(() => {
        getGuests();
    }, [])

    const handleUpdateInvitation = async (id, value) => {
        return axios.patch(`http://127.0.0.1:8000/api/guests/${id}/`, value)
            .then((res) => {
                const { data } = res;
                const newGuests = guests.map(t => {
                    if (t.id === id) {
                        return data;
                    }
                    return t;
                })
                setGuests(newGuests);
            }).catch(() => {
                alert("Что-то пошло не так :(")
            })
    }

    const addInvitationInfo = async (id) => {
        await axios.get(`http://127.0.0.1:8000/api/guests/${id}/`)
            .then(response => {
                const uuID = response.data.guest_uuid
                const lastName = response.data.last_name
                const firstName = response.data.first_name
                const middleName = response.data.middle_name
                const phoneGuest = response.data.phone_guest
                const guestStatus = response.data.guest_status

                let dataField = new FormData()

                dataField.append('guest_uuid', uuID)
                dataField.append('last_name', lastName)
                dataField.append('first_name', firstName)
                dataField.append('middle_name', middleName)
                dataField.append('phone_guest', phoneGuest)
                dataField.append('guest_status', guestStatus)

                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/regenter/',
                    data: dataField
                }).then((response) => {
                    console.log(response.data);
                    window.location.reload();
                })
                console.log(FormData)
            })
    }

    return (
        <div>
            <div className='scanner'>
                <div id='qrCodeContainer'></div>
                {qrMessage && <div className='qr-message'>{qrMessage}</div>}
            </div>
            <div className='button-center'>
                <Button className='scaner__button' danger type='primary' size='large' onClick={() => setEnabled(!isEnabled)}>{isEnabled ? "Сканировать" : "Остановить"}</Button>
            </div>
            <div className='scanner-handsreg'>
                <Space.Compact
                    className='scanner-input'
                >
                    <Input defaultValue="UUID гостя" />
                    <Button type="primary">Зарегистрировать</Button>
                </Space.Compact>
            </div>

            <div>
                <Space wrap>
                    <Button onClick={success}>Success</Button>
                    <Button onClick={error}>Error</Button>
                </Space>
            </div>
        </div>
    );
}

export default Scanner;