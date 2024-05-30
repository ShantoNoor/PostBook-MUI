import {
  Box,
  Button,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Title from "../components/Title";
import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const PostCreate = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setMessage("Adding new post...");
    setOpen(true);

    const result = await axios.post("/posts", {
      title,
      body,
      userId: 101,
    });
    if (result.status === 201) {
      setMessage("Post added successfully!");
      setOpen(true);
      setTimeout(() => {
        setTitle("");
        setBody("");
        navigate("/");
      }, 1000);
    }
  };

  return (
    <>
      <Title>Create New Post</Title>

      <Typography variant="h2" component="h2">
        Create A New Post
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
        <Button type="submit">Add Post</Button>
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
