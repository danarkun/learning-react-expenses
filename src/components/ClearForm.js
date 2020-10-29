import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';

import { GlobalContext } from '../context/GlobalState';

export const ClearForm = () => {
    const { clearData } = useContext(GlobalContext);
    const history = useHistory();

    function ConfirmClear() {
        if (window.confirm("Do you really want to clear all data?")) {
            clearData().then(() =>
                history.push("./Home")
            )
        }
    }

    return (
        <div className="component">
            <Button variant="contained" color="secondary" onClick={ConfirmClear}>Clear Form</Button>
        </div>
    )
}
