import 'antd/dist/antd.css'
import '../styles/globals.css'
import React from 'react'
import Layout from '../layouts/index';
if (typeof document === 'undefined') {
  React.useLayoutEffect = React.useEffect;
}
function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout> 
}

export default MyApp
