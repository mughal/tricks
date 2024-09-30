import { useEffect, useState } from "react";

export default function Clock1() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const key = setInterval(() => {
      setCounter(count => count + 1)
    }, 1000);

    return () => {
      clearInterval(key);
    };
  }, []);

  return (
    <p>{counter} seconds have passed.</p>
  );
}


// useEffect(() => {
//     // This runs after every render
//   });
  
//   useEffect(() => {
//     // This runs only on mount (when the component appears)
//   }, []);
  
//   useEffect(() => {
//     // This runs on mount *and also* if either a or b have changed since the last render
//   }, [a, b]);
  