import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Highlighter from 'react-highlight-words';

import Column from "antd/es/table/Column";
import {CheckCircleOutlined, SearchOutlined, StopOutlined} from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';

import './TableInvitation.css';

const TableInvitation = () => {

    const [guests, setGuests] = useState([])

    const getGuests = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/guests')
        setGuests(response.data)
    }

    useEffect(() => {
        getGuests();
    }, [])

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    return (
        <div>
            <h3 className='invitationtable-title'>Заявки</h3>
            <Table
                className='table'
                scroll={{
                    x: 350,
                }}
                pagination={{
                    pageSize: 25,
                }}
                dataSource={guests}>
                <Column dataIndex="id" key="id" />
                <Column
                    title="Фамилия"
                    dataIndex="last_name"
                    key="last_name"
                    {...getColumnSearchProps('last_name')}
                />
                <Column
                    title="Имя Отчество"
                    render={(_, record) => (
                        <Space size="middle">
                            <p>{record.first_name} {record.middle_name}</p>
                        </Space>
                    )}
                />
                <Column className='column-display' title="Эл.почта" dataIndex="email_guest" key="email_guest" />
                <Column className='column-display' title="Телефон" dataIndex="phone_guest" key="phone_guest" />
                <Column
                    title="Статус"
                    dataIndex="guest_status"
                    key="guest_status"
                    sorter={(a, b) => a.guest_status.length - b.guest_status.length }
                    {...getColumnSearchProps('guest_status')}
                    sortDirections = {['descend', 'ascend']}
                />
                <Column
                    title="Действие"
                    key="action"
                    render={(_, record) => (
                        <Space direction={"horizontal"}>
                            <Button type='default'><CheckCircleOutlined /></Button>
                            <Button type="primary" danger ghost><StopOutlined />
                            </Button> <Button type='primary'>Отправить письмо</Button>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
}

export default TableInvitation;