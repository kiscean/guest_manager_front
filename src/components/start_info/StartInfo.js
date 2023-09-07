import React from 'react';

import { SmileOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';

import './StartInfo.css';

const StartInfo = () => (
    <div>
        <h3 className='startinfo-title'>Как использовать "Гостевой менеджер"</h3>
        <Timeline
            items={[
                {
                    color: 'green',
                    children: 'Перейдите на страницу "Ввод гостей"',
                },
                {
                    color: 'green',
                    children: 'Заведите желающих принять участие в мероприятии в базу данных',
                },
                {
                    color: 'red',
                    children: (
                        <>
                            <p>Перейдите на страницу "Приглашение"</p>
                            <p>Нажмите "Пригласить" чтобы отправить пригласительное письмо с QR кодом для входа на мероприятие</p>
                            <p>Нажмите "Корзина" чтобы отправить письмо с отказом</p>
                        </>
                    ),
                },
                {
                    children: (
                        <>
                            <p>Перейдите на страницу "Регистрация"</p>
                            <p>Отсканируете QR код из приглашения, чтобы зарегистрировать гостя на мероприятии</p>
                        </>
                    ),
                },
                {
                    color: '#00CCFF',
                    dot: <SmileOutlined />,
                    children: <p>Хорошего настроения!</p>,
                },
            ]}
        />
    </div>
);
export default StartInfo;