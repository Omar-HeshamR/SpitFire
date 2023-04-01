import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import { StateContext } from "../context/StateContext"

export const GlobalStyle = createGlobalStyle`
  * 
    {
    font-family: "Public Sans", sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

function MyApp({ Component, pageProps, ...appProps }) {

  return  ( 
    <>

        <Head>
          <title>Spit Fire</title>
        </Head>

        <GlobalStyle />

          <StateContext>
              <Component {...pageProps} />
          </StateContext>

    </>
  )
  }


export default MyApp

