import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import {CheckCircleOutlined, DeleteOutlined, SearchOutlined, StopOutlined} from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';

import './TableInvitation.css';

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

const TableInvitation = () => {

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
            className: 'column-display',
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
            sorter: true,
            width: '15%',
        },
        {
            title: 'Действие',
            render: () => (
                <Space>
                    <Button type='default'><CheckCircleOutlined /></Button> <Button type="primary" danger ghost><StopOutlined /></Button> <Button type='primary'>Отправить письмо</Button>
                </Space>
            ),
            align: 'center',
        },
    ];

    return (
        <div>
            <h3 className='invitationtable-title'>Отправка приглашений</h3>
            <Table
                className='table'
                columns={columns}
                dataSource={data}
                scroll={{
                    x: 400,
                }}
            />
        </div>
    );
}

export default TableInvitation;