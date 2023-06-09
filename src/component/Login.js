import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/login.module.css";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosMethod } from "../services/helper";
import { logInThunk, setIsLogin } from "../reduxToolkit/Account/accountSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  setMultiNotificationData,
  setMultiNotificationVariant,
} from "../reduxToolkit/Notification/notificationSlice";

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const routerChange = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    const result = await dispatch(logInThunk(loginData));
    const response = unwrapResult(result);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      dispatch(setIsLogin(true));
      navigate("/resumemakerui/dashboard");
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

  const handleSignUpOpen = () => {
    let path = `/resumemakerui/signup`;
    navigate(path);
  };

  const schema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter valid email address"),
    password: yup.string().required("Please enter password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return (
    <Grid tabIndex="0" container>
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <Paper square className={styles.paperContainer}></Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={7}>
        <Box className={styles.box}>
          <Typography variant="h2" gutterBottom>
            Login
          </Typography>
          <FormControl sx={{ py: 2 }}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  id="logInEmail"
                  label="Company Email"
                  name="email"
                  required
                  type="email"
                  {...register("email")}
                />

                <p style={{ color: "red" }}>{errors.email?.message}</p>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id="logInPass"
                  fullWidth
                  label="Password"
                  name="password"
                  required
                  type="password"
                  {...register("password")}
                />

                <p style={{ color: "red" }}>{errors.password?.message}</p>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography my={2} variant="subtitle2">
                    <Link>
                      <Typography
                        id="logInForgot"
                        onClick={() => navigate('/resumemakerui/passwordreset')}
                        sx={{ ":hover": { cursor: "pointer" } }}
                        variant="h7"
                      >
                        Forgot Password?
                      </Typography>
                    </Link>
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                    sx={{ py: 1 }}
                  >
                    Don't have an account?
                    <Button onClick={handleSignUpOpen}>Sign Up</Button>
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={styles.griditem}
              >
                <Button
                  id="logInButton"
                  sx={{ width: "100px" }}
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit(routerChange)}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
