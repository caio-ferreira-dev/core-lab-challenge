import { useState } from "react";
import Header from "../../components/Header";
import { Note } from "../../types/note";
import styles from "../styles/dashboard.module.scss"
import NewNote from "../../components/NewNote";

export default function Dashboard() {
    const [notes, setNotes] = useState<Note[]>()
    return (
        <div className={styles.mainContainer}>
            <Header setNotes={setNotes}/>
            <div className={styles.contentContainer}>
                <NewNote/>
            </div>
        </div>
    )
}

// <FavoriteNotes/>
// <OtherNotes/>