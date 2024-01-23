import Head from "next/head";
import Dashboard from "../../components/dashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>CoreNotes</title>
      </Head>
      <main>
        <Dashboard/>
      </main>
    </>
  )
}
