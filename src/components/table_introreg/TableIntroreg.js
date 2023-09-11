import React from 'react';

import { Table } from "antd";
import Column from "antd/es/table/Column";

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

    return (
        <div>
            <h3 className='introregtable-title'>Занесены в базу</h3>
            <Table
                scroll={{
                    x: 350,
                }}
                dataSource={data}>
                <Column dataIndex="id" key="id" />
                <Column className='column-display' title="UUID" dataIndex="guest_uuid" key="guest_uuid" />
                <Column title="Фамилия" dataIndex="last_name" key="last_name" />
                <Column title="Имя" dataIndex="first_name" key="first_name" />
                <Column className='column-display' title="Отчество" dataIndex="middle_name" key="middle_name" />
                <Column className='column-display' title="Эл.почта" dataIndex="email_guest" key="email_guest" />
                <Column className='column-display' title="Телефон" dataIndex="phone_guest" key="phone_guest" />
                <Column title="Статус" dataIndex="guest_status" key="guest_status" />
            </Table>
        </div>
    );
}

export default TableIntroreg;