import Head from "next/head";
import styles from "../styles/index.module.scss";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()

  function handleClick(page: string) {
    router.push(`/${page}`)
  }

  return (
    <>
      <Head>
        <title>CoreNotes</title>
      </Head>
      <main className={styles.mainContainer}>
        <h1>CoreNotes</h1>
        <p>Um aplicativo "To-do list" desenvolvido para o <a href="http://www.corelab.com.br">CoreLab</a> challenge.</p>
        <div className={styles.authContainer}>
          <button onClick={() => {handleClick('login')}}>Login</button>
          <button onClick={() => {handleClick('register')}}>Registro</button>
        </div>
      </main>
    </>
  )
}
