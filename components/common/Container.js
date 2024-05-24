import React, { useContext } from 'react';
import DeviceWidthContext from '../context/deviceWidthontext';


// eslint-disable-next-line react/prop-types
export default function Container({ children }) {
  const isSmallerDevice = useContext(DeviceWidthContext);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: isSmallerDevice ? '95%' : '85%' }}>{children}</div>
    </div>
  );
}
