import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React, { useState } from "react";
  import { InputTextfield } from "../theme";
  import styles from "../../styles/signUp.module.css";
  import { useForm } from "react-hook-form";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useNavigate } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { SignUpThunk } from "../../reduxToolkit/Account/accountSlice";
  import { unwrapResult } from "@reduxjs/toolkit";
  import {
    setMultiNotificationData,
    setMultiNotificationVariant,
  } from "../../reduxToolkit/Notification/notificationSlice";
  
  function checkForSpecialCharNumber(data) {
    var char = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\s [a-zA-Z]*$]/;
    var number = "[0-9]";
    if (data?.match(char) || data?.match(number)) {
      return false;
    }
    return true;
  }
    
  const schema = yup.object({
    firstName: yup
      .string()
      .required("First name is required")
      // .pattern="^[a-zA-Z0-9\s]+$"
      .test(
        "Check for special",
        "First name can only have alphabets",
        checkForSpecialCharNumber
      ),
    lastName: yup
      .string()
      .required("Last name is required")
      .test(
        "Check for special",
        "Last name can only have alphabets",
        checkForSpecialCharNumber
      ),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Company email is required"),

    userRole: yup
      .string()
      .required("Need to select atleast one user role"),
  });

  function AddUser(formData)
  {
    const dispatch = useDispatch();
    const [userRole, setuserRole] = useState("");

    const {
        register,
        handleSubmit,
        reset: resetForm,
        formState: { errors },
      } = useForm({
        defaultValues: formData.user,
        resolver: yupResolver(schema),
        mode: "onChange",
      });
    
      let navigate = useNavigate();
     
      const handleChangeUserRole = (event) => {
        setuserRole(event.target.value);
      };

      const submit = async (data) => {
        const singupdata = {
          fullName: data.firstName + " " + data.lastName,
          email: data.email,
          password: "123456",
          role: userRole,
        };
        const result = await dispatch(SignUpThunk(singupdata));
        const response = unwrapResult(result);
        if (response.status === 200) {
          dispatch(setMultiNotificationVariant("success"));
          const errorArray = [
            {
              propertyValue: response?.data?.message || "User Added successfully",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
          //resetForm();
          navigate("/resumemakerui/users");
        } else {
          dispatch(setMultiNotificationVariant("error"));
          const errorArray = [
            {
              propertyValue: response?.data?.message || "Something went wrong",
            },
          ];
          dispatch(setMultiNotificationData(errorArray));
        }
      };
 
    
      return (
        <form onSubmit={handleSubmit(submit)}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box style={{
            width: "45%",  margin: "auto",  padding: "50px", marginTop :"50px",
            boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px" }}>
              <h3 >Add New User</h3>
              <FormControl sx={{ py: 2 }}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <InputTextfield
                      fullWidth
                      label="First Name"
                      required
                      {...register("firstName")}
                    />
                    <p className={styles.error}>{errors.firstName?.message}</p>
                  </Grid>
    
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <InputTextfield
                      fullWidth
                      label="Last Name"
                      required
                      {...register("lastName")}
                    />
    
                    <p className={styles.error}>{errors.lastName?.message}</p>
                  </Grid>
    
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <InputTextfield
                      fullWidth
                      type="email"
                      label="Company email"
                      required
                      {...register("email")}
                    />
                    <p className={styles.error}>{errors.email?.message}</p>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    User Role
                  </InputLabel>

                  <Select
                    sx={{ width: "100%" }}
                    value={userRole}
                    label="userRole"
                    {...register("userRole")}
                    onChange={handleChangeUserRole}
                    required
                  >
                    <MenuItem value={"USER"}>USER</MenuItem>
                    <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                  </Select>
                </FormControl>
                    <p className={styles.error}>{errors.userRole?.message}</p>
                  </Grid>
    
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{ display: "flex", justifyContent: "space-Between" }}
                  >
                    <Button
                      id="signUPButton"
                      sx={{ width: "100px" }}
                      variant="contained"
                      fullWidth
                     // onClick={handleSubmit(submit)}
                      type="submit"
                    >
                      Save
                    </Button>
                    <Button
                      id="ResetButton"
                      sx={{ width: "100px" }}
                      variant="contained"
                      fullWidth
                     // onClick={handleSubmit(submit)}
                      type="reset"
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Box>
          </Grid>
        </form>
      );

  }
  export default AddUser