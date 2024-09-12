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
}

const initialState: PatientState = {
  patients: [],
};

export const PatientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.patients.push({
        ...action.payload,
        id: state.patients.length,
      });
    },
  },
});

export default PatientSlice;
export const { addPatient } = PatientSlice.actions;
