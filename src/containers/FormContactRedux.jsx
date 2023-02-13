import React, { useState } from "react";
import axios from "axios";
import {
    AppBar, Box, Button, IconButton,
    InputLabel,
    MenuItem, Select, TextField, Toolbar, Typography
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs, { Dayjs } from "dayjs";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useNavigate } from "react-router-dom";
import { useAddNewEmployeeMutation } from "../services/rtkQueryEmployee";

const FormContactRedux = () => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [birthday, setBirthday] = useState("")
    const [selectedFile, setSelectedFile] = useState();
    const [profpic, setProfpic] = useState("")

    const navigate = useNavigate()
    const [dispatchAddContactMutation] = useAddNewEmployeeMutation()


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmission = () => {
        const data = new FormData();
        data.append('token', '6367222d99b6c11c094bd9d7');
        data.append('project', 'myreactproject');
        data.append('file', selectedFile);

        var config = {
            method: 'post',
            url: 'https://io.etter.cloud/v4/upload',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log("return from files")
                console.log(JSON.stringify(response.data));
                setProfpic(response.data.file_name)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const fnInsertName = (event) => {
        setName(event.target.value)
    }

    const fnInsertEmail = (event) => {
        setEmail(event.target.value)
    }

    const fnInsertPhone = (event) => {
        setPhone(event.target.value)
    }

    const fnInsertGender = (event) => {
        setGender(event.target.value)
    }

    const handleChange = (birthday) => {
        setBirthday(birthday);
    }
    const fnInsertAddress = (event) => {
        setAddress(event.target.value)
    }

    const fnNavigateHome = () => {
        navigate("/")
    }

    const fnInsertContact = () => {
        const insertContactData = {
            "name": name,
            "address": address,
            "birthday": birthday,
            "email": email,
            "gender": gender,
            "phone": phone,
            "profpic": profpic,
            'token': '6367222d99b6c11c094bd9d7',
            'project': 'myreactproject',
            'collection': 'employee',
            'appid': '6367aa5199b6c11c094bd9de',
        }

        console.log(insertContactData)
        dispatchAddContactMutation({insertContactData})

        // try {
        //     const postData = {
        //         method: 'post',
        //         url: 'https://io.etter.cloud/v4/insert/employee',
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //             'Accept': '*/*'
        //         },
        //         data: insertContactData
        //     }
        //     axios(postData)
        //         .then(function (response) {
        //             console.log(JSON.stringify(response.data));
        //         })
        // } catch (error) {
        //     console.log(error)
        // }
        navigate("/redux")
        
    }
    return (
        <>
            <Box sx={{ flexGrow: 1, backgroundColor: "#393E46" }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={fnNavigateHome}>
                            <HomeOutlinedIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            Employee Contacts
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Box sx={{ margin: "20px" }}>
                    <div style={{ marginTop: "20px" }}>
                        <TextField
                            placeholder="Name"
                            type="file"
                            onChange={changeHandler}
                            fullWidth
                        />
                        {profpic ? (<Button disabled sx={{ marginTop: "10px" }} variant="contained">File Uploaded</Button>) : (<Button sx={{ marginTop: "10px" }} variant="contained" onClick={handleSubmission}>Upload</Button>)}
                        
                    </div>
                    <Typography> Form Contact</Typography>
                    <div style={{ marginTop: "20px" }}>
                        <TextField
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={fnInsertName}
                            fullWidth
                        />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Gender"
                            onChange={fnInsertGender}
                            fullWidth
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Birth Date"
                                inputFormat="MM/DD/YYYY"
                                value={birthday}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                                fullWidth
                            />
                        </LocalizationProvider>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <TextField
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={fnInsertEmail}
                            fullWidth
                        />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <TextField
                            placeholder="Phone"
                            type="text"
                            value={phone}
                            onChange={fnInsertPhone}
                            fullWidth
                        />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <TextField 
                            placeholder="Address"
                            type="text"
                            value={address}
                            onChange={fnInsertAddress}
                            fullWidth
                        />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <Button fullWidth variant="contained" onClick={fnInsertContact}>Submit</Button>
                    </div>
                </Box>
            </Box>
        </>
    )
}

export default FormContactRedux;