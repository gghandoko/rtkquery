import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// const urlFile =

export const AuthApi = createApi({
    reducerPath: "AuthApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pegadaian.dev.coofis.com/backend/backend/',
       
    }),

    endpoints: (builder) => ({
        // Get Token pake T
        getToken: builder.query({
            query: (body) => ({
                url: 'api/auth/',
                method: 'POST',
                body:body
                
            }) 
        }),
         getTokenT: builder.mutation({
            query: (body) => ({
                url: 'api/auth/',
                method: 'POST',
                body:body
                
            }) 
        }),


       
    })

});

export const { 
    //cara penulisan custom hooks -> use,nama endpoints (camelCase) + tiep Query/Mutation nya
    // useGetTokenTQuery
    useGetTokenTMutation
} = AuthApi

//Tambahkan EmployeeApi in ke store