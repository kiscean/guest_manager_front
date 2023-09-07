import React from 'react';
import {NavLink} from "react-router-dom";

import {Layout} from "antd";

import './Footer.css';

const Footer = () => {
    const { Footer } = Layout;
    return (
        <Footer className='footer'>
            ©2023 Гостевой менедер
        </Footer>
    );
};

export default Footer;