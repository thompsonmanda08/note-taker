import { type NextPage } from "next";
import Head from "next/head";
import { Navbar } from "~/compoonents/Navbar";
import Content from "~/compoonents/Content";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>WEBB-DevPad</title>
        <meta name="description" content="Note Taking Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#090e19] to-[#0f172a] py-16">
        <Navbar />
        <Content />
      </main>
    </>
  );
};

export default Home;
