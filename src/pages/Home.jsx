import { useQuery } from "@tanstack/react-query";
import Title from "../components/Title";
import axios from "../utils/axios";
import {
  Box,
  Divider,
  Grid,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import shuffleArray from "../utils/shuffleArray";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [open, setOpen] = useState(false);

  const { data, error, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const [{ data: posts }, { data: users }] = await Promise.all([
          axios.get(`/posts`),
          axios.get(`/users`),
        ]);

        const postsWithUserData = posts.map((post) => {
          const user = users.find((user) => user.id === post.userId);
          return {
            ...post,
            email: user.email,
            name: user.name,
            username: user.username,
          };
        });
        return postsWithUserData;
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    },
  });

  useEffect(() => {
    function refresh() {
      setOpen(true);
      const randomizedArray = shuffleArray(data);
      setTrendingPosts(randomizedArray.splice(0, 4));
      setPosts(randomizedArray.splice(4, 12));
    }
    if (data?.length > 0) {
      refresh();
      const intervalId = setInterval(() => {
        refresh();
      }, 30000); // 30000ms = 30 seconds
      return () => clearInterval(intervalId);
    }
  }, [data]);

  if (isPending)
    return (
      <Grid container spacing={4}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((_, idx) => (
          <Grid item xs={12} sm={12} md={6} key={idx}>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ width: "100%" }}>
                  <Skeleton variant="text" width={"100%"} />
                  <Skeleton variant="text" width={"100%"} />
                </Box>
              </Stack>
              <Skeleton variant="rounded" height={120} />
            </Stack>
          </Grid>
        ))}
      </Grid>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Title>Home</Title>

      <Typography variant="h3" component="h3">
        Trending Posts
      </Typography>
      <Divider sx={{ mb: 4, mt: 1 }} />
      <Grid container spacing={4}>
        {trendingPosts.map((post) => (
          <Grid item xs={12} sm={12} md={6} key={post.id}>
            <PostCard post={post} cursor={true} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h3" component="h3" sx={{ mt: 8 }}>
        Posts
      </Typography>
      <Divider sx={{ mb: 4, mt: 1 }} />
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} sm={12} md={6} key={post.id}>
            <PostCard post={post} cursor={true} />
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message="Loading new posts..."
      />
    </>
  );
};

export default Home;
