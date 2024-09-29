function ListItem(props) {
    return <li>{props.animal}</li>
  }
  
  function List(props) {
    return (
      <ul>
        {props.animals.map((animal) => {
          return animal.startsWith("L") ? <li key={animal}>{animal}</li> : null;  
        //   return <ListItem key={animal} animal={animal} />;
        })}
      </ul>
    );
  }
  
  export default function AnimalProps() {
    const animals = ["Lion", "Cow", "Snake", "Lizard", "Props", "Example"];
  
    return (
      <div>
        <h1>Animals: </h1>
        <List animals={animals} />
      </div>
    );
  }
  

/**   

This component accepts a props which is an object containing the animals that we defined as a property when we wrote <List animals={animals} />. Do note that you can name it anything, for example, <List animalList={animals} />. You will still need to pass the animals to the property, but now you will use props.animalList instead of props.animals 

*/