import React from 'react';
import './circularloading.scss';

const CircularLoading = () => {
    return (
        <div className="container-spinner">
            <div className="spinners">
                <div className="spinner-block">
                    <div className="spinner spinner-1"></div>
                </div>
            </div>
        </div>
    )
}

export default CircularLoading