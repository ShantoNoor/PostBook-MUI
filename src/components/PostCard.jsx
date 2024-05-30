import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ cursor: "pointer", height: "100%" }}
      onClick={() => navigate(`/post-details/${post.id}`)}
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
      </CardContent>
    </Card>
  );
}
