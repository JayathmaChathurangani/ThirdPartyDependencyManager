import React from 'react';

const style = {
    container: {
        position: 'center',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
        marginLeft: '50%',
    },
};

const LoadingScreen = () => (
    <div style={style.container}>
        <h1>Error</h1>
    </div>
);

export default LoadingScreen;
