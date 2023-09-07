import React from "react";

import Scanner from "../components/scanner/Scanner";
import TableRegEnter from "../components/tables_reg_enter/TableRegEnter";

import './Pages.css'

const RegEnter = () => {
    return (
        <div className='container'>
            <Scanner />
            <TableRegEnter />
        </div>
    );
}

export default RegEnter;