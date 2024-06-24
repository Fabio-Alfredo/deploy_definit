import React from 'react';

const ProtectedComponent = ({ allowedRoles=[], userRoles=[], children }) => {

    const canRender = allowedRoles.some(role => userRoles.map(r => r.code).includes(role));

    return canRender ? <>{children}</> : null;
};

export default ProtectedComponent;