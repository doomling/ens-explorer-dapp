import Head from "next/head";
import Tabs from "@/components/Tabs";
import Container from "@/components/Container";

export default function Home() {
  return (
    <>
      <Head>
        <title>ENS Explorer</title>
        <meta name="description" content="ENS Explorer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container title="ENS txs">
        <Tabs />
      </Container>
    </>
  );
}
