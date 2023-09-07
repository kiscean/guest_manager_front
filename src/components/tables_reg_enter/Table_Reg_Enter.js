import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import {CheckOutlined, SearchOutlined} from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';

import './style.css';

const data = [
    {
        key: '1',
        lastname: 'Петроф',
        firstname: 'Иван',
        middlename: 'Васильевич',
        phone: 89112265874,
        status: 'guest',
        regtime: '16:40',
    },
    {
        key: '2',
        lastname: 'Федоров',
        firstname: 'Юрий',
        middlename: 'Геннадьевич',
        phone: 89112265874,
        status: 'speacker',
        regtime: '12:10',
    },
    {
        key: '3',
        lastname: 'Маркин',
        firstname: 'Сергей',
        middlename: 'Владимирович',
        phone: 89112265874,
        status: 'guest',
        regtime: '13:20',
    },
    {
        key: '4',
        lastname: 'Астафьева',
        firstname: 'Нина',
        middlename: 'Илларионовна',
        phone: 89112265874,
        status: 'speacker',
        regtime: '12:10',
    },
    {
        key: '5',
        lastname: 'Савина',
        firstname: 'Юлианна',
        middlename: 'Васильевна',
        phone: 89112265874,
        status: 'speacker',
        regtime: '11:10',
    },
    {
        key: '6',
        lastname: 'Сомов',
        firstname: 'Федор',
        middlename: 'Геннадьевич',
        phone: 89112265874,
        status: 'speacker',
        regtime: '12:19',
    },
];



const Table_Reg_Enter = () => {

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
    const columns = [
        {
            dataIndex: 'key',
            rowScope: 'row',
            width: '50px',
        },

        {
            title: 'ФИО',
            ...getColumnSearchProps('lastname'),
            render: (_, record) => (
                <Space size="middle">
                    <p>{record.lastname} {record.firstname} {record.middlename}</p>
                </Space>
            ),
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            sorter: true,
            width: '15%',
        },
        {
            title: 'Время регистрации',
            dataIndex: 'regtime',
            key: 'regtime',
            sorter: true,
            width: '10%',
        },
        {
            title: 'Вход',
            render: () => <CheckOutlined />,
            width: '40px',
            align: 'center',
        },
    ];

    return (
        <div className='container'>
            <h3>Прошедшие регистрацию</h3>
            <Table
                columns={columns}
                dataSource={data}
                scroll={{
                    x: 600,
                }}
            />
        </div>
    );
}

export default Table_Reg_Enter;