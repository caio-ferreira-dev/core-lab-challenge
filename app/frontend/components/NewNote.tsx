import { useState } from 'react'
import styles from '../src/styles/newNote.module.scss'
import Image from 'next/image'
import { Note } from '../types/note'

const defaultState = {
    id: 0,
    created_at: new Date,
    name: '',
    content: '',
    favorite: false,
    color: '',
    }

export default function NewNote() {
    const [note, setNote] = useState<Note>(defaultState)
 
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <input type="text" placeholder='Titulo' value={note.name} onChange={(e) => {setNote({...note, name: e.target.value})}}/>
                {note.favorite ? 
                    <Image alt='Favorite icon' src={'/images/favorite_icon.png'} width={16} height={16} onClick={() => {setNote({...note, favorite: !note.favorite})}}></Image> :
                    <Image alt='Favorite icon' src={'/images/not_favorite_icon.png'} width={16} height={16} onClick={() => {setNote({...note, favorite: !note.favorite})}}></Image>
                }
            </div>
            <input type="textarea" placeholder='Criar nota...' value={note.content} onChange={(e) => {setNote({...note, content: e.target.value })}}/>
            
        </div>
    )
}