import { Link } from "react-router-dom";

const Popeye = () => {
    return (
        <>
            <p>Hi, I am popeye! I love to eat spinach</p>
            <Link to="/"> Click here to go back</Link>
        </>
    );
};

export default Popeye;