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
        const response = await axios.get('http://127.0.0.1:8000/api/guests/')
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

    const handleUpdateInvitation = async (id, value) => {
        return axios.patch(`http://127.0.0.1:8000/api/guests/${id}/`, value)
            .then((res) => {
                const { data } = res;
                const newGuests = guests.map(t => {
                    if (t.id === id) {
                        return data;
                    }
                    return t;
                })
                setGuests(newGuests);
            }).catch(() => {
                alert("Something went wrong")
            })

        const sendEmailGuest = async (id, first_name, middle_name, email_guest, invitation) => {
            let dataForEmail = new FormData()

            dataForEmail.append('first_name', first_name)
            dataForEmail.append('middle_name', middle_name)
            dataForEmail.append('email_guest', email_guest)
            dataForEmail.append('invitation', invitation)

            await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/guests/',
                data: dataForEmail
            }).then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            console.log(FormData)
        }

    }

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
                    pageSizeOptions: ['25', '50', '100'],
                }}
                dataSource={guests}>
                <Column
                    key="id"
                    render={() => (
                        <Space size="middle">
                            <p>{guests.id}</p>
                        </Space>
                    )}
                />
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
                    title="Эл.почта"
                    dataIndex="email_guest"
                    key="id" />
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
                    title="Действие"
                    dataIndex="invitation"
                    key="id"
                    render={(_, record) => (
                        <Space direction={"horizontal"}>
                            <Button
                                disabled={record.invitation == 0 ? false : true}
                                type='default'
                                onClick={() => { handleUpdateInvitation(record.id, {invitation: '1'}) }}
                            >
                                <CheckCircleOutlined className={record.invitation == 1 ? 'invitationtable-button__icon-green' : ''}/>
                            </Button>
                            <Button
                                disabled={record.invitation == 0 ? false : true}
                                type="primary" danger ghost
                                onClick={() => { handleUpdateInvitation(record.id, {invitation: '2'}) }}
                            >
                                <StopOutlined className={record.invitation == 2 ? 'invitationtable-button__icon-red' : ''}/>
                            </Button>
                            <Button
                                disabled={record.send_message == true ? true : false}
                                type='primary'
                                onClick={() => { handleUpdateInvitation(record.id, {send_message: 'True'}) }}
                            >
                                Отправить письмо
                            </Button>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
}

export default TableInvitation;