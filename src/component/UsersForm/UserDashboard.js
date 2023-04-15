import { DeleteRounded, PreviewRounded } from '@mui/icons-material';
import { Button, IconButton, InputBase, Paper, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { columnDefsUser } from '../../utils/AgGridTableColumns';
import { deleteUserById, getUsersAllData } from '../../services/resumemaker-services';
import { useNavigate } from 'react-router-dom';
import AgGridTable from '../AgGridTable/AgGridTable';
import SearchIcon from '@mui/icons-material/Search';



const UserDashboard = () => {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const buttonRendererView = (props) => {
        return (
          <IconButton
            size="small"
            onClick={() =>
              navigate(`/resumemakerui/users/${props.data.userUUID}`)
            }
            color="primary"
          >
            <PreviewRounded />
          </IconButton>
        );
      };
      const buttonRendererDelete = (props) => {
        return (
          <IconButton
            size="small"
            onClick={() => 
              // navigate(`/resumemakerui/deletebyid/${props.data.userUUID}`)
              deleteUser(props.data.userUUID)
            }
            color="error"
          >
            <DeleteRounded />
          </IconButton>
        );
      };
    const deleteUser=async(userUUID)=>{
      
     const res=await  deleteUserById(userUUID,{
        headers: {
          'Authorization': `Bearer ${ localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      })
      if(res.status===200){
        alert("User Deleted Successfully")
        fetchdata();
      }else{
        alert('Something went wrong')
      }
    }
      const gridOptionsResume = {
        columnDefs: columnDefsUser,
        frameworkComponents: {
          buttonRendererViewResume: buttonRendererView,
          buttonRendererDeleteResume: buttonRendererDelete,
        },
      };
      useEffect(() => {
        fetchdata();
      }, []);

      async function fetchdata() {
        const res = await getUsersAllData({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setUserData(res);
      }
  return (
    <>
    <h1>Users</h1>
    <div>
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between',  marginBottom : "30px"}}>
                <Paper
                    component="form"
                 sx={{ display: 'flex', alignItems: 'center', width: 300 }}
                >
    <InputBase sx={{ ml: 1, flex: 1 }}
                        placeholder="Search name"
                        inputProps={{ 'aria-label': 'search name' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>

                    </Paper>
    <Button variant='contained' onClick={() => navigate('/resumemakerui/adduser')}>Add Users </Button>
    </Grid>
    </div>
     {
         userData.length ? (
            <AgGridTable gridOptions={gridOptionsResume} data={userData} type="users" />
           ) : null
     }
    </>
  )
}

export default UserDashboard
