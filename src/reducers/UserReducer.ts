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
    // addUsers: (state, action: PayloadAction<UserState[]>) => action.payload,
    // addUser: (state, action: PayloadAction<UserState>) => {
    //   state.push(action.payload)
    // },
    // updateUser: (state, action: PayloadAction<UserState>) => {    
    //   console.log(action.payload);
    //  },
    // updateUser: (state, action: PayloadAction<UserState>) => {    
    //   return current(state)
    //       .map((user : UserState) => user.id === action.payload.id ? action.payload : user);           
    // },
    // deleteUser: (state, action: PayloadAction<UserState>) => {
    //   return current(state)
    //       .filter((user : UserState) => user.id !== action.payload.id);
    // },
    flushUser: () => {
      return initialState;
    }
  },
})

export const { 
  setUser,
  // addUser, 
  // updateUser, 
  flushUser, 
} = user.actions
export default user.reducer