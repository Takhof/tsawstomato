import {
  Box,
  ButtonBase,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { ReactElement, useEffect, useState } from "react";
import { Post } from "../API";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import Moment from "react-moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { Storage } from "aws-amplify";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
  const router = useRouter();
  const [postImage, setPostImage] = useState<string | undefined>(undefined);
  useEffect(() => {
    async function getImageFromStorage() {
      try {
        const signedURL = await Storage.get(post.image!);
        console.log("Found Image:", signedURL);
        setPostImage(signedURL);
      } catch (error) {
        console.log("No image found.");
      }
    }

    getImageFromStorage();
  }, []);
  return (
    <Paper elevation={3}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
        spacing={2}
        style={{ width: "100%", padding: 10, marginTop: 20 }}
      >
        <Grid item style={{ maxWidth: 128 }}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton color="inherit">
                <KeyboardArrowUpIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Box>
                <Typography variant="body2">
                  {(post.upvotes - post.downvotes).toString()}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <IconButton color="inherit">
                <KeyboardArrowDownIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <ButtonBase onClick={() => router.push(`/post/${post.id}`)}>
          <Grid item>
            <Grid container direction="column" alignItems="flex-start">
              <Grid item style={{ maxWidth: 800 }}>
                <Typography variant="body2">
                  Posted by <b>{post.owner}</b>{" "}
                  <Moment fromNow>{post.createdAt}</Moment>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">{post.title}</Typography>
              </Grid>
              <Grid item style={{ maxHeight: 32, overflowY: "hidden" }}>
                {post.contents}
              </Grid>
              {post.image && (
                <Grid item>
                  <Image
                    alt="prevImage"
                    src={postImage!}
                    height={500}
                    width={900}
                    layout="responsive"
                  ></Image>
                </Grid>
              )}
            </Grid>
          </Grid>
        </ButtonBase>
      </Grid>
    </Paper>
  );
}
