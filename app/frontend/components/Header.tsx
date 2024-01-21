import Image from 'next/image'
import styles from '../src/styles/header.module.scss' 
import { ChangeEvent } from 'react'

type HeaderProps = {
    query: string
    setQuery: Function
}

export default function Header({ query, setQuery }: HeaderProps) {

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
    }

    return (
        <header className={styles.navContainer}>
            <Image alt='Notes icon' src={'/images/notes_icon.png'} width={32} height={32}></Image>
            <h2 className={styles.title}>CoreNotes</h2>
            <div className={styles.searchContainer}>
                <input type="text" placeholder="Pesquisar Notas" value={query} onChange={(e) => {handleInput(e)}}/>
                <Image alt='Magnifying glass icon' src={'/images/magnifying_glass.png'} width={16} height={16}></Image>
            </div>
            <Image className={styles.closeButton} alt='Close button button' src={'/images/x_button.png'} width={16} height={16}></Image>
        </header>
    )
}