import React from "react";

import Scanner from "../components/scanner/Scanner";
import TableRegEnter from "../components/tables_reg_enter/TableRegEnter";
import HandsRegEnter from "../hands_reg_enter/HandsRegEnter";

import './Pages.css'

const RegEnter = () => {
    return (
        <div className='container'>
            {/* <Scanner /> */}
            <HandsRegEnter />
            <TableRegEnter />
        </div>
    );
}

export default RegEnter;