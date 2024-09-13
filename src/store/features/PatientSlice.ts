import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  sex: string;
  nationalId: string;
  coverage: string;
}

interface PatientState {
  patients: Patient[];
  selectedPatientId: number | null;
}

const initialState: PatientState = {
  patients: [],
  selectedPatientId: null,
};

export const PatientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    selectPatientById: (state, action: PayloadAction<number>) => {
      state.selectedPatientId = action.payload;
    },
  },
});

export default PatientSlice.reducer;
export const { selectPatientById } = PatientSlice.actions;
