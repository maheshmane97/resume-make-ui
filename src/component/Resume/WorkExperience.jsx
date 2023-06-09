import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
// import Projects from './Projects'
import { ProjectTemplate } from "./Projects";

function WorkExperience() {
  const [companies, setCompanies] = useState([WorkExperienceTemplate()]);
  const handleOpenCompanies = () => {
    setCompanies([...companies, WorkExperienceTemplate()]);
  };

  return (
    <>
      <Grid container>
        <Grid item lg={12} sx={12}>
          <h2
            style={{
              border: "0.1px solid #239ce2",
              backgroundColor: "rgb(25,118,210)",
              textAlign: "center",
              color: "#fff",
            }}
          >
            Work Experience
          </h2>
        </Grid>
      </Grid>
      {companies.map((company) => {
        return company;
      })}

      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "10px",
          gap: "15px",
        }}
      >
        <Button variant="contained" onClick={handleOpenCompanies}>
          Add Company
        </Button>
      </Grid>
    </>
  );
}

export default WorkExperience;

const WorkExperienceTemplate = () => {
  // const [projects, setProjects] = useState([ProjectTemplate()]);
  // const handleOpenContainer = () => {
  //     setProjects([...projects, ProjectTemplate()])
  // }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} style={{ display: "flex", alignItems: "start" }}>
          <h3>Company:</h3>
        </Grid>
        <Grid item xs={8}>
          <TextField
            style={{ width: "100%" }}
            Company
            id="outlined-required"
            label="Company"
            placeholder="Enter your Company Name"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4} style={{ display: "flex", alignItems: "start" }}>
          <h3>Designation:</h3>
        </Grid>
        <Grid item xs={4}>
          <TextField
            style={{ width: "100%" }}
            Designation
            id="outlined-required"
            label="Designation"
            placeholder="Enter your Designation"
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            style={{ width: "100%" }}
            periodFrom
            id="outlined-required"
            label="Start"
            placeholder="Enter your Working Period in last  Company "
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            style={{ width: "100%" }}
            periodFrom
            id="outlined-required"
            label="End"
            placeholder="Enter your Working Period To "
          />
        </Grid>
      </Grid>

      <ProjectTemplate></ProjectTemplate>
      {/* {projects.map(project => {
               return project;
           })} 
        <Button variant="contained" onClick={ handleOpenContainer}>Add Company</Button>
         */}
    </>
  );
};
