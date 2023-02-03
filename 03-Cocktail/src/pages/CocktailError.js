import { Link, useRouteError } from "react-router-dom"

export default function CocktailError() {
    const error = useRouteError();

    return (
      <div>
        <h2>Error</h2>
        <p>{error.message}</p>
        <Link to="/cocktails">Back to Cocktails</Link>
      </div>
    )
  }