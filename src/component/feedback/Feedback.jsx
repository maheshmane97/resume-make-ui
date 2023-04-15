import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import NestedGrid from "./NestedGrid.jsx";
import MultipleSelect from "./MultipleSelect";
import { findSkills, findSoftSkills } from "../../services/feedback-service.js";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BASE_URL, axiosMethod } from "../../services/helper.js";
import axios from "axios";
import AutoCompleteCustome from "./AutoCompleteCustome.jsx";
import ImageUploadPreviewComponent from "./ImageUploadPreviewComponent.jsx";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:9091/thor/",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

const schema = yup.object().shape({
  // technologyRating: yup
  //   .array()
  //   .of(
  //     yup.object().shape({
  //       techName: yup.string().required(),
  //       techSkills: yup
  //         .array()
  //         .of(
  //           yup.object().shape({
  //             skillName: yup.string().required(),
  //             rating: yup.number().integer().max(4).required()
  //           })
  //         )
  //     })
  //   )
  //   .required('At least one technology rating is required'),
  candidateName: yup.string().required("Candidate Name is Required..!"),
  candidateId: yup.string().required("Candidate Id is Required..!"),
  experience: yup.string().required("Total Experience is Required..!"),
  interviewRound: yup.string().required("Please Select Interview Round..!"),
  interviewType: yup.string().required("Please Select Interview Type..!"),
  result: yup.string().required("Need to select atleast Selected/Rejected/Hold"),
  goodAt: yup.string().required("Need to specify Good At technologies"),
  improvmentAreas: yup.string().required("Need to specify Improvement Areas"),
  comments: yup.string().required("Remarks are compulsory..!"),
  softSkillRatings: yup
    .array()
    .of(
      yup.object().shape({
        skillName: yup.string().required(),
        rating: yup.number().integer().min(0).max(4).required(),
      })
    )
    .required("At least one soft skill rating is required"),
});

const Feedback = () => {
  const [technoList, setTechnoList] = useState([]);
  const [softSkill, setSoftSkill] = useState([]);
  const [totalExperience, setTotalExperience] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [interviewRound, setInterviewRound] = useState("");
  const [result, setResult] = useState("");
  const [softSkillRatings, setSoftSkillRatings] = useState([]);
  const [technologyRating, setTechnologyRating] = useState([]);
  const [files, setFiles] = useState([]);

  const handleFiles=(files)=>{
    setFiles(files);
  }

  const handleSoftSkillRatingsChange = (ratings) => {
    console.log("RATING : ", ratings);
    const updateRating = ratings.map((rating) => {
      delete rating.softSkillId;
      return rating;
    });
    setSoftSkillRatings(updateRating);
    console.log("softSkillRatings := ", softSkillRatings);
  };

  const handleTechRatingsChange = (ratings) => {
    console.log("RATING_TECH___ ::", ratings);

    const updateTechRating = ratings.map((rating) => {
      delete rating.techId;
      delete rating.isSelected;
      rating.techSkills.map((skill) => {
        delete skill.techSkillId;
        return skill;
      });
      return rating;
    });

    setTechnologyRating(updateTechRating);
    console.log("setTechnoList := ", technologyRating);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      softSkillRatings: [],
      technologyRating: [],
      // set the default value for softSkillRatings to an empty array
    },
  });

  const submitFormdata = (data) => {
    // e.preventDefault();
    // //console.log("Feedback FORM : ", data)

    // const response = await submitForm(config, data);
    // if(response?.status===200){
    //   alert("Feedback Submitted Successfully..!");
    // }else{
    //   alert("Something get Wrong..!")
    // }
    const feedbackForm = JSON.stringify(data);
    console.log("FEEDBACKFORM : ", feedbackForm)
    let formData= new FormData();
    formData.append('form', feedbackForm);
    formData.append('attachments', files);

    console.log("Data --> ", data);
    axiosInstance
      .post("/form", formData)
      .then((res) => {
        console.log("Res --> ", res);
        if (res?.status === 200) {
          alert("Feedback Submitted Successfully..!");
          reset();
        } else {
          alert("Something get Wrong..!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //   submitForm(data).then((res) => {
    //     console.log(res);
    //     if (res.code == 200) {
    //       alert("Feedback Submitted Successfully..!");
    //       reset();
    //     }
    //     else {
    //       alert("Something get Wrong..!")
    //     }
    // })
    //     .catch(error => {
    //         console.log(error);
    //     });
  };

  useEffect(() => {
    const getTechnology = async () => {
      const response = await findSkills(config);
      const getTech = response;
      setTechnoList(getTech);
      const softskill = await findSoftSkills(config);
      setSoftSkill(softskill);
    };
    getTechnology();
  }, []);

  return (
    <div>
      <React.Fragment>
        <form>
          <Card
            style={{
              maxWidth: "95%",
              margin: "10px auto",
              padding: "25px",
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
              background: "rgb(245,245,245)",
            }}
          >
            <Typography
              variant="h5"
              style={{
                maxWidth: "95%",
                margin: "10px  auto",
                padding: "5px 5x",
              }}
            >
              Resume Feedback Form
            </Typography>
            <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid xs={6} sm={6} item>
                    <TextField
                      label="Candidate Id"
                      placeholder="Candidate Id"
                      variant="outlined"
                      name="candidateId"
                      {...register("candidateId")}
                      fullWidth
                      required
                      size="small"
                    ></TextField>
                    {errors.candidateId &&
                      <p style={{ fontSize: 14, color: 'red' }}>{errors.candidateId?.message}</p>
                    }
                  </Grid>
                  <Grid xs={6} sm={6} item>
                    <TextField
                      label="Candidate Name"
                      placeholder="FirstName LastName"
                      variant="outlined"
                      name="candidateName"
                      {...register("candidateName")}
                      fullWidth
                      required
                      size="small"
                    ></TextField>
                    {errors.candidateName &&
                      <p style={{ fontSize: 14, color: 'red' }}>{errors.candidateName?.message}</p>
                    }
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/*"interviewType interview round"*/}
            <Card style={{ maxWidth: "95%", margin: "10px auto" }}>
              <CardContent>
                <Grid container spacing={1}>

                  <Grid xs={6} sm={6} item>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Interview Type
                      </InputLabel>
                      <Select
                        value={interviewType}
                        label="Interview Type"
                        name="interviewType"
                        {...register("interviewType")}
                        onChange={(e) => setInterviewType(e.target.value)}
                        required
                      >
                        <MenuItem value={"The_Converge"}>The Converge</MenuItem>
                        <MenuItem value={"Humancloud_Internal"}>
                          Humancloud Internal
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={6} sm={6} item>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Interview Round
                      </InputLabel>
                      <Select
                        value={interviewRound}
                        label="Interview Round"
                        name="interviewRound"
                        {...register("interviewRound")}
                        onChange={(e) => setInterviewRound(e.target.value)}
                        required
                      >
                        <MenuItem value={"L1"}>Level 1</MenuItem>
                        <MenuItem value={"L2"}>Level 2</MenuItem>
                        <MenuItem value={"L3"}>Level 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* <p>{errors.totalExperience && errors.interviewType && errors.interviewRound?.message }</p> */}
            {/* Technical Skills*/}
            <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    maxWidth: "95%",
                    padding: "5px",
                    textAlign: "left",
                  }}
                >
                  Technical Skills
                </Typography>

                <Grid container spacing={1}>
                  <Grid xs={8} item>
                    <AutoCompleteCustome
                      setTechnoList={setTechnoList}
                      technoList={technoList}
                    />{" "}
                  </Grid>
                  <Grid xs={4} item>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Totat Experience
                      </InputLabel>
                      <Select
                        value={totalExperience}
                        label="Totat Experience"
                        name="experience"
                        {...register("experience")}
                        onChange={(e) => setTotalExperience(e.target.value)}
                        required
                      >
                        <MenuItem value={"0-2"}>0-2</MenuItem>
                        <MenuItem value={"2-5"}>2-5</MenuItem>
                        <MenuItem value={"5-8"}>5-8</MenuItem>
                        <MenuItem value={"8-10"}>8-10</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid mt="10px" item>
                  {
                    <NestedGrid
                      // technologyList={technoList}
                      // // isSoftskill={true}
                      // setTechnologyList={setTechnoList}
                      setValue={setValue}
                      name="technologyRating"
                      technologyList={technoList}
                      setTechnologyList={setTechnoList}
                      {...register("technologyRating")}
                      handleTechRatingsChange={handleTechRatingsChange}
                    />
                  }
                </Grid>
              </CardContent>
            </Card>
            {/* Soft Skills*/}
            <Card
              style={{ maxWidth: "95%", margin: "20px auto", padding: "20px 5x" }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    maxWidth: "95%",
                    marginBottom: "5px",
                    padding: "5px",
                    textAlign: "left",
                  }}
                >
                  Soft Skills
                </Typography>

                <Grid container spacing={1}>
                  <NestedGrid
                    setValue={setValue}
                    name="softSkillRatings"
                    technologyList={softSkill}
                    isSoftskill={true}
                    setTechnologyList={setSoftSkill}
                    {...register("softSkillRatings")}
                    handleSoftSkillRatingsChange={handleSoftSkillRatingsChange}
                  />
                </Grid>
              </CardContent>
            </Card>
            <Card style={{ maxWidth: "95%", margin: "10px auto" }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid xs={6} sm={6} item>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Interview Result
                      </InputLabel>
                      <Select
                        value={result}
                        label="Interview Result"
                        name="result"
                        {...register("result")}
                        onChange={(e) => setResult(e.target.value)}
                        required
                      >
                        <MenuItem value={"SELECTED"}>Selected</MenuItem>
                        <MenuItem value={"REJECTED"}>Rejected</MenuItem>
                        <MenuItem value={"HOLD"}>Hold</MenuItem>
                      </Select>
                      {errors.result &&
                        <p style={{ fontSize: 14, color: 'red' }}>{errors.result?.message}</p>
                      }
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <TextField
                      label="Good At"
                      name="goodAt"
                      {...register("goodAt")}
                      multiline
                      placeholder="Type Good At"
                      variant="outlined"
                      rows={2}
                      fullWidth
                      required
                    ></TextField>
                    {errors.goodAt &&
                      <p style={{ fontSize: 14, color: 'red' }}>{errors.goodAt?.message}</p>
                    }
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <TextField
                      label="Improvement Areas"
                      name="improvmentAreas"
                      {...register("improvmentAreas")}
                      multiline
                      placeholder="Type improvement Areas"
                      variant="outlined"
                      rows={2}
                      fullWidth
                      required
                    ></TextField>
                    {errors.improvmentAreas &&
                      <p style={{ fontSize: 14, color: 'red' }}>{errors.improvmentAreas?.message}</p>
                    }
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card style={{ maxWidth: "95%", margin: "20px auto" }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <TextField
                      label="Remark"
                      name="comments"
                      {...register("comments")}
                      multiline
                      placeholder="Type your message"
                      variant="outlined"
                      rows={2}
                      fullWidth
                      required
                    ></TextField>
                    {errors.comments &&
                      <p style={{ fontSize: 14, color: 'red' }}>{errors.comments?.message}</p>
                    }
                  </Grid>
                  <ImageUploadPreviewComponent
                    handleFiles={handleFiles}
                  />
                  <Grid xs={12} item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      id="submit"
                      onClick={handleSubmit(submitFormdata)}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Card>
        </form>
      </React.Fragment>
    </div>
  );
};

export default Feedback;
