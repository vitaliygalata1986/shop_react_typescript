import { Link } from 'react-router-dom';
function Error() {
  return (
    <>
      <div>Error</div>
      <div>
        <Link to="/">Перейти на главную</Link>
      </div>
    </>
  );
}

export { Error };
