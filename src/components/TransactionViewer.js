import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";

export const TransactionViewer = () => {
    const location = useLocation();
    useEffect(() => {
        console.log(location.state.detail);
    }, [location])
    
    return (
        <div>
            <h1>TRANSACTION VIEWER</h1>
        </div>
    )
}
