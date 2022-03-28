import Head from 'next/head'

export default function Seo(props) {
  return (
    <Head>
      <title>Hive Investments</title>
      <meta name="description" content="Introducing #HIVE. A Polygon based #DaaS project built by bees, for bees to take over #DeFi. Proudly a core protocol of the Union of Transparency #UoT." />
      <meta property="og:title" content="" />
      <meta property="og:description" content="Introducing #HIVE. A Polygon based #DaaS project built by bees, for bees to take over #DeFi. Proudly a core protocol of the Union of Transparency #UoT" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="" />
      <meta property="og:image" content="https://hive.investments/hive-banner.png" />
      <meta name="twitter:image" content="https://hive.investments/hive-banner.png" />
      <meta name="twitter:creator" content="@hiveinvestments" />
      <meta name="twitter:site" content="@hiveinvestments" />
      <meta name="twitter:card" content="summary" /> 
      <meta name="twitter:title" content="hive investments" />
      <meta name="twitter:description" content="Introducing #HIVE. A Polygon based #DaaS project built by bees, for bees to take over #DeFi. Proudly a core protocol of the Union of Transparency #UoT." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}