import Form from "../../components/Form";
import styles from "../styles/login.module.scss";

export default function Register() {
  return (
    <main
      className={styles.authContainer}
    >
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>Registro</h2>
        <Form inputNames={['Login', 'password', 'Username']} page="Registro"/>
      </div>
    </main>
  )
}
