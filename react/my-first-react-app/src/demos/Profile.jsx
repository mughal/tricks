import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
    return (
      <img
        className="avatar"
        src={getImageUrl(person)}
        alt={person.name}
        width={size}
        height={size}
      />
    );
  }
  
  // function Profile({ person, size, isSepia, thickBorder }) {
  //   return (
  //     <div className="card">
  //       <Avatar
  //         person={person}
  //         size={size}
  //         isSepia={isSepia}
  //         thickBorder={thickBorder}
  //       />
  //     </div>
  //   );
  // }
  
  // Both functions above and below are same, below is more concise

  // function Profile(props) {
  //   return (
  //     <div className="card">
  //       <Avatar {...props} />
  //     </div>
  //   );
  // }

export default function Profile() {
return (
    <Avatar
      person= {{ name: 'Lin Lanying', imageId: '1bX5QH6'}}
      size = {100} 
    />
);
}
  