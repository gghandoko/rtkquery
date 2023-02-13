
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Avatar, Box,IconButton,
    List, ListItem, ListItemAvatar, ListItemText,    
} from "@mui/material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';


const SearchContact = ({ TheProps }) => {
    const navigate = useNavigate()
    const fnUpdateContact = (event) => {
        const id = event.currentTarget.value
        navigate(`/detail/${id}`)
    }
    if (TheProps.length === 0) {
        console.log("tidaks bisa")
    } else {

        return (
            <>
                <Box>
                    <List fullwidth="true" sx={{ width: '100%' }}>

                    <ListItem >
                        <Link to={`/detail/${TheProps[0]._id}`}>
                            <ListItemAvatar>
                                <Avatar>
                                    <Avatar alt="Remy Sharp" src={`https://file.etter.cloud/d226fd9f5fcf8bc3cbdff22e2bd79efe/${TheProps[0].profpic}`} />
                                </Avatar>
                            </ListItemAvatar>
                        </Link>
                        <ListItemText sx={{ textDecoration: "inherit", textTransform:"capitalize"}} primary={TheProps[0].name} secondary={TheProps[0].address} />
                        <IconButton value={TheProps[0]._id} onClick={fnUpdateContact} >
                            <ModeEditOutlinedIcon />
                        </IconButton>
                    </ListItem>
                    </List>
                    
                </Box>
            </>
        )
    }
}

export default SearchContact;