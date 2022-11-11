import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  createStyles,
  Theme,
  Tooltip,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";

interface Props {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export default function ImageUpload({ file, setFile }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: any) => {
      setFile(acceptedFiles[0]);
    },
  });

  return (
    <>
      {!file ? (
        <section
          className="container"
          style={{ minHeight: 70, borderStyle: "dashed", borderWidth: 1 }}
        >
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p style={{ padding: "2rem" }}>
              <Typography variant="body2">Upload an image here!</Typography>
            </p>
          </div>
        </section>
      ) : (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item>
            <img
              src={URL.createObjectURL(file)}
              style={{ width: "auto", maxHeight: 320 }}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
