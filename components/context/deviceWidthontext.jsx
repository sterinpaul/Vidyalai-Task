import React,{ createContext, useEffect, useState } from "react";

const DeviceWidthContext = createContext()

// eslint-disable-next-line react/prop-types
export const DeviceWidthProvider = ({children})=>{
    const [isSmallerDevice, setIsSmallerDevice] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        setIsSmallerDevice(width < 500);
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return(
        <DeviceWidthContext.Provider value={isSmallerDevice}>
          {children}
        </DeviceWidthContext.Provider>
    )
}

export default DeviceWidthContext