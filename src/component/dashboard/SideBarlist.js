import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import { GroupAddOutlined, GroupAddRounded } from '@mui/icons-material';
const SideBarlist = () => {
    const navigate = useNavigate()
    return (

        <React.Fragment >
            {/* <ListItemButton onClick={() => navigate('/resumemakerui/resume')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Resume" />
            </ListItemButton> */}
            <ListItemButton onClick={() => navigate('/resumemakerui/feedback')}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="FeedBack" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/resumemakerui/users')}>
                <ListItemIcon>
                    <GroupAddRounded />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>
        </React.Fragment >
    )
}

export default SideBarlist