import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
    Box, TextField, AppBar, Avatar,
    Button, Grid, IconButton,
    List, ListItem, ListItemAvatar, ListItemText,
    Toolbar, Typography, Select, InputLabel, MenuItem
} from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useEmployeeIdQuery, useFileUploadMutation, useUpdateEmployeeMutation } from "../services/rtkQueryEmployee";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useFileUploadProfpicMutation } from "../services/rtkQueryFileUpload";


// Select,InputLabel MenuItem
const DetailContactRedux = () => {
    const params = useParams()
    // const [selectedContact, setSelectedContact] = useState([])
    const navigate = useNavigate()
    const [updateNama, setUpdateNama] = useState("")
    const [updateAddress, setUpdateAddress] = useState("")

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [birthday, setBirthday] = useState("")
    const [profpic, setProfpic] = useState("")
    const [selectedFile, setSelectedFile] = useState();
    const [uploadData, setUploadData] = useState({
        'token': '6367222d99b6c11c094bd9d7',
        'project':'myreactproject',
        'file': '',
        
    })



    const { data: selectedContact, isLoading } = useEmployeeIdQuery(params.contactId);
    // const [dispatchFileMutation, { data: newUser }] = useFileUploadMutation()
    const [dispatchUploadFile, { data: newUser }] = useFileUploadProfpicMutation()
    const [dispatchContactMutation, {data: newContact}] = useUpdateEmployeeMutation()


    // console.log(selectedContact);
  
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0])
        setUploadData({
            ...uploadData,
            file: event.target.files[0]
        });


    };
    useEffect(
        () => {
            if(!isLoading){
                setName(selectedContact[0].name)
                setGender(selectedContact[0].gender)
                setEmail(selectedContact[0].email)
                setPhone(selectedContact[0].phone)
                setAddress(selectedContact[0].address)
                
            }
            
        },[]
    )
    const formOnSubmitHandler = (evt) => {
        
    };

    const handleSubmission = () => {

        const data = new FormData();
        data.append('token', '6367222d99b6c11c094bd9d7');
        data.append('project', 'myreactproject');
        data.append('file', selectedFile);

        console.log("the data file")
        console.log(data)
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


    const fnUpdateNama = (event) => {
        setUpdateNama(event.target.value)

    }

    const fnUpdateAddress = (event) => {
        setUpdateAddress(event.target.value)
    }


    const fnInsertName = (event) => {
        if (event.target.value != undefined) {
            setName(event.target.value)
        }
        else {
            setName(selectedContact[0].name)
        }
        console.log("the name")
        console.log(selectedContact.name)
    }
    const fnInsertEmail = (event) => {
        if (event.target.value != "") {
            setEmail(event.target.value)
        }
        else {
            setEmail(selectedContact[0].name)
        }
        // setEmail(event.target.value)
    }
    const fnInsertPhone = (event) => {
        setPhone(event.target.value)
    }
    const fnInsertGender = (event) => {
        setGender(event.target.value)
    }

    const handleChange = (birthday) => {
        setBirthday(birthday.$d);
    };



    const fnInsertAddress = (event) => {
        setAddress(event.target.value)
    }

    const fnNavigateHome = () => {
        navigate("/")
    }

    const fnUpdateContact = () => {

        console.log("update date")
        console.log(birthday)
        const UpdateData = {
            'update_field': 'name~address~email~birthday~phone~gender~profpic',
            'update_value': name + "~" + address + "~" + email + "~" + birthday + "~" + phone + "~" + gender + "~" + profpic,
            'token': '6367222d99b6c11c094bd9d7',
            'project': 'myreactproject',
            'collection': 'employee',
            'appid': '6367aa5199b6c11c094bd9de',
            'id': params.contactId
        }

        console.log('updateContactField')
        console.log(UpdateData)
        dispatchContactMutation({ UpdateData })
        // try {
        //     const postData = {
        //         method: 'post',
        //         url: 'https://io.etter.cloud/v4/update_id/employee',
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //             'Accept': '*/*'
        //         },
        //         data: UpdateData
        //     }
        //     axios(postData)
        //         .then(function (response) {
        //             console.log(JSON.stringify(response.data));
        //         })
        // } catch (error) {
        //     console.log(error)
        // }

        // navigate("/")

    }



    // console.log(updateNama)
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={fnNavigateHome} >
                            <HomeOutlinedIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            Contacts
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Box
                    sx={{ border: "dashed grey" }}>
                    
                    <List fullwidth sx={{ width: '100%' }}>
                        {newUser ? JSON.stringify(newUser) : ""}
                        {/* {newProfpic ? JSON.stringify(newProfpic) : ""} */}
                        {newContact ? JSON.stringify(newContact) : ""}
                        {isLoading ? (<div>Loading..</div>) : (
                        <ListItem >
                                <ListItemAvatar>

                                    <Avatar alt={selectedContact[0].name}
                                        src={`https://file.etter.cloud/d226fd9f5fcf8bc3cbdff22e2bd79efe/${selectedContact[0].profpic}`} />

                                    </ListItemAvatar>
                                <ListItemText sx={{ textDecoration: "none" }} primary={selectedContact[0].name} secondary={selectedContact[0].address} />
                                
                            
                            

                        </ListItem>
                        )}
                        <input type="file" onChange={changeHandler} />
                        <Button onClick={handleSubmission}>Upload File</Button>

                    </List>
                </Box>

                <Box sx={{ margin: "20px" }}>
                    <Typography>  name {name}</Typography>
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
                        <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Select Gender"
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
                                // label={selectedContact[0].birthday}
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
                        <Button fullWidth variant="contained" onClick={fnUpdateContact}>Submit</Button>
                    </div>
                </Box>

            </Box>


        </>
    )
}

export default DetailContactRedux;