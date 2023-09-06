import React from "react";

import './style.css';
import Scanner from "../components/scanner/Scanner";
import Table_Reg_Enter from "../components/tables_reg_enter/Table_Reg_Enter";

const RegEnter = () => {
    return (
        <div>
            <Scanner />
            <Table_Reg_Enter />
        </div>
    );
}

export default RegEnter;