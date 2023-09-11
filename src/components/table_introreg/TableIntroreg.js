import React from 'react';
import axios from 'axios';

import {Space, Table} from "antd";

import './TableIntroreg.css';

const columns = [
    {
        dataIndex: 'guest_uuid',
        rowScope: 'row',
        width: '50px',
    },

    {
        title: 'ФИО',
        render: (_, record) => (
            <Space size="middle">
                <p>{record.last_name} {record.first_name} {record.middle_name}</p>
            </Space>
        ),
    },
    {
        title: 'Эл.почта',
        className: 'column-display',
        dataIndex: 'email_guest',
        key: 'email_guest',
    },
    {
        title: 'Телефон',
        className: 'column-display',
        dataIndex: 'phone_guest',
        key: 'phone_guest',
    },
    {
        title: 'Статус',
        dataIndex: 'guest_status',
        key: 'sguest_status',
        width: '15%',
    },
];

class TableIntroreg extends React.Component {

    state = { detail: [], }

    componentDidMount() {
        let data;
        axios.get('http://127.0.0.1:8000/')
        .then(res => {
            data = res.data;
            this.setState({
                details: data
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <h3 className='introregtable-title'>Занесены в базу</h3>
                <Table
                    className='table'
                    columns={columns}
                    dataSource={this.data}
                    scroll={{
                        x: 350,
                    }}
                />
            </div>
        );
    }
}

export default TableIntroreg;