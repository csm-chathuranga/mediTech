import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'


export interface AuthState {
    token: string
}

const initialState: AuthState = {
    token:""
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setAuth: (state, action: PayloadAction<AuthState>) => action.payload,
      flushAuth: () => initialState
    },
  })
  
  export const { 
    setAuth,
    flushAuth
  } = auth.actions
  export default auth.reducer