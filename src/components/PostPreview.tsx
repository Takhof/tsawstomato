import { Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { ReactElement } from "react";
import { Post } from "../API";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
  return (
    <Paper elevation={3}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
        style={{ width: "100%", padding: 10, marginTop: 20 }}
      >
        <Grid item spacing={2} alignItems="center" style={{ maxWidth: 128 }}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton color="inherit">
                <KeyboardArrowUpIcon />
              </IconButton>
            </Grid>
            <Grid item>vote</Grid>
            <Grid item>
              <IconButton color="inherit">
                <KeyboardArrowDownIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column" alignItems="flex-start">
            <Grid item>
              <Typography variant="body2">
                Posted by <b>{post.owner}</b> at <b>{post.createdAt}</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{post.title}</Typography>
            </Grid>
            <Grid item>other stuff</Grid>
            <Grid item>other stuff</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
