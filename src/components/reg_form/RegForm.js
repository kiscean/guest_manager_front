import React from 'react';
import axios from "axios";

import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';

import './RegForm.css';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 6,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 13,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 5,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

class RegForm extends React.Component {

    handleFormSubmit = (values) => {
        const last_name = values.last_name;
        const first_name = values.first_name;
        const middle_name = values.middle_name;
        const email_guest = values.email_guest;
        const phone_guest = values.phone_guest;
        const guest_status = values.guest_status;

        console.log(values)
    };

    render() {
        return (
            <div>
                <h3 className='regform-title'>Регистрация желающих в базу</h3>
                <Form
                    className='form'
                    {...formItemLayout}
                    name="register"
                    onFinish={(values) => this.handleFormSubmit(values)}
                    style={{
                        maxWidth: 600,
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name='last_name'
                        label="Фамилия"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='first_name'
                        label="Имя"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='middle_name'
                        label="Отчество"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="email_guest"
                        label="Эл.почта"
                        rules={[
                            {
                                type: 'email',
                                message: 'Введенные данные не соответствует формату эл.почты!',
                            },
                            {
                                required: true,
                                message: 'Введите электронную почту!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='phone_guest'
                        label="Телефон"
                        rules={[
                            {
                                required: true,
                                message: 'Необходимо ввести телефон!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="guest_status"
                        label="Статус"
                        rules={[
                            {
                                required: true,
                                message: 'Необходимо выбрать статус!',
                            },
                        ]}
                    >
                        <Select placeholder="выбрать статус">
                            <Option value="Гость">Гость</Option>
                            <Option value="Писатель">Писатель</Option>
                            <Option value="Чтец">Чтец</Option>
                            <Option value="Жюри">Жюри</Option>
                            <Option value="Представитель ВУЗа">Представитель ВУЗа</Option>
                            <Option value="Сотрудник АО ЗАСЛОН и ГК">Сотрудник АО ЗАСЛОН и ГК</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Занести в базу
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        );
    }
}

export default RegForm;