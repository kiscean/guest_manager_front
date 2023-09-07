import React from 'react';
import {NavLink} from "react-router-dom";

import {Col, Layout, Row, Space} from "antd";
import {FormOutlined, MailOutlined, QrcodeOutlined} from "@ant-design/icons";
import logo from '../../assets/img/zaslon_logo_white.png';

import './Header.css';

const Header = () => {
    const { Header } = Layout;
    return (
        <Header className="header">
            <Space direction="horizontal">
                <Space direction="horizontal">
                    <NavLink to='/'>
                        <img  src={logo} alt="main_logo" className="header__logo-link"/>
                    </NavLink>
                    <p className="header__logo-description">ГОСТЕВОЙ МЕНЕДЖЕР</p>
                </Space>
                <Space direction="horizontal" className='header-menu'>
                    <Row gutter={5}>
                        <Col>
                            <NavLink to='/introduction' className='header-menu__link'>
                                <FormOutlined className='header-menu__link-icon' /> <span className='header-menu__link-text'>Ввод гостей</span>
                            </NavLink>
                        </Col>
                        <Col>
                            <NavLink to='/invitation' className='header-menu__link'>
                                <MailOutlined className='header-menu__link-icon' /> <span className='header-menu__link-text'>Приглашение</span>
                            </NavLink>
                        </Col>
                        <Col>
                            <NavLink to='/regenter' className='header-menu__link'>
                                <QrcodeOutlined className='header-menu__link-icon' /> <span className='header-menu__link-text'>Регистрация</span>
                            </NavLink>
                        </Col>
                    </Row>
                </Space>
            </Space>
        </Header>
    );
};

export default Header;