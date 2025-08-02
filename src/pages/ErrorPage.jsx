import { NavLink, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  // Optional chaining to safely access fields
  const status = error?.status || "Unknown error";
  const message = error?.data || error?.message || "Something went wrong.";

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Error Occurred</h1>
      <p>Status: {status}</p>
      <p>Message: {message}</p>
      <NavLink className="inline" to="/"><button>Go Home</button></NavLink>
    </div>
  );
};
