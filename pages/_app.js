import "@/styles/globals.css";
import Header from "./componenrs/Header";
import Footer from "./componenrs/Footer";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <div>
      <Head>
        <title>Search Players</title>
        <link rel="icon" href="/image/logo.png" />
      </Head>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </div>)

}
