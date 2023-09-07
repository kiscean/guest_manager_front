import React from 'react';

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