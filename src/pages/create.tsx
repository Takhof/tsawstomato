import { Button, Container, Grid, TextField } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ImageUpload from "../components/ImageUpload";
import { Storage, API } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { listPosts } from "../graphql/queries";
import {
  CreatePostInput,
  CreatePostMutation,
  CreatePostMutationVariables,
  ListPostsQuery,
} from "../API";
import { createPost } from "../graphql/mutations";
import { useRouter } from "next/router";

interface IFormInput {
  title: string;
  content: string;
}

interface Props {}

export default function Create({}: Props): ReactElement {
  const [file, setFile] = useState<File>();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    if (file) {
      try {
        const imagePath = uuidv4();

        await Storage.put(imagePath, file, {
          contentType: file.type, // contentType is optional
        });
        const createNewPostInput: CreatePostInput = {
          title: data.title,
          contents: data.content,
          image: imagePath,
          upvotes: 0,
          downvotes: 0,
        };

        const createNewPost = (await API.graphql({
          query: createPost,
          variables: { input: createNewPostInput },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })) as { data: CreatePostMutation };

        router.push(`/post/${createNewPost.data.createPost?.id}`);
        console.log("SUCCESS!");
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }
  };
  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} direction="column">
          <Grid item style={{ marginTop: "2rem" }}>
            <TextField
              id="title"
              label="Post Title"
              variant="outlined"
              type="text"
              fullWidth
              error={errors.title ? true : false}
              helperText={errors.title ? errors.title.message : null}
              {...register("title", {
                required: { value: true, message: "Please enter a title." },
                minLength: {
                  value: 3,
                  message: "Minimum length is 3 letters.",
                },
              })}
            />
          </Grid>
          <Grid item>
            <TextField
              id="content"
              label="Content"
              variant="outlined"
              type="text"
              fullWidth
              multiline
              error={errors.content ? true : false}
              helperText={errors.content ? errors.content.message : null}
              {...register("content", {
                required: { value: true, message: "Please type something!!!" },
                minLength: {
                  value: 3,
                  message: "Minimum length is 3 letters.",
                },
              })}
            />
          </Grid>
          <Grid item>
            <ImageUpload file={file!} setFile={setFile} />
          </Grid>

          <Button
            variant="contained"
            style={{ marginTop: "2rem" }}
            type="submit"
          >
            Create Post
          </Button>
        </Grid>
      </form>
    </Container>
  );
}
