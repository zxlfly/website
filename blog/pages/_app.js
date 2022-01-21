import 'antd/dist/antd.css'
import '../styles/globals.css'
import React from 'react'
if (typeof document === 'undefined') {
  React.useLayoutEffect = React.useEffect;
}
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
