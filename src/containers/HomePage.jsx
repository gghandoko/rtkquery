import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
    AppBar, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,
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
import SearchContact from "./SearchPage";

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

const HomePage = () => {

    const [contact, setContact] = useState([])
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = useState("")
    const [searchName, setSearchName] = useState("")
    const [searchResult, setSearchResult] = useState()
    const navigate = useNavigate()

    const handleClickOpen = (event) => {    
        setSelectedId(event.currentTarget.value)
        setOpen(true)    
    };

    const fnUpdateContact = (event) => {
        const id = event.currentTarget.value
        console.log(id)
        navigate(`/detail/${id}`)
    }

    const handleClose = async() => {    
        const id =selectedId
        await axios.get(`https://io.etter.cloud/v4/remove_id/token/6367222d99b6c11c094bd9d7/project/myreactproject/collection/employee/appid/6367aa5199b6c11c094bd9de/id/${id}/employee`)
        setOpen(false);
    };

    const handleCloseNo = () => {
        setOpen(false)
    }   
    const fnNavigateForm = () => {
        navigate("/form")
    }

    useEffect(
        () => {
            const getContactFromApi = async() => {
                try {
                    const responseFromContactApi = await axios.get("https://io.etter.cloud/v4/select_all/token/6367222d99b6c11c094bd9d7/project/myreactproject/collection/employee/appid/6367aa5199b6c11c094bd9de/employee")
                    console.log(responseFromContactApi.data);
                    setContact(responseFromContactApi.data)
                } catch (error) {
                    console.log(error)
                }
            }
            getContactFromApi()
        },
        [open], searchResult
    )

    const searchByName = (event) => {
        setSearchName(event.target.value)
        const name = (event.target.value);
        var config = {
            method: 'get',
            url: `https://io.etter.cloud/v4/select_where_like/token/6367222d99b6c11c094bd9d7/project/myreactproject/collection/employee/appid/6367aa5199b6c11c094bd9de/wlike_field/name/wlike_value/${name}/employee`,
           
        };

        axios(config)
            .then(function (response) {
                console.log(typeof(response.data));
                const results = response.data
                if (results.length === 0) {
                    setSearchResult(false)
                } else {
                    setSearchResult(results)
                }
            })
            .catch(function (error) {
                console.log(error);
            });      
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
                            Employee Contacts
                        </Typography>
                        <Link to={"/redux" } style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <Typography
                                variant="h6"
                               
                            onClick={fnNavigateForm}
                        >
                            RTK Query Version
                            </Typography>
                        </Link>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={searchByName}
                                value={searchName}
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
                {searchResult ? (<SearchContact TheProps={searchResult } />) : (<List fullwidth="true" sx={{ width: '100%' }}>
                    {contact.map(item => (
                        <ListItem >
                            <Link to={`/detail/${item._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Avatar alt={item.name} src={`https://file.etter.cloud/d226fd9f5fcf8bc3cbdff22e2bd79efe/${item.profpic}`} />
                                    </Avatar>
                                </ListItemAvatar>
                            </Link>
                            <ListItemText sx={{ textDecoration: "none", textTransform:"capitalize"}} primary={item.name} secondary={item.email} />
                            <IconButton value={item._id} onClick={fnUpdateContact} >
                                <ModeEditOutlinedIcon />
                            </IconButton>
                            <IconButton value={item._id} onClick={handleClickOpen}>
                                <DeleteOutlinedIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>)}               
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
                        <Button  onClick={handleClose} >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>            
        </>
    )
}

export default HomePage;