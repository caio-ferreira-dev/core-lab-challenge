import { useEffect, useState } from "react";
import Header from "./Header";
import { NoteData } from "../types/note";
import styles from "../src/styles/dashboard.module.scss"
import NewNote from "./NewNote";
import Note from "./Note";
import { useNotes } from '../context/NotesContext';
import axios from "axios";

export default function Dashboard() {
    const { notes, dispatch } = useNotes();
    const [query, setQuery] = useState('')

    useEffect(() => {
        async function getNotes() {
            const { data } = await axios.get<NoteData[]>('http://localhost:5001/notes')
            dispatch({type: 'createArray', payload: data})
        }
        getNotes()
    }, [])

    function renderList(listType: string) {
        const renderSearch = query.length >= 1 ? true : false
        const favoriteFilter = notes.filter(note => note.favorite).length >= 1 ? true : false
        const otherFilter =  notes.filter(note => !note.favorite).length >= 1 ? true : false
        const renderFavorite = renderSearch ? notes.filter(note => (note.name).toLowerCase().includes(query.toLowerCase()) && note.favorite).length >= 1 : favoriteFilter
        const renderOther = renderSearch ? notes.filter(note => (note.name).toLowerCase().includes(query.toLowerCase()) && !note.favorite).length >= 1: otherFilter
        
        const render = listType === 'Favoritas' ? renderFavorite : listType === 'Outras' ? renderOther : '';
        
        return (
            <div className={`${listType === 'Favoritas' ? styles.favorite : listType === 'Outras' ? styles.other : ''}`}>
                <div>
                    {render ? <h2>{listType}</h2> : ''}
                </div>
                <div className={styles.notesList}>
                    {notes.map((note: NoteData, key: number) => {
                            const noteName = note.name.toLocaleLowerCase()
                            if(renderSearch) {
                                if(noteName.includes(query.toLocaleLowerCase())) {
                                    if(note.favorite && listType === 'Favoritas') {
                                        return <Note noteData={note} key={key}/>
                                    }
                                    if(!note.favorite && listType === 'Outras') {
                                        return <Note noteData={note} key={key}/>
                                    }
                                }
                                return
                            }
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
            <Header query={query} setQuery={setQuery}/>
            <div className={styles.contentContainer}>
                <NewNote/>
                {renderList('Favoritas')}
                {renderList('Outras')}
            </div>
        </div>
    )
}
