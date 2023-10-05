import React, {useEffect, useState} from 'react';

import { Table } from "antd";
import Column from "antd/es/table/Column";

import './TableIntroreg.css';
import axios from "axios";

const TableIntroreg = () => {

    const [guests, setGuests] = useState([])

    const getGuests = async () => {
        const response = await axios.get('http://172.22.228.83:8000/api/guests/')
        setGuests(response.data)
    }

    useEffect(() => {
        getGuests();
    }, [])

    return (
        <div>
            <h3 className='introregtable-title'>Занесены в базу</h3>
            <Table
                scroll={{
                    x: 350,
                }}
                dataSource={guests}>
                <Column dataIndex="id" key="id" />
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