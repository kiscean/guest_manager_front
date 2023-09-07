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
                    <span className="header__logo-description">
                        <h2>ГОСТЕВОЙ МЕНЕДЖЕР</h2>
                    </span>
                </Space>
            </Space>
        </Header>
    );
};

export default Header;