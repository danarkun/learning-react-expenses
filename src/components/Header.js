import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

export const Header = () => {
    const { clearData } = useContext(GlobalContext);

    return (
        <div className="homeHeader">
            <h1>
                Home
            </h1>
        </div>
    )
}