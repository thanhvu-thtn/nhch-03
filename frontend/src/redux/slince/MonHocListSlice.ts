import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import iMonHoc from '../../interface/monhoc'
export interface iMonHocState {
    value: {
        monHocs: Array<iMonHoc> | null,
        isFetching: boolean;
        isError: boolean;
        strError: string;
    }
}

const initialState: iMonHocState = {
    value: {
        monHocs: null,
        isFetching: false,
        isError: false,
        strError: "",
    }
}

export const MonHocListSlice = createSlice({
    name: "monHocs",
    initialState,
    reducers: {
        loadingStart: (state) => {
            state.value.isFetching = true;
        },
        loadingSuccess: (state, action: PayloadAction<Array<iMonHoc>>) => {
            state.value.isFetching = false
            state.value.monHocs = action.payload;
            state.value.isError = false;
            state.value.strError = "";
        },
        loadingFailed: (state, action: PayloadAction<string>) => {
            state.value.isFetching = false
            state.value.isError = true
            state.value.strError = action.payload;
        }
    }
})

export const {
    loadingStart,
    loadingSuccess,
    loadingFailed
} = MonHocListSlice.actions

export default MonHocListSlice.reducer