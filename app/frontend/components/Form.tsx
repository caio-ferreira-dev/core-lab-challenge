import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useUser } from "../context/User.contex";
import styles from "../src/styles/form.module.scss";

interface FormProps {
    inputNames: string[],
    page: string
}

export default function Form({inputNames, page }: FormProps) {
    const router = useRouter()
    const [inputs, setInputs] = useState(['','',''])
    const [errors, setErrors] = useState('')
    const { dispatch } = useUser()

    function renderInputs(inputsList: string[]) {
        return inputsList.map((fieldName, index) => {
            let inputType = 'text';
            if (index !== 1 ) {
                let fieldPlace = '';
                fieldName === 'Username' ? fieldPlace = 'Nome de usuário' : fieldPlace = fieldName;
                
                return <input autoComplete="off" key={index} name={fieldName} className={styles.loginInput} type="text" placeholder={fieldPlace} value={inputs[index]} onChange={e => {handleInputs(index, e.target.value)}}/>
            }
            if (fieldName == 'password') {
                inputType = 'password'
            }
            return <input autoComplete="off" key={index} name={fieldName} className={styles.passwordInput} type={inputType} placeholder={'Senha'} value={inputs[index]} onChange={e => {handleInputs(index, e.target.value)}}/>
        })
    }

    function handleInputs(modifiedIndex: number, newValue: string) {
        const newInputs = inputs.map((value, index) => {
            if (index == modifiedIndex) {
                return newValue
            }
            return value
        })
        setInputs(newInputs)
    }

    function handleHome() {
        router.push('/')
    }

    async function sendRequest() {
        if (page == 'Login') {
            await axios.get(`http://localhost:5001/user/login?login=${inputs[0]}&password=${inputs[1]}`).then(response => {
                const { message, ...data } = response.data
                dispatch({type: 'saveUser', payload: data})
                router.push('/dashboard')
            }).catch(error => {
                setErrors(error.response.data.message)
            })
        }
        if (page == 'Registro') {
            await axios.post(`http://localhost:5001/user/register`, {
                login: inputs[0],
                password: inputs[1],
                username: inputs[2],
            }).then(() => {
                router.push('/login')
            }).catch(error => {
                setErrors(error.response.data.message)
            })
        }
        return
    }
    
    return (
        <form className={styles.formContainer} onSubmit={(e) => { e.preventDefault(); sendRequest()} }>
            {renderInputs(inputNames)}
            <button className={styles.pageButton}>{page}</button>
            {<p className={`${errors ? styles.error : styles.default}`}>{errors}</p>}
            <div className={styles.backButton} onClick={() => {handleHome()}}>
                <span></span>
            </div>
        </form>
    )
}
  