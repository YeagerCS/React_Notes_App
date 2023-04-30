import React from 'react';

const AlertWindow = ({ closeAlert, message }) => {
  return (
    <div className="alert">
      <div className="alert-content">
        <p>{message}</p>
        <button onClick={closeAlert} className="btnStyleDanger">Close</button>
      </div>
    </div>
  );
};

export default AlertWindow;
