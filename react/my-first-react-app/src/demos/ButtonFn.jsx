// function Button({ text, color, fontSize }) {
//     const buttonStyle = {
//         color: color,
//         fontSize: fontSize + "px"
//     };

//     return <button style={buttonStyle}>{text}</button>
// }

// Button.defaultProps = {
//     text: "Click Me!",
//     color: "blue",
//     fontSize: 12
// };

// export default function  ButtonFn() {
//     return (
//         <div>
//             <Button />
//             <Button  text="Don't click Me" color="red" />
//             <Button fontSize={20} />

//         </div>
//     );
// }


function Button({ 
    text = "Click Me!", 
    color = "blue", 
    fontSize = 12, 
    handleClick
    }) {

    const buttonStyle = {
        color: color,
        fontSize: fontSize + "px"
    }

    return (
        <button onClick={() => handleClick('https://www.theodinproject.com')} style={buttonStyle}>
            {text}
        </button>
    );
}

export default function ButtonFn() {
    const handleButtonClick = (url) => {
        // window.location.href = "https://www.google.com";
        window.location.href = url;
    };

    return (
        <div>
            <Button handleClick={handleButtonClick}></Button>
        </div>
    )
}