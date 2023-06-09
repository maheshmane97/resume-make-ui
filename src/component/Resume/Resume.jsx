import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Education from "./Education";
import SkillSets from "./SkillSets";
import Company from "./Company";
import { useNavigate } from "react-router-dom";
import { resumeSave } from "../../services/resumemaker-services";

function Resume() {
  const [summary, setSummary] = useState("");
  const [summaryList, setSummaryList] = useState([]);
  const [married, setMarried] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const handleSummary = () => {
    setSummaryList([...summaryList, { val: summary }]);
  };

  const handleChangeStatus = (event) => {
    setMarried(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const [workExperience, setWorkExperience] = useState([]);
  
  const handleCompanyDataChange = (newCompanyData) => {
    setWorkExperience(newCompanyData);
  };
  useEffect(() => {
  }, [workExperience]);

  const removeItem = (ele) => {
    if (window.confirm(`Are you sure you want to remove ${summaryList}?`)) {
      const newItems = summaryList.filter((i) => i !== ele);
      setSummaryList(newItems);
      console.log(newItems);
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("myForm"); 
    const str = [];
    summaryList.forEach((ele) => {
      str.push(ele.val);
    });
  
    const personalDetails = {
      personalDetails: {
        empName: form.elements.fullName.value,
        email: form.elements.email.value,
        designation: form.elements.mainDesignation.value,
        mobileNo: form.elements.mobileNo.value,
        address: form.elements.address.value,
        gender: gender,
        maritalStatus: married,
      },
      skillSet: {
        technologies: form.elements.technologies.value,
        languages: form.elements.languages.value,
        tools: form.elements.tools.value,
        databaseUsed: form.elements.databaseUsed.value,
        operatingSystems: form.elements.operatingSystems.value,
        ideUsed: form.elements.ideUsed.value,
        webServer: form.elements.webServer.value,
      },
      professionalSummary: {
        summaryDetails: str,
      },
      educationDetails: {
        degree: form.elements.degree.value,
        university: form.elements.university.value,
        passingYear: form.elements.passingYear.value,
      },
      workExperience,
    };
    const data = JSON.stringify(personalDetails);

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      }
    };
    const res = await resumeSave(config, data);

    if (res.code === '200') {
      alert("Resume saved successfully");
      navigate("/resumemakerui/dashboard");
    } else {
      alert('Something went wrong');
    }
  
  };

  return (
    <>
      <form id="myForm">
        <div className="containerResume">
          <div className="main">
            <div>
              <h1>Resume</h1>
              <Button
                style={{
                  width: "20%",
                  height: "40px",
                  fontSize: "15px",
                  fontWeight: "bolder",
                  left: "78%",
                  margin: "-100px 0px 0px 0px",
                }}
                variant="contained"
                onClick={() => navigate("/resumemakerui/preview")}
              >
                Resume Preview
              </Button>
            </div>

            <div className="detail subContainer">
              <div className="row">
                <TextField
                  Name
                  id="outlined-required"
                  label="Name"
                  placeholder="Enter your Name"
                  required
                  name="fullName"
                />
                <TextField
                  Email
                  id="outlined-required"
                  label="Email"
                  placeholder="Enter your email"
                  required
                  name="email"
                />
              </div>

              <div className="row">
                <TextField
                  Title
                  id="outlined-required"
                  label="Title"
                  placeholder="Enter your Designation"
                  required
                  name="mainDesignation"
                />
                <TextField
                  Enter
                  Phone
                  id="outlined-required"
                  label="Enter Phone"
                  placeholder="Enter Your phone Number"
                  required
                  name="mobileNo"
                />
              </div>
              <div className="row" style={{ textAlign: "left" }}>
                <TextField
                  Address
                  id="outlined-required"
                  label="Address"
                  placeholder="Enter your Address"
                  required
                  name="address"
                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>

                  <Select
                    value={gender}
                    label="Gender"
                    onChange={handleChangeGender}
                    required
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ textAlign: "left" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    MaritalStatus
                  </InputLabel>

                  <Select
                    sx={{ width: "49%" }}
                    value={married}
                    label="MaritalStatus"
                    onChange={handleChangeStatus}
                    required
                  >
                    <MenuItem value={"Married"}>Married</MenuItem>
                    <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
                    <MenuItem value={"Divorce"}>Divorce</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div>
              <h2
                style={{
                  border: "0.1px solid #239ce2",
                  backgroundColor: "rgb(25,118,210)",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Professional Summary
              </h2>
            </div>
            <div className="detail subContainer">
              {Array.isArray(summaryList) && summaryList.length ? (
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {summaryList.map((ele, index) => (
                    <li>
                      {ele.val}
                      <Button onClick={() => removeItem(ele)}>x</Button>
                    </li>
                  ))}{" "}
                </ul>
              ) : (
                " "
              )}
              <div className="row">
                <TextField
                  Summary
                  id="outlined-required"
                  value={summary}
                  label="Summary"
                  placeholder="Enter your summary"
                  onChange={(e) => setSummary(e.target.value)}
                  required
                />
                <Button onClick={handleSummary} variant="contained">
                  Add
                </Button>
              </div>
            </div>

            <SkillSets />

            <Education />

            <Company
              onCompanyDataChange={handleCompanyDataChange}
            />

            <Button
              style={{
                width: "25%",
                padding: "10px",
                fontSize: "15px",
                fontWeight: "bolder",
                left: "38%",
                margin: "25px 0px 25px 0px",
              }}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit Data
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
export default Resume;
