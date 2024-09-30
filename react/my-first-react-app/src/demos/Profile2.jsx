import { useParams } from "react-router-dom";
import DefaultProfile from "./DefaultProfile";
import Popeye from "./Popeye";
import Spinach from "./Spinach";
const Profile2 = () => {
    const { name } = useParams();
    return (
        <div>
            <h1> Hello From profile page</h1>
            <p> Hope you are well</p>
            <hr />
            <h2>The profile visited is here:</h2>
            { name === "popeye" ? (
                <Popeye />
            ): name === "spinach" ? (
                <Spinach />
            ): (
                <DefaultProfile />
            )
            }
        </div>
    );
}
export default Profile2;