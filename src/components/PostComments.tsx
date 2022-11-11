import { Grid, Paper, Typography } from "@material-ui/core";
import Moment from "react-moment";
import React, { ReactElement } from "react";
import { Comment } from "../API";

interface Props {
  comment: Comment;
}

export default function PostComments({ comment }: Props): ReactElement {
  return (
    <Paper
      style={{ width: "100%", minHeight: 128, marginTop: 20, padding: 15 }}
    >
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="body1">
            Posted by <b>{comment.owner}</b>{" "}
            <Moment fromNow>{comment.createdAt}</Moment>
          </Typography>
          <Grid item>
            <Typography variant="body2">{comment.content}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
