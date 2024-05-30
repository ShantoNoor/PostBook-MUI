import { useQuery } from "@tanstack/react-query";
import Title from "../components/Title";
import { useParams } from "react-router-dom";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import axios from "../utils/axios";
import PostCard from "../components/PostCard";

const PostDetails = () => {
  const { id } = useParams();
  const { data, error, isPending } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      try {
        const [{ data: post }, { data: users }, { data: comments }] =
          await Promise.all([
            axios.get(`/posts/${id}`),
            axios.get(`/users`),
            axios.get(`/posts/${id}/comments`),
          ]);

        const user = users.find((user) => user.id === post.userId);

        return { ...post, comments, ...user };
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    },
  });

  if (isPending)
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ width: "100%" }}>
          <Skeleton variant="text" width={"100%"} />
          <Skeleton variant="text" width={"100%"} />
        </Box>
      </Stack>
      <Skeleton variant="rounded" height={120} />
      <Box>
        <Grid container spacing={2} sx={{mt: 2}}>
          {Array.from({ length: 4 }, (_, i) => i + 1).map((post) => (
            <Grid item xs={12} key={post.id}>
              <Stack spacing={2}>
                <Box sx={{ width: "100%" }}>
                  <Skeleton variant="text" width={"50%"} />
                  <Skeleton variant="rounded" height={40} />
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <>
      <Title>Post Details</Title>
      <PostCard post={data} />
    </>
  );
};

export default PostDetails;
