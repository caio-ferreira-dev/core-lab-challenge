import { useState } from "react";
import Header from "../../components/Header";
import { NoteData } from "../../types/note";
import styles from "../styles/dashboard.module.scss"
import NewNote from "../../components/NewNote";
import Note from "../../components/Note";
import { useNotes } from '../../context/NotesContext';
import axios from "axios";

export default function Dashboard() {
    const { notes, dispatch } = useNotes();
    const [favoriteNotes, setFavoriteNotes] = useState<NoteData[]>()

    const renderFavorites = async () => {
        const { data } = await axios.get<NoteData[]>('http://localhost:5001/notes/favorite')
        dispatch({type: 'createArray', payload: data})
        
        const notes = data.map((note: NoteData, key: number) => {
            return <Note noteData={note} key={key}/>
        })
    }
    return (
        <div className={styles.mainContainer}>
            <Header/>
            <div className={styles.contentContainer}>
                <NewNote/>
                <div className={styles.favorite}>
                    {notes ? <></> : ''}
                </div>
                <div className={styles.other}></div>
            </div>
        </div>
    )
}

// <FavoriteNotes/>
// <OtherNotes/>