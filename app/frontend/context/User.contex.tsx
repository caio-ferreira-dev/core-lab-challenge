import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

type User = {
  username: string | null;
  token: string | null;
};

type UserAction =
  | { type: 'saveUser'; payload: User }
  | { type: 'deleteUser'};

type UserContextType = {
  user: User;
  dispatch: Dispatch<UserAction>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const userReducer = (state: User, action: UserAction): User => {
  switch (action.type) {
    case 'saveUser':
      return action.payload;
    case 'deleteUser':
      return { username: null, token: null };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, { username: null, token: null });

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
