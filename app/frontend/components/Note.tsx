import Image from "next/image";
import styles from "../src/styles/note.module.scss"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { NoteData } from "../types/note";
import axios from "axios";
import ColorBar from "./ColorBar";
import { useUser } from "../context/User.contex";

type NoteProps = {
    noteData: NoteData;
}

export default function Note({noteData}: NoteProps) {
    const [note, setNote] = useState<NoteData>(noteData)
    const { dispatch } = useNotes();
    const [isEditing, setIsEditing] = useState(false)
    const [choosingColor, setChoosingColor] = useState(false)
    const { user } = useUser()

    useEffect(() => {
        if(!isEditing) {
            makeRequest()
        }
        async function makeRequest() {
            const { created_at, ...requestData } = note
            const { data } = await axios.patch('http://localhost:5001/notes', requestData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            })
            dispatch({type: 'updateArray', payload: data.note})
        }
    }, [isEditing])

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setNote({...note, name: e.target.value})
    } 
    function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setNote({...note, content: e.target.value })
    }
    function handleFavoriteChange() {
        if(isEditing) {
            setNote({...note, favorite: !note.favorite})
        }
    }

    async function handleEdit() {
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }
    async function handleDelete() {
        await axios.delete(`http://localhost:5001/notes/${note.id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        dispatch({ type: 'deleteNote', payload: note.id });
    }
    function handleColor() {
        setChoosingColor(!choosingColor)
    }
    async function setColor(color: string) {
        setNote({...note, color})
        const { data } = await axios.patch('http://localhost:5001/notes', {id: note.id,color}, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        dispatch({type: 'updateArray', payload: data.note})
    }

    return (
        <div className={`${styles.noteContainer} ${styles[note.color]}`}>
            <div className={styles.titleContainer}>
                <input type="text" placeholder='Título' readOnly={!isEditing} value={note.name} onChange={handleTitleChange}/>
                {note.favorite ? 
                    <Image alt='Favorite icon' src={'/images/favorite_icon.png'} width={16} height={16} onClick={handleFavoriteChange}></Image> :
                    <Image alt='Favorite icon' src={'/images/not_favorite_icon.png'} width={16} height={16} onClick={handleFavoriteChange}></Image>
                }
            </div>
            <textarea readOnly={!isEditing} value={note.content} onChange={handleContentChange}/>
            <div className={styles.optionsContainer}>
                <div className={`${styles.buttonContainer} ${ isEditing ? styles.editing : styles.editOption }`} onClick={handleEdit} >
                    <button className={styles.optionButton}></button>
                </div>  
                <div className={`${styles.buttonContainer} ${styles.colorOption} ${choosingColor ? styles.selectingColor : ''}`}>
                    <button className={`${styles.optionButton} ${styles.colorButton}`} onClick={handleColor}></button>
                    {choosingColor ? <ColorBar setState={setChoosingColor} setColor={setColor}/> : ''}
                </div>
                <div className={`${styles.buttonContainer} ${styles.deleteOption}`} onClick={handleDelete}>
                    <button className={styles.optionButton}></button>
                </div>
            </div>
        </div>
    )
}