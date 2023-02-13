import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { EmployeeApi } from "../services/rtkQueryEmployee";
import { FileUploadApi } from "../services/rtkQueryFileUpload";
import contactSlice from "../services/employeeRedux";
import { AuthApi } from "../services/authServices";
// FileUploadApi

export const store = configureStore({
    reducer: {
        [EmployeeApi.reducerPath]: EmployeeApi.reducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
        [FileUploadApi.reducerPath]: FileUploadApi.reducer,
        ContactSlice : contactSlice,
    },

    //the middleware
    middleware: (getDefaultMiddleware) => {
        return (
            getDefaultMiddleware().concat(EmployeeApi.middleware).concat(FileUploadApi.middleware).concat(AuthApi.middleware)
        )
    }
})