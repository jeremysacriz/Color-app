import { useEffect, useState } from "react";
import './App.css';

const getRandomColor = () => {
  const digits = [
    '0', 
    '1', 
    '2', 
    '3', 
    '4', 
    '5', 
    '6', 
    '7', 
    '8', 
    '9', 
    'A', 
    'B', 
    'C', 
    'D', 
    'E', 
    'F'
  ] // array of hexadecimal values to create hex colors

  const color = new Array(6)
  .fill('') // changes all elements in an array to a static value, from a start index to an end index
  .map(() => digits[Math.floor(Math.random() * digits.length)]) // returns a random array of digits from the digits array
  .join("") // converts the array of digits into a string

  return `#${color}`
}

function App() {
  const [color, setColor] = useState('black') // Dynamically changes elements in the DOM, the value passed in useState is the initial state of the component
  const [answers, setAnswers] = useState([]) // default value is an empty array
  const [result, setResult] = useState()

  const generateColors = () => {
    const actualColor = getRandomColor()
    setColor(actualColor)
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.1 - Math.random()
      )
    ) // displays an array of hexadecimal colors as buttons in a random order
  }

  useEffect(() => { // tells React that the component needs to do something after rendering to the DOM
    generateColors(); // React remembers this function & calls it later after updating the DOM
  }, []) 
  // The code runs the first time the component mounts if we pass a dependency array ([])
  // If the dependency array doesn't exist the first function argument runs every time the component re-renders

  const handleAnswerClick = (answer) => { // Updates the DOM after an option is chosen
    if (answer === color) {
      setResult(true); // passes a boolean 'true'
      generateColors(); // Generates a random color & three hexadecimal colors to pick from
    } else {
      setResult(false); // passes a boolean 'false'
    }
  }

  return ( // JSX
    <div className="App">
      <div className="app-container" style={{ background: color }}></div>
      <div className="guess-me">
        {answers.map(answer => (
          <button 
          onClick={() => handleAnswerClick(answer)}
          key={answer}
          >
            {answer}
          </button>
        ))}
      </div>
      <div>{result === false && <div className="wrong">Wrong Answer</div>}</div> {/* If wrong answer is chosen, this is displayed */}
      <div>{result === true && <div className="correct">Correct!</div>}</div> {/* If correct answer is chosen, this is displayed */}
    </div>
  );
}

export default App;
