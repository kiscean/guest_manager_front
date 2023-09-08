import React from 'react';
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

const RegForm = () => {

    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 60,
                }}
            >
                <Option value="7">+7</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div>
            <h3 className='regform-title'>Регистрация желающих в базу</h3>
            <Form
                className='form'
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    prefix: '7',
                }}
                style={{
                    maxWidth: 600,
                }}
                scrollToFirstError
            >
                <Form.Item
                    name='lastname'
                    label="Фамилия"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='firstname'
                    label="Имя"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='middlename'
                    label="Отчество"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Телефон"
                    rules={[
                        {
                            required: true,
                            message: 'Необходимо ввести телефон!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Статус"
                    rules={[
                        {
                            required: true,
                            message: 'Необходимо выбрать статус!',
                        },
                    ]}
                >
                    <Select placeholder="выбрать статус">
                        <Option value="guest">Гость</Option>
                        <Option value="author">Писатель</Option>
                        <Option value="speaker">Чтец</Option>
                        <Option value="jury">Жюри</Option>
                        <Option value="representative">Представитель ВУЗа</Option>
                        <Option value="employee">Сотрудник АО "ЗАСЛОН и ГК</Option>
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

export default RegForm;