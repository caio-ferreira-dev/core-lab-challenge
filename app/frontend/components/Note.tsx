import Image from "next/image";
import styles from "../src/styles/note.module.scss"
import { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { NoteData } from "../types/note";
import axios from "axios";

type NoteProps = {
    noteData: NoteData;

}

export default function Note({noteData}: NoteProps) {
    const [note, setNote] = useState<NoteData>(noteData)
    const { dispatch } = useNotes();
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if(!isEditing) {
            
        }

        const makeRequest = async () => {
            const { id, created_at, ...requestData } = note
            const { data } = await axios.patch<NoteData>('http://localhost:5001/notes', requestData)
            dispatch({type: 'updateArray', payload: data})
        }
    }, [isEditing])

    return (
        <div className={styles.noteContainer}>
            <div className={styles.titleContainer}>
                <input type="text" placeholder='Título' value={note.name}/>
                {note.favorite ? 
                    <Image alt='Favorite icon' src={'/images/favorite_icon.png'} width={16} height={16}></Image> :
                    <Image alt='Favorite icon' src={'/images/not_favorite_icon.png'} width={16} height={16}></Image>
                }
            </div>
            <textarea value={note.content}/>
            <div className={styles.optionsContainer}>
                <button className={styles.editButton}></button>
                <button className={styles.colorButton}></button>
                <button className={styles.deleteButton}></button>
            </div>
        </div>
    )
}