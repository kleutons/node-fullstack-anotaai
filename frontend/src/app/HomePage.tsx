import { Link } from "react-router";

export default function HomePage(){
    return(
        <>
            <h1>Home Page</h1>
            <Link to={'/login'}>Página de login</Link>
        </>
    )
}