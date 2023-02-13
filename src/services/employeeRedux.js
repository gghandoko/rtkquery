import React from "react";

import { createSlice } from "@reduxjs/toolkit";

const initialStateContact = {
    apa: [{
        
    }],
}
const contactSlice = createSlice({
    name: "contactSliceName",
    initialState: initialStateContact,

    reducers: {
        addContact(state, actions) {
            state.contact = actions.payload;
        }
    }
})

export const { addContact } = contactSlice.actions;

export const selectContact = (state) => state.contactSliceName.apa;
export const selectCounter = (state) => state.counterRTK.counter;

export default contactSlice.reducer;