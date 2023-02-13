import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    AppBar, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton,
    LinearProgress,
    List, ListItem, ListItemAvatar, ListItemText,
    Toolbar, Typography
} from "@mui/material";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

import { useDeleteEmployeeMutation, useEmployeeQuery, useSearchEmployeeQuery } from "../services/rtkQueryEmployee";
import SearchContact from "./SearchPage";
import { useGetTokenTMutation, useGetTokenTQuery } from "../services/authServices";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const HomePageRedux = () => {

    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = useState("")
    const [searchName, setSearchName] = useState("")
    const [authkan, setAuthkan] = useState({})
    const navigate = useNavigate()

    const { data: contact, isLoading } = useEmployeeQuery()
    const { data: searched } = useSearchEmployeeQuery(searchName)

    const [dispatchDelete] = useDeleteEmployeeMutation()
    // const { dispatchAuth, data } = useGetTokenTQuery(authkan)
    const { dispatchAuthkan, data } = useGetTokenTMutation({
        "username": "P11130",
        "password": "passwordsakti123!"
    })
    // console.log(searched)
    console.log(data)
    

    const handleClickOpen = (event) => {
        setSelectedId(event.currentTarget.value)
        setOpen(true)

    };

    const fnUpdateContact = (event) => {
        const id = event.currentTarget.value
        setSelectedId(event.currentTarget.value)

        navigate(`/redux/detail/${id}`)
    }

    const handleClose = () => {

        const id = selectedId
        console.log(id)
        dispatchDelete(id)

        window.location.reload(false)
    };

    const handleCloseNo = () => {
        setOpen(false)
    }

    const fnNavigateForm = () => {
        navigate("/redux/form")
    }

    const authUserTokent = () => {
        setAuthkan({
            "username": "P11130",
            "password": "passwordsakti123!"
        })
        
        dispatchAuthkan()

    }

    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <HomeOutlinedIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Employee Contacts RTK
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchName}
                                onChange={e => setSearchName(e.target.value)}

                            />
                        </Search>
                        <IconButton size="large"
                            edge="start"
                            color="inherit"
                            sx={{ ml: 2 }}
                            onClick={fnNavigateForm}

                        >
                            <AddOutlinedIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                {data}
                {searched ? (<SearchContact TheProps={searched} />) : ("")}
            </Box>
            <Divider />
            <Box>
                <List fullwidth="true" sx={{ width: '100%' }}>
                    {isLoading ? (<div><LinearProgress /></div>) : (
                        contact.map(item => (

                            <ListItem key={item._id}>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/detail/${item._id}`}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Avatar alt={item.name} src={`https://file.etter.cloud/d226fd9f5fcf8bc3cbdff22e2bd79efe/${item.profpic}`} />
                                        </Avatar>
                                    </ListItemAvatar>
                                </Link>
                                <ListItemText sx={{ textDecoration: "none", textTransform: "capitalize" }} primary={item.name} secondary={item.address} />
                                <IconButton value={item._id} onClick={fnUpdateContact} >
                                    <ModeEditOutlinedIcon />
                                </IconButton>
                                <IconButton value={item._id} onClick={handleClickOpen}>
                                    <DeleteOutlinedIcon />
                                </IconButton>

                            </ListItem>
                        ))
                    )}
                </List>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete Contact"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Apakah anda yakin akan menghapus contact dari list ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNo}>No</Button>
                        <Button onClick={handleClose} >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Button onClick={authUserTokent}> Auth User</Button>

        </>
    )
}

export default HomePageRedux;