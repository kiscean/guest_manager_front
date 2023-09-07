import React from "react";

import Scanner from "../components/scanner/Scanner";
import TableRegEnter from "../components/tables_reg_enter/TableRegEnter";

import './style.css';

const RegEnter = () => {
    return (
        <div>
            <Scanner />
            <TableRegEnter />
        </div>
    );
}

export default RegEnter;