import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function PostCard({ post, cursor = false }) {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        sx={{ cursor: cursor ? "pointer" : "auto" }}
        onClick={() => cursor && navigate(`/post-details/${post.id}`)}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#F08" }} aria-label="recipe">
              {post.name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="Update Post">
              <EditIcon />
            </IconButton>
          }
          title={post.name}
          subheader={post.email}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.body}
          </Typography>

          {comments && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" component="h5">
                Comments
              </Typography>
              <Divider sx={{ my: 4, mt: 1 }} />

              <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
                <TextField
                  id="outlined-basic"
                  label="Add a comment"
                  variant="outlined"
                  name="comment"
                  required
                  sx={{ mb: 1 }}
                  value={comment}
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    setComments([
                      ...comments,
                      { body: comment, email: "shantonoor900@gmail.com" },
                    ]);
                    setComment("");
                    setOpen(true);
                  }}
                >
                  Add Comment
                </Button>
              </Box>

              <Stack direction="column" spacing={2}>
                {comments.map((comment, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      border: "1px solid",
                      borderRadius: "4px",
                      padding: 2,
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="p" component="p">
                      {comment.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {comment.body}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </CardContent>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message="Comment added successfully"
      />
    </>
  );
}
