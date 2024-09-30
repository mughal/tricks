const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
    const person = {
        name: 'Gregorio Y. Zara',
        theme: {
          backgroundColor: 'black',
          color: 'pink'
        }
      };
    return (
    // This doesn't quite work!
    <div style={person.theme}>
      <h1>{person.name}'s Todos {formatDate(today)}</h1>
        <img 
            src="https://i.imgur.com/yXOvdOSs.jpg" 
            alt="Hedy Lamarr" 
            class="photo"
        />
        <ul>
            <li>Invent new traffic lights </li>
            <li>Rehearse a movie scene </li>
            <li>Improve the spectrum technology </li>
        </ul>
    </div>
    );
}
  