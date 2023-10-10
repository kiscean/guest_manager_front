import React, {useEffect, useState} from "react";

import {Button, Col, Divider, Input, Row, Space, message} from "antd";
import axios from "axios";
import {SearchOutlined} from "@ant-design/icons";

import './HandsRegEnter.css';

const HandsRegEnter = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const success = (a, b, c) => {
        messageApi.open({
            type: 'success',
            content: `${a} ${b} ${c} зарегистрирован(а)!`,
        });
    };

    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 1000);
    };

    const [guests, setGuests] = useState([])
    const [input, setInput] = useState("");

    const fetchGuests = (value) => {
        fetch('http://172.22.228.83:8000/api/guests/')
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((guest) => {
                    return guest && guest.guest_uuid && guest.guest_uuid.toLowerCase().includes(value)
                });
                setResults(results);
            });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchGuests(value);
    }

    const getGuests = async () => {

        const response = await axios.get('http://172.22.228.83:8000/api/guests/')
        setGuests(response.data)
    }

    useEffect(() => {
        getGuests();
    }, [])

    const handleUpdateRegEnter = async (id, value) => {
        return axios.patch(`http://172.22.228.83:8000/api/guests/${id}/`, value)
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
                alert("Что-то пошло не так :(")
            })
    }

    const addEnterRegInfo = async (id) => {
        await axios.get(`http://172.22.228.83:8000/api/guests/${id}/`)
            .then(response => {
                const lastName = response.data.last_name
                const firstName = response.data.first_name
                const middleName = response.data.middle_name
                const guestPhone = response.data.phone_guest
                const guestStatus = response.data.guest_status
                const uuID = response.data.guest_uuid

                let dataField = new FormData()

                dataField.append('last_name', lastName)
                dataField.append('first_name', firstName)
                dataField.append('middle_name', middleName)
                dataField.append('phone_guest', guestPhone)
                dataField.append('guest_status', guestStatus)
                dataField.append('guest_uuid', uuID)

                axios({
                    method: 'post',
                    url: 'http://172.22.228.83:8000/api/regenter/',
                    data: dataField
                }).then((response) => {
                    console.log(response.data);
                    setTimeout(function (){
                        window.location.reload();
                    }, 1000)
                })
                console.log(FormData)
            })
    }

    const [results, setResults] = useState([]);

    return(
        <div>
            {contextHolder}
            <h3 className='regenter-title'>Регистрация</h3>
            <div className='regenter-zone'>
                <Space direction={"vertical"}>
                    <Input
                        className='regenter-input'
                        prefix={<SearchOutlined />}
                        size="large"
                        placeholder="UUID гостя"
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    <h5>Результат поиска</h5>
                    <div className='regenter-results'>
                        {
                            results.map((result, id) => (
                                <div key={id}>
                                    <Row justify={"center"}>
                                        <Col span={16} className='regenter-results__name'>
                                            <div className='regenter-results__name-bold'>{result.first_name + " " + result.middle_name}</div>
                                            <div className='regenter-results__name-bold'>{result.last_name}</div>
                                            <div className='regenter-results__status'>{result.guest_status}</div>
                                        </Col>
                                        <Col span={8} className='regenter-results__button'>
                                            <Button
                                                type="primary"
                                                size="large"
                                                loading={loadings[0]}
                                                disabled={result.enter_status === true ? true : false}
                                                onClick={() => {success(result.last_name, result.first_name, result.middle_name); enterLoading(0); addEnterRegInfo(result.id); handleUpdateRegEnter(result.id, {enter_status: 'True'});}}
                                            >
                                                Вход
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Divider className='regenter-divider' />
                                </div>
                            ))
                        }
                    </div>
                </Space>
            </div>
        </div>
    );
};

export default HandsRegEnter;