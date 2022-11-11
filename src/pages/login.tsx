import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Grid } from "@material-ui/core";
import { Auth } from "aws-amplify";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useState } from "react";
import { useUser } from "../context/AuthContext";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";

interface IFormInput {
  username: string;
  password: string;
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
  const router = useRouter();
  const [signInError, setSignInError] = useState<string>("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const signedInUser = await Auth.signIn(data.username, data.password);
    if (signedInUser) {
      router.push("/");
    } else {
      throw new Error("sign in error..");
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

        <Grid item>
          <Button variant="contained" type="submit">
            Sign In
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {signInError}
        </Alert>
      </Snackbar>{" "}
    </form>
  );
}
