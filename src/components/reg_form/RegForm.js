import React, {useState} from 'react';
import axios from "axios";

import {Button, Col, Form, Input, Radio, Row, Space} from 'antd';

import './RegForm.css';

const RegForm = () => {

    const [last_name, setLastName] = useState('')
    const [first_name, setFirstName] = useState('')
    const [middle_name, setMiddleName] = useState('')
    const [email_guest, setEmailGuest] = useState('')
    const [phone_guest, setPhoneGuest] = useState('')
    const [guest_status, setStatusGuest] = useState('')

    return (
            <div>
                <h3 className='regform-title'>Регистрация желающих в базу</h3>
                <Row className='regform-form'>
                    <Col span={24}>
                        <Input
                            name='last_name'
                            rootClassName='regform__input'
                            placeholder="Фамилия"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Col>
                    <Col span={24}>
                        <Input
                            name='first_name'
                            rootClassName='regform__input'
                            placeholder="Имя"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Col>
                    <Col span={24}>
                        <Input
                            name='middle_name'
                            rootClassName='regform__input'
                            placeholder="Отчество"
                            value={middle_name}
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </Col>
                    <Col span={24}>
                        <Input
                            name='email_guest'
                            rootClassName='regform__input'
                            placeholder="Эл.адрес"
                            type='email'
                            message='Введенные данные не соответствует формату эл.почты!'
                            value={email_guest}
                            onChange={(e) => setEmailGuest(e.target.value)}
                        />
                    </Col>
                    <Col span={24}>
                        <Input
                            name='phone_guest'
                            rootClassName='regform__input'
                            placeholder="Номер телефона"
                            value={phone_guest}
                            onChange={(e) => setPhoneGuest(e.target.value)}
                        />
                    </Col>
                    <Col span={24}>
                        <Radio.Group
                            name='guest_status'
                            value={guest_status}
                            onChange={(e) => setStatusGuest(e.target.value)}
                        >
                            <Space direction="vertical">
                                <Radio value="Гость">Гость</Radio>
                                <Radio value="Писатель">Писатель</Radio>
                                <Radio value="Чтец">Чтец</Radio>
                                <Radio value="Жюри">Жюри</Radio>
                                <Radio value="Представитель ВУЗа">Представитель ВУЗа</Radio>
                                <Radio value="Сотрудник АО ЗАСЛОН и ГК">Сотрудник АО ЗАСЛОН и ГК</Radio>
                            </Space>
                        </Radio.Group>
                    </Col>
                    <Col span={24}>
                        <Button className='regform__button' type="primary">Записать в базу</Button>
                    </Col>
                </Row>
            </div>
        );
    }

export default RegForm;