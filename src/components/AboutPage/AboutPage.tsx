import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <>
      <Link to="/">
        <Typography>Home</Typography>
      </Link>
      <Typography variant="h2" variantMapping={{ h2: 'h1' }}>
        About
      </Typography>
      <Typography paragraph>This todo app is created by Peter Kristiansen.</Typography>
      <Link to="/">
        <Typography>Back to application</Typography>
      </Link>
    </>
  );
};

export default AboutPage;
