import { getFeedbackAllData } from '../../services/feedback-service';
import { columnDefsFeedback } from '../../utils/AgGridTableColumns';
import { DeleteRounded, PreviewRounded } from '@mui/icons-material';
import { Button, IconButton, InputBase, Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AgGridTable from '../AgGridTable/AgGridTable';
import SearchIcon from '@mui/icons-material/Search';

const FeedbackDashboard = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const navigate = useNavigate();
    const buttonRendererView = (props) => {
        return (
          <IconButton
            size="small"
            onClick={() =>
              navigate(`/resumemakerui/feedback/${props.data.userUUID}`)
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
            onClick={() => console.log("Button deleted!", props.data)}
            color="error"
          >
            <DeleteRounded />
          </IconButton>
        );
      };
    
      const gridOptionsResume = {
        columnDefs: columnDefsFeedback,
        frameworkComponents: {
          buttonRendererViewResume: buttonRendererView,
          buttonRendererDeleteResume: buttonRendererDelete,
        },
      };
      useEffect(() => {
        async function fetchdata() {
          const res = await getFeedbackAllData({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
          setFeedbackData(res);
        }
        fetchdata();
        
      }, []);
  return (
    <>
    <h1>Feedback</h1>
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
    <Button variant='contained' onClick={() => navigate('/resumemakerui/addfeedback')}>FeedBack </Button>
    </Grid>

    </div>
     {
         feedbackData.length ? (
            <AgGridTable gridOptions={gridOptionsResume} data={feedbackData} type="feedback" />
           ) : null
     }
    </>
  )
}

export default FeedbackDashboard



// <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Paper
//                     component="form"
//                     sx={{ display: 'flex', alignItems: 'center', width: 300 }}
//                 >
//                     <InputBase
//                         sx={{ ml: 1, flex: 1 }}
//                         placeholder="Search name"
//                         inputProps={{ 'aria-label': 'search name' }}
//                     />
//                     <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//                         <SearchIcon />
//                     </IconButton>

//                 </Paper>
//                 <Button variant='contained' onClick={() => navigate('/resumemakerui/resume')}>Create Resume +</Button>
//             </Grid>