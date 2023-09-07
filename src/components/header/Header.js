import React from 'react';
import {NavLink} from "react-router-dom";

import {Layout, Space} from "antd";
import logo from '../../assets/img/zaslon_logo_white.png';

import './Header.css';

const Header = () => {
    const { Header } = Layout;
    return (
        <Header className="header">
            <Space direction="horizontal">
                <Space direction="horizontal">
                    <a href="#">
                        <img  src={logo} alt="main_logo" className="header__logo-link"/>
                    </a>
                    <p className="header__logo-description">ГОСТЕВОЙ МЕНЕДЖЕР</p>
                </Space>
            </Space>
        </Header>
    );
};

export default Header;