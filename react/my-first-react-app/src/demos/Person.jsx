import { useState } from 'react';
export default function Person(){
    const [person, setPerson] = useState({ name: "Qutab", age: 50});

    // Bad Don't do this 
    // const handleIncreaseAge = () => {
    //     // mutating the current state object
    //     person.age = person.age + 1;
    //     setPerson(person);
    
    // }

    // Good - Do this
    const handleIncreaseAge = () => {
        console.log("in handleIncreaseAge (before setPerson call): ", person);
        // copy the existing object and then set age

        const newPerson = {...person, age: person.age + 1};
        setPerson(newPerson);
        console.log("in handleIncreaseAge (after setPerson call): ", person);
    }

    console.log("during render: ", person);

    return (
        <>
            <h1> {person.name} </h1>
            <h2> {person.age} </h2>
            <button onClick={handleIncreaseAge}> Increase Age</button>

        </>
    )
}
