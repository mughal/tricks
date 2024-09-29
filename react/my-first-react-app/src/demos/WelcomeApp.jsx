import { Link } from "react-router-dom";
const WelcomeApp = () => {
    return (
        <div>
            <h1> Hello from Welcome App</h1>
            <p> We will have few links</p>
            <nav>
                <ul>
                    <li> <Link to="profile"> Profile Page</Link></li>
                </ul>
            </nav>
        </div>
    )

}
export default WelcomeApp;