import { ChangeEvent } from "react"
import { NoteData } from "../types/note"

function handleTitleChange(e: ChangeEvent<HTMLInputElement>, setFunction: Function, note: NoteData) {
    setFunction({...note, name: e.target.value})
} 
function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>, setFunction: Function, note: NoteData) {
    setFunction({...note, content: e.target.value })
}
