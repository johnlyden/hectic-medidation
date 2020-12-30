import * as React from 'react';
import { Link } from 'gatsby';

// markup
const NotFoundPage = () => {
  return (
    <div style={{ margin: '64px' }}>
      <p>page doesn't exist</p>
      <Link to='/'>Go home</Link>
    </div>
  );
};

export default NotFoundPage;
