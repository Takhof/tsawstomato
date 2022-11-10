import { Container, Typography } from "@material-ui/core";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { ListPostsQuery, Post } from "../API";
import PostPreview from "../components/PostPreview";
import { useUser } from "../context/AuthContext";
import { listPosts } from "../graphql/queries";

export default function Home() {
  const { user } = useUser();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = (await API.graphql({ query: listPosts })) as {
        data: ListPostsQuery;
        errors: any[];
      };
      if (allPosts.data) {
        setPosts(allPosts.data.listPosts?.items as Post[]);
        return allPosts.data.listPosts?.items as Post[];
      } else {
        throw new Error("cant get posts. sad.");
      }
    };
    fetchPosts();
  }, []);

  console.log("USER:", user);
  console.log("POSTS", posts);
  return (
    <Container maxWidth="md">
      {posts.map((post) => {
        return <PostPreview key={post.id} post={post} />;
      })}
    </Container>
  );
}

//get all the posts on server side
//since all users can read posts in our schema logic
//we can use the api key authorization method

//so we'll call code to access our graphql api on the serverside
//pass it to our function as props
//render the posts on the home page
