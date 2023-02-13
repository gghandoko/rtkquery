// import { Update } from "@mui/icons-material";
// import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = '6367222d99b6c11c094bd9d7'
const appId = '6367aa5199b6c11c094bd9de'
// const urlFile =

export const EmployeeApi = createApi({
    reducerPath: "EmployeeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://io.etter.cloud/v4/',
       
    }),

    endpoints: (builder) => ({
        //1. Get Employee
        employee: builder.query({
            query: () => `select_all/token/${token}/project/myreactproject/collection/employee/appid/${appId}/employee`,
            
        }),
        
        // 2. Get Employee by Id
        employeeId: builder.query({
            query: (id) => `select_id/token/${token}/project/myreactproject/collection/employee/appid/${appId}/id/${id}/employee`
            
        }),
        // 3. Post Update Contact

        updateEmployee: builder.mutation({
            // console.log(),
            query: ({ UpdateData }) => ({
                
                url: 'https://io.etter.cloud/v4/update_id/employee',
                method: 'POST',
                // data: UpdateData,
                body: UpdateData,
            })
            
        }),

        //4. Add New Contact
        addNewEmployee: builder.mutation({
            query:({insertContactData}) => ({
                    url: 'https://io.etter.cloud/v4/insert/employee',
                    method: 'POST',
                    body: insertContactData,
                })
        }),
        //5. Delete Contact
        // deleteEmployee: builder.query({
        //     query: (id) => `https://io.etter.cloud/v4/remove_id/token/6367222d99b6c11c094bd9d7/project/myreactproject/collection/employee/appid/6367aa5199b6c11c094bd9de/id/${id}/employee`
               
        // }),

        deleteEmployee: builder.mutation({
            query: (id) => `https://io.etter.cloud/v4/remove_id/token/6367222d99b6c11c094bd9d7/project/myreactproject/collection/employee/appid/6367aa5199b6c11c094bd9de/id/${id}/employee`
               
        }),
        searchEmployee: builder.query({
            query:(name) =>`https://io.etter.cloud/v4/select_where_like/token/6367222d99b6c11c094bd9d7/project/myreactproject/collection/employee/appid/6367aa5199b6c11c094bd9de/wlike_field/name/wlike_value/${name}/employee`,
            
        }),

         fileUpload: builder.mutation({
            
            query: (...data) => ({
                
                url: 'https://io.etter.cloud/v4/upload',
                method: 'POST',
                data:data
            })
            
        }),

    })

});

export const { 
    //cara penulisan custom hooks -> use,nama endpoints (camelCase) + tiep Query/Mutation nya
    useEmployeeQuery,
    useEmployeeIdQuery,
    useAddNewEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeQuery,
    useDeleteEmployeeMutation,
    useSearchEmployeeQuery,
    useSearchEmployeeMutation,
} = EmployeeApi

//Tambahkan EmployeeApi in ke store