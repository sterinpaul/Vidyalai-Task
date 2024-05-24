import React from 'react';
import { DeviceWidthProvider } from '../components/context/deviceWidthontext';


const App = ({ Component, pageProps }) => (
  <React.Fragment>
    <DeviceWidthProvider>
      <Component {...pageProps} />
    </DeviceWidthProvider>
  </React.Fragment>
);

export default App;
