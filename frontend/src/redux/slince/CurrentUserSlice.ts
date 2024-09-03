import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { iCurrentUser } from '../../interface/user'

export interface iCurrentUserState {
    login:
    {
        currentUser: iCurrentUser | null;
        isFetching: boolean;
        isError: boolean;
        strError:string;
    }
}

const initialState: iCurrentUserState = {
    login: {
        currentUser: null,
        isFetching: false,
        isError: false,
        strError:"",
    }
}

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess:(state,action:PayloadAction<iCurrentUser>)=>{
            state.login.isFetching=false
            state.login.currentUser=action.payload;
            state.login.isError=false;
            state.login.strError="";
        },
        loginFailed:(state, action:PayloadAction<string>)=>{
            state.login.isFetching=false
            state.login.isError=true
            state.login.strError=action.payload;
        }
    }
})
export const {
    loginStart, 
    loginFailed, 
    loginSuccess
} = currentUserSlice.actions

export default currentUserSlice.reducer
