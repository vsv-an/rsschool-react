import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>Not Found 404</h1>
      <Link to="/">
        <h2>Home</h2>{' '}
      </Link>
    </>
  );
}

export default NotFound;
