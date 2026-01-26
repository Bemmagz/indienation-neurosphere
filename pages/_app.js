import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>INDIENATION - Pendaftaran Resmi</title>
        <meta name="google-site-verification" content="VERIFIKASI_OTOMATIS" />
        <meta property="og:title" content="NeuroSphere Identity Portal" />
        <meta property="og:description" content="Daftar IID dan terima alokasi kedaulatan digital secara otomatis." />
        <meta property="og:url" content="https://indienation-neurosphere.vercel.app/apply" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
