import Head from 'next/head'
import { Toaster } from "react-hot-toast"
import { createGlobalStyle } from 'styled-components'
import { StateContext } from "../context/StateContext"
import "@fontsource/inter-tight"

export const GlobalStyle = createGlobalStyle`
* 
  {
    font-family: "Inter Tight", sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    // disable global scroll bar
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
    ::-webkit-scrollbar { // chrome disable scroll
      display: none;
    } 

  }
`

function MyApp({ Component, pageProps, ...appProps }) {

  return  ( 
    <>

        <Head>
          <title>Spit Fire</title>
        </Head>

        <GlobalStyle />
        <Toaster />

          <StateContext>
              <Component {...pageProps} />
          </StateContext>

    </>
  )
  }


export default MyApp

