import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
export interface UserState {
userObj:object
}

const initialState: UserState = {
  userObj:{}
}


export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => action.payload,
    flushUser: () => {
      return initialState;
    }
  },
})

export const { 
  setUser,
  flushUser, 
} = user.actions
export default user.reducer