import Form from "../../components/Form";
import styles from "../styles/login.module.scss";

export default function Login() {
  return (
    <main
      className={styles.authContainer}
    >
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>Login</h2>
        <Form inputNames={['Login', 'password']} page="Login"/>
      </div>
    </main>
  )
}
