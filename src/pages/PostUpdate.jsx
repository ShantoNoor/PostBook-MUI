import {
  Box,
  Button,
  Divider,
  Skeleton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Title from "../components/Title";
import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PostCreate = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, error, isPending } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      try {
        const result = await axios.get(`/posts/${id}`);
        setTitle(result.data.title);
        setBody(result.data.body);
        return result.data;
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    },
  });

  const handleSubmit = async () => {
    setMessage("Updating new post...");
    setOpen(true);

    const result = await axios.put(`/posts/${id}`, {
      title,
      body,
      userId: data.userId,
      id,
    });
    
    if (result.status === 200) {
      setMessage("Post added successfully!");
      setOpen(true);
      setTimeout(() => {
        setTitle("");
        setBody("");
        navigate(`/post-details/${id}`);
      }, 1000);
    }
  };

  if (isPending)
    return (
      <Stack spacing={1}>
        <Skeleton variant="rounded" height={30} />
        <Skeleton variant="rounded" height={60} />
        <Skeleton variant="rounded" height={120} />
      </Stack>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Title>{`${data?.title} | Post Update`}</Title>

      <Typography variant="h2" component="h2">
        Update Post
      </Typography>
      <Divider sx={{ mb: 4, mt: 1 }} />

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        sx={{ display: "flex", flexDirection: "column", mb: 3 }}
      >
        <Stack direction="column" spacing={4}>
          <TextField
            id="outlined-basic"
            label="Write your post title"
            variant="outlined"
            required
            sx={{ mb: 1 }}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Write your post body"
            variant="outlined"
            required
            sx={{ mb: 1 }}
            value={body}
            multiline
            rows={5}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          />
          <Button type="submit">Update Post</Button>
        </Stack>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </>
  );
};

export default PostCreate;
