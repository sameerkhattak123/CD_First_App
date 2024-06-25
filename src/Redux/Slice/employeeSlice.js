import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (userToken, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/api/employee/', {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async ( {employeeData, userToken} , { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/employee/', employeeData, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async ({ employeeId, userToken }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/employee/${employeeId}`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      return response.data._id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchEmployee = createAsyncThunk(
  'employees/fetchEmployee',
  async ({ employeeId, userToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/employee/${employeeId}`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ employeeId, updatedData, userToken }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/employee/${employeeId}`, updatedData, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    employee: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(employee => employee._id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.map(employee =>
          employee._id === action.payload._id ? action.payload : employee
        );
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
