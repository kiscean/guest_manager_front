import React from 'react';
import axios from "axios";

import {Button, Col, Form, Input, Radio, Row, Space} from 'antd';

import './RegForm.css';

class RegForm extends React.Component {

    state = {
        last_name: '',
        first_name: '',
        middle_name: '',
        email_guest: '',
        phone_guest: '',
        guest_status: '',
    }

    handleFormSubmit = (values) => {
        const last_name = values.last_name;
        const first_name = values.first_name;
        const middle_name = values.middle_name;
        const email_guest = values.email_guest;
        const phone_guest = values.phone_guest;
        const guest_status = values.guest_status;

        axios.post(`https://127.0.0.1:8000`, {last_name, first_name, middle_name, email_guest, phone_guest, guest_status} )
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    };

    render() {

        return (
            <div>
                <h3 className='regform-title'>Регистрация желающих в базу</h3>
                    <Form className='regform-form'>
                        <Row>
                            <Col span={24}>
                                <Input rootClassName='regform__input' placeholder="Фамилия" />
                            </Col>
                            <Col span={24}>
                                <Input rootClassName='regform__input' placeholder="Фамилия" />
                            </Col>
                            <Col span={24}>
                                <Input rootClassName='regform__input' placeholder="Имя" />
                            </Col>
                            <Col span={24}>
                                <Input rootClassName='regform__input' placeholder="Отчество" />
                            </Col>
                            <Col span={24}>
                                <Input rootClassName='regform__input' placeholder="Эл.адрес" rules={[{type: 'email', message: 'Введенные данные не соответствует формату эл.почты!'}]}/>
                            </Col>
                            <Col span={24}>
                                <Input rootClassName='regform__input' placeholder="Номер телефона" />
                            </Col>
                            <Col span={24}>
                                <Radio.Group>
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
                    </Form>
            </div>
        );
    }
}

export default RegForm;