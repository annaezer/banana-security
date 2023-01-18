import React from 'react';

function tokenExpired(token) {
    if (Math.floor(Date.now() / 1000) < token.exp) return true;
}

export default tokenExpired;
