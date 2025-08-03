import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-red-600">Oops!</h1>
      <p className="mt-2">Something went wrong.</p>
      <p className="mt-4 text-gray-500">
        {error.statusText || error.message}
      </p>
    </div>
  );
};

export default ErrorPage;