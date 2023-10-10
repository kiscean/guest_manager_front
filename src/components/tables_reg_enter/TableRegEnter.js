import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';

import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';

import './TableRegEnter.css';
import Column from "antd/es/table/Column";
import axios from "axios";

const TableRegEnter = () => {

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

    const [guests, setGuests] = useState([])

    const getGuests = async () => {
        const response = await axios.get('http://172.22.228.83:8000/api/regenter/')
        setGuests(response.data)
    }

    useEffect(() => {
        getGuests();
    }, [])

    return (
        <div>
            <h3 className='regentertable-title'>Зарегистрировались</h3>
            <Table
                className='table'
                scroll={{
                    x: 350,
                }}
                pagination={{
                    pageSize: 25,
                    pageSizeOptions: ['25', '50', '100'],
                }}
                dataSource={guests}>
                <Column dataIndex="id" key="id" />
                <Column
                    title="Фамилия"
                    dataIndex="last_name"
                    key="id"
                    {...getColumnSearchProps('last_name')}
                />
                <Column
                    title="Имя Отчество"
                    key="id"
                    render={(_, record) => (
                        <Space size="middle">
                            <p>{record.first_name} {record.middle_name}</p>
                        </Space>
                    )}
                />
                <Column
                    className='column-display'
                    title="Телефон"
                    dataIndex="phone_guest"
                    key="id" />
                <Column
                    title="Статус"
                    dataIndex="guest_status"
                    key="id"
                    sorter={(a, b) => a.guest_status.length - b.guest_status.length }
                    {...getColumnSearchProps('guest_status')}
                    sortDirections = {['descend', 'ascend']}
                />
                <Column
                    title="Время"
                    dataIndex="time_create"

                    key="id" />
                <Column
                    title="Вошел"
                    key="id"
                    render = {(_, record) => (
                        <CheckOutlined />
                    )}
                />
            </Table>
        </div>
    );
}

export default TableRegEnter;