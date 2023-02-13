import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = '6367222d99b6c11c094bd9d7'
const appId = '6367aa5199b6c11c094bd9de'
const project = 'myreactproject'
// const urlFile =

export const FileUploadApi = createApi({
    reducerPath: "FileUploadApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://io.etter.cloud/v4/',
        // prepareHeaders: (headers) => {
        //     headers.set(
        //         'Content-Type', 'application/x-www-form-urlencoded'
               
                
        //     )
        //     return headers
        // }
        // prepareHeaders: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     'Accept': '*/*',
        // }
        
    }),

    endpoints: (builder) => ({
        //1. Get Employee
       

        fileUploadProfpic: builder.mutation({
            
            query: (data) => ({
                
                url: 'https://io.etter.cloud/v4/upload',
                method: 'POST',           
                body:data,
               
               
            })
            
        })
    })

});

export const { 
    //cara penulisan custom hooks -> use,nama endpoints (camelCase) + tiep Query/Mutation nya
    // useFileUploadMutation,
    useFileUploadProfpicMutation,
} = FileUploadApi

//Tambahkan EmployeeApi in ke store