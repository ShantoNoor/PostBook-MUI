import { Helmet } from "react-helmet-async";

const Title = ({ children }) => {
  return (
    <Helmet>
      <title>{children} | PostBook</title>
    </Helmet>
  );
};

export default Title;
