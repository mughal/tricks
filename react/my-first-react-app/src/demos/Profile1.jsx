import { Outlet } from "react-router-dom";
const Profile1 = () => {
    return (
        <div>
            <h1> Hello From profile page</h1>
            <p> Hope you are well</p>
            <hr />
            <h2>The profile visited is here:</h2>
            <Outlet />
        </div>
    );
}
export default Profile1;