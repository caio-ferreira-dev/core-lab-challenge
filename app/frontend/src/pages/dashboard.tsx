import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { NoteData } from "../../types/note";
import styles from "../styles/dashboard.module.scss"
import NewNote from "../../components/NewNote";
import Note from "../../components/Note";
import { useNotes } from '../../context/NotesContext';
import axios from "axios";

export default function Dashboard() {
    const { notes, dispatch } = useNotes();

    useEffect(() => {
        async function getNotes() {
            const { data } = await axios.get<NoteData[]>('http://localhost:5001/notes')
            dispatch({type: 'createArray', payload: data})
        }
        getNotes()
    }, [])

    function renderList(listType: string) {
        const renderFavorite = notes.filter(note => note.favorite).length >= 1 ? true : false
        const renderOther = notes.filter(note => !note.favorite).length >= 1 ? true : false
        const render = listType === 'Favoritas' ? renderFavorite : listType === 'Outras' ? renderOther : ''; 
        
        
        return (
            <div className={`${listType === 'Favoritas' ? styles.favorite : listType === 'Outras' ? styles.other : ''}`}>
                <div>
                    {render ? <h2>{listType}</h2> : ''}
                </div>
                <div className={styles.notesList}>
                    {notes.map((note: NoteData, key: number) => {
                            if(note.favorite && listType === 'Favoritas') {
                                return <Note noteData={note} key={key}/>
                            }
                            if(!note.favorite && listType === 'Outras') {
                                return <Note noteData={note} key={key}/>
                            }
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <div className={styles.mainContainer}>
            <Header/>
            <div className={styles.contentContainer}>
                <NewNote/>
                {renderList('Favoritas')}
                {renderList('Outras')}
            </div>
        </div>
    )
}
// {notes ? renderFavorites : null}

// <FavoriteNotes/>
// <OtherNotes/>