import Title from "../components/Title";

const PostDetails = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const { data: posts } = await axios.get(`/posts`);
        const { data: users } = await axios.get(`/users`);

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
  
  return (
    <>
      <Title>Post Details</Title>

      <div>PostDetails</div>
    </>
  );
};

export default PostDetails;
