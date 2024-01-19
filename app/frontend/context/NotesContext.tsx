import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

type NoteData = {
  id: number;
  created_at: Date;
  name: string;
  content: string;
  favorite: boolean;
  color: string;
};

type NotesAction =
  | { type: 'ADD_NOTE'; payload: NoteData }
  | { type: 'updateArray'; payload: NoteData }
  | { type: 'createArray'; payload: NoteData[]}

type NotesState = NoteData[];

type NotesContextType = {
  notes: NotesState;
  dispatch: Dispatch<NotesAction>;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.payload];
    case 'updateArray':
      return state.map((note) => (note.id === action.payload.id ? action.payload : note));
    case 'createArray':
        return action.payload;
    default:
      return state;
  }
};

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, dispatch] = useReducer(notesReducer, []);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};