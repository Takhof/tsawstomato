import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Grid } from "@material-ui/core";
import { Auth } from "aws-amplify";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import { useUser } from "../context/AuthContext";

interface IFormInput {
  username: string;
  password: string;
  email: string;
  iceCreamType: { label: string; value: string };
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Signup() {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const [signUpError, setSignUpError] = useState<string>("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      signUpCustom(data);
    } catch (err) {
      setSignUpError(err.message);
      setOpen(true);
    }
  };

  console.log("Errors:", errors);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function signUpCustom(data: IFormInput) {
    const { username, password, email } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      console.log(user);
    } catch (error) {
      throw error;
    }
  }

  console.log("user is", user);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p></p>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Grid item>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            type="text"
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username.message : null}
            {...register("username", {
              required: { value: true, message: "Please enter a username." },
              minLength: { value: 3, message: "Minimum length is 3 letters." },
            })}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email"
            label="email"
            variant="outlined"
            type="email"
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.message : null}
            {...register("email", {
              required: { value: true, message: "Please enter a valid email." },
            })}
          />
        </Grid>
        <Grid item>
          <TextField
            id="password"
            label="password"
            variant="outlined"
            type="password"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : null}
            {...register("password", {
              required: { value: true, message: "Please enter a password." },
              minLength: { value: 3, message: "Minimum length is 3 letters." },
            })}
          />
        </Grid>
        <Grid style={{ marginTop: 16 }}>
          <Button variant="contained" type="submit">
            Sign up
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Sign up error!
        </Alert>
      </Snackbar>{" "}
    </form>
  );
}
