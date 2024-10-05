
// import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import Popeye from './Popeye.jsx'
import Spinach from './Spinach.jsx'
import DefaultProfile from './DefaultProfile.jsx'

const Profile = () => {
    const { name } = useParams();
    let profileComponent;
    switch (name) {
        case "popeye":
          profileComponent = <Popeye />;
          break;
        case "spinach":
          profileComponent = <Spinach />;
          break;
        default:
          profileComponent = <DefaultProfile />;
      }

    return (
        <div>
            <h1> Hello from profile page</h1>
            <p>so, how are you</p>
            <hr />
            <h2> Profile visited here:</h2>
            { profileComponent }
            {/* <Outlet /> */}
        </div>
    )
}

export default Profile;