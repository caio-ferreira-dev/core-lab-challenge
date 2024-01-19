import { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from '../src/styles/newNote.module.scss'
import Image from 'next/image'
import { NoteData } from '../types/note'
import axios from 'axios'

const defaultState = {
    id: 0,
    created_at: new Date,
    name: '',
    content: '',
    favorite: false,
    color: 'white',
    }

export default function NewNote() {
    const [note, setNote] = useState<NoteData>(defaultState)
    const [formError, setFormError] = useState('')
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        } 
    }, [note.content])

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement> ) => {
        setNote({...note, name: e.target.value})
    } 
    const handleFavoriteChange = () => {
        setNote({...note, favorite: !note.favorite})
    }
    const handleNoteSave = async () => {
        if(note.name.length < 1) {
            setFormError('Adicione um Título à nota.')
            return
        }
        if(note.content.length < 1) {
            setFormError('Adicione conteúdo à nota.')
            return
        }
        setFormError('')
        const { id, created_at, ...data } = note
        const response = await axios.post('http://localhost:5001/notes', data)
        if(response.data.statusCode === 409) {
            setFormError('Já existe uma nota com este nome.')
            return
        }
        setNote(defaultState)

    }
    return (
        <div className={styles.newNoteContainer}>
            <div className={styles.titleContainer}>
                <input type="text" placeholder='Título' value={note.name} onChange={handleTitleChange}/>
                {note.favorite ? 
                    <Image alt='Favorite icon' src={'/images/favorite_icon.png'} width={16} height={16} onClick={handleFavoriteChange}></Image> :
                    <Image alt='Favorite icon' src={'/images/not_favorite_icon.png'} width={16} height={16} onClick={handleFavoriteChange}></Image>
                }
            </div>
            <textarea placeholder='Criar nota...' value={note.content} ref={textAreaRef} onChange={(e) => {setNote({...note, content: e.target.value })}}/>
            <div className={styles.buttonDiv}>
                {formError ? 
                    <span>{formError}</span> : 
                    ''
                }
                <button onClick={handleNoteSave}></button>
            </div>
        </div>
    )
}