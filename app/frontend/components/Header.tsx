import Image from 'next/image'
import styles from '../src/styles/header.module.scss' 
import { ChangeEvent } from 'react'
import { useUser } from '../context/User.contex'
import { useRouter } from 'next/router'

type HeaderProps = {
    query: string
    setQuery: Function
}

export default function Header({ query, setQuery }: HeaderProps) {
    const { user, dispatch } = useUser()
    const router = useRouter()

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
    }

    function handleLogout() {
        dispatch({type: 'deleteUser'})
        router.push('/login')
    }

    return (
        <header className={styles.navContainer}>
            <Image alt='Notes icon' src={'/images/notes_icon.png'} width={32} height={32}></Image>
            <h2 className={styles.title}>CoreNotes</h2>
            <div className={styles.searchContainer}>
                <input type="text" placeholder="Pesquisar Notas" value={query} onChange={(e) => {handleInput(e)}}/>
                <Image alt='Magnifying glass icon' src={'/images/magnifying_glass.png'} width={16} height={16}></Image>
            </div>
            <p>{user.username}</p>
            <Image className={styles.closeButton} alt='Close button button' src={'/images/x_button.png'} onClick={handleLogout} width={16} height={16}></Image>
        </header>
    )
}