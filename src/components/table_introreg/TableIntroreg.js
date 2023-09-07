import React from 'react';

import {Space, Table} from "antd";

import './TableIntroreg.css';

const data = [
    {
        key: '1',
        lastname: 'Петроф',
        firstname: 'Иван',
        middlename: 'Васильевич',
        email: 'company@company.com',
        phone: 89112265874,
        status: 'guest',
        regtime: '16:40',
    },
    {
        key: '2',
        lastname: 'Федоров',
        firstname: 'Юрий',
        middlename: 'Геннадьевич',
        email: 'company@company.com',
        phone: 89112265874,
        status: 'speacker',
        regtime: '12:10',
    },
    {
        key: '3',
        lastname: 'Маркин',
        firstname: 'Сергей',
        middlename: 'Владимирович',
        email: 'company@company.com',
        phone: 89112265874,
        status: 'guest',
        regtime: '13:20',
    },
    {
        key: '4',
        lastname: 'Астафьева',
        firstname: 'Нина',
        middlename: 'Илларионовна',
        email: 'company@company.com',
        phone: 89112265874,
        status: 'speacker',
        regtime: '12:10',
    },
    {
        key: '5',
        lastname: 'Савина',
        firstname: 'Юлианна',
        middlename: 'Васильевна',
        email: 'company@company.com',
        phone: 89112265874,
        status: 'speacker',
        regtime: '11:10',
    },
    {
        key: '6',
        lastname: 'Сомов',
        firstname: 'Федор',
        middlename: 'Геннадьевич',
        email: 'company@company.com',
        phone: 89112265874,
        status: 'speacker',
        regtime: '12:19',
    },
];

const TableIntroreg = () => {

    const columns = [
        {
            dataIndex: 'key',
            rowScope: 'row',
            width: '50px',
        },

        {
            title: 'ФИО',
            render: (_, record) => (
                <Space size="middle">
                    <p>{record.lastname} {record.firstname} {record.middlename}</p>
                </Space>
            ),
        },
        {
            title: 'Эл.почта',
            className: 'column-display',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Телефон',
            className: 'column-display',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
        },
    ];

    return (
        <div>
            <h3 className='introregtable-title'>Занесены в базу</h3>
            <Table
                className='table'
                columns={columns}
                dataSource={data}
                scroll={{
                    x: 350,
                }}
            />
        </div>
    );
}

export default TableIntroreg;