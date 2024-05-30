import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Stack } from "@mui/material";

export default function PostCard({ post, cursor = false }) {
  const navigate = useNavigate();

  return (
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

        {post?.comments && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h5">
              Comments
            </Typography>
            <Divider sx={{ mb: 2, mt: 1 }} />

            <Stack direction="column" spacing={2}>
              {post.comments.map((comment, idx) => (
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
  );
}
