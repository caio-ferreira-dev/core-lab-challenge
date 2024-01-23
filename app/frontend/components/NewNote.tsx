import { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from '../src/styles/newNote.module.scss'
import Image from 'next/image'
import { NoteData } from '../types/note'
import axios from 'axios'
import { useNotes } from '../context/NotesContext'
import { useUser } from '../context/User.contex'

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
    const { dispatch } = useNotes();
    const { user } = useUser();

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        } 
    }, [note.content])

    function handleTitleChange(e: ChangeEvent<HTMLInputElement> ) {
        setNote({...note, name: e.target.value})
    } 
    function handleFavoriteChange() {
        setNote({...note, favorite: !note.favorite})
    }
    function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setNote({...note, content: e.target.value })
    }
    async function handleNoteSave() {
        if(note.name.length < 1) {
            setFormError('Adicione um Título à nota.')
            return
        }
        if(note.content.length < 1) {
            setFormError('Adicione conteúdo à nota.')
            return
        }
        setFormError('')
            
        const { id, created_at, ...requestData } = note
        const { data } = await axios.post(`http://localhost:5001/notes/`, requestData, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        if(data.statusCode === 409) {
            setFormError('Já existe uma nota com este nome.')
            return
        }
        dispatch({type: 'addNote', payload: data.note})
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
            <textarea placeholder='Criar nota...' value={note.content} ref={textAreaRef} onChange={handleContentChange}/>
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