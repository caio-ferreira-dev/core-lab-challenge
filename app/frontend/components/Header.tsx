import Image from 'next/image'
import styles from '../src/styles/header.module.scss' 
import { useEffect, useState } from 'react'
import { useNotes } from '../context/NotesContext';
import axios from 'axios'


export default function Header() {
    const { notes, dispatch } = useNotes();
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        async function searchNotes(){
            const { data } = await axios.get(`http://localhost:5001/notes/${searchInput}`)
            dispatch({type: 'updateArray', payload: data})
        }
        if (searchInput.length > 0) {
            searchNotes()
        }
        
        return
    }, [searchInput])

    return (
        <div className={styles.navContainer}>
            <Image alt='Notes icon' src={'/images/notes_icon.png'} width={32} height={32}></Image>
            <h2 className={styles.title}>CoreNotes</h2>
            <div className={styles.searchContainer}>
                <input type="text" placeholder="Pesquisar Notas" value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}}/>
                <Image alt='Magnifying glass icon' src={'/images/magnifying_glass.png'} width={16} height={16}></Image>
            </div>
            <Image className={styles.closeButton} alt='Close button button' src={'/images/x_button.png'} width={16} height={16}></Image>
        </div>
    )
}