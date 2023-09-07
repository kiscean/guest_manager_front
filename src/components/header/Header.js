import React from 'react';
import {NavLink} from "react-router-dom";

import {Layout, Space} from "antd";

import './Header.css';

const Header = () => {
    const { Header } = Layout;
    return (
        <Header className="header">
            <Space direction="horizontal">
                Header
            </Space>
        </Header>
    );
};

export default Header;