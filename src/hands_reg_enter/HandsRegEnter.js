import React, {useEffect, useState} from "react";

import './HandsRegEnter.css';
import {Button, Input, Modal, Space} from "antd";

const HandsRegEnter = () => {

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

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    return(
        <div>
            <h3 className='regenter-title'>Регистрация</h3>
            <div className='regenter-zone'>
                <div className='scanner-handsreg'>
                    <Input className='scanner-input' placeholder="UUID гостя" />
                </div>
                <Button type="default" onClick={showModal}>
                    Зарегистрировать
                </Button>
                <div>
                    <Modal
                        title="Регистрация входа"
                        open={open}
                        onOk={hideModal}
                        onCancel={hideModal}
                        okText="Зарегистрировать"
                        cancelText="Позже"
                    >
                        <p>Иван Иванович Иванов</p>
                        <p>Сотрудник ЗАСЛОН</p>
                    </Modal>
                    <Space wrap>
                        <Button onClick={error}>Error</Button>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default HandsRegEnter;