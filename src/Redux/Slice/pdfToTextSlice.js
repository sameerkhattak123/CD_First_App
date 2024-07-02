import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadPdf = createAsyncThunk('pdf/uploadPdf', async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);
    
    const response = await axios.post('http://localhost:4000/api/pdfToText/upload/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data.text;
});

const pdfSlice = createSlice({
    name: 'pdf',
    initialState: {
        text: '',
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadPdf.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadPdf.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.text = action.payload;
            })
            .addCase(uploadPdf.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default pdfSlice.reducer;
