import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NeuroSphere - Claim Your Digital Identity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Official NeuroSphere Portal. Claim €100.000 and 1 Million LUV." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
