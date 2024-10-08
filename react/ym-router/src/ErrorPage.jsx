import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <div>
            <h1> We havent decided about this page yet or doesnt even think about it</h1>
            <Link to="/">
                For now go back
            </Link>
        </div>
    )
}

export default ErrorPage;