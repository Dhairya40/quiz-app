import './app.css' 
import {useState, useEffect,useMemo} from 'react'
import Main from './components/Main'
import Timer from './components/Timer'
import Start from './components/Start'
function App() {

	const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
	const [gameOver, setGameOver] = useState(0);
	const [items, setItems] = useState([]);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
  const [earned, setEarned] = useState('Rs. 0');
  const [start, setStart] = useState('0');


  const restart = ()=>{
    setStart(Math.random());
    setUsername(null);
    setEarned('Rs. 0');
    setGameOver(false);
    setQuestionNumber(0);
    <Start setUsername={setUsername } />
  }

	useEffect(() => {
	    fetch("https://quizapi.io/api/v1/questions?apiKey=6VTUa1FKkNsYq5ydBuhtJSmDe1p5KaaAlB6C7dxP&limit=15")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          setIsLoaded(true); 
	          setItems(result);
	        }, 
	        (error) => {
	          setIsLoaded(true);
	          setError(error);
	        }
	      )
	  }, [start])
  useEffect(() => {
     questionNumber > 0 && setEarned('Rs. '+questionNumber*100);
     questionNumber === 15 && setGameOver(true);
  }, [items,questionNumber])
	
  

  return (
    <div className="app">
    {
      username ? (
        <>
          <div className="main">
           {
            gameOver ? 
            <h1 className="endText">Thanks {username}, You earned : {earned}
               <span onClick={restart} className="restartButton">Restart</span> 
            </h1> : (
              <>
                <div className="top">
                  <div className="timer"> 
                  <Timer 
                    setGameOver={setGameOver}
                    questionNumber={questionNumber}
                  />
                  </div>
                </div>
                <div className="bottom">
                  <Main
                  items ={items}
                  setGameOver ={setGameOver}
                  questionNumber ={questionNumber}
                  setQuestionNumber ={setQuestionNumber}
                   />
                 </div>
              </>
              )
           } 
          </div>
          <div className="pyramid">
            <ul className="moneyList ">
            {
              items.map((m,index)=>(
                <li className={questionNumber === index ? "moneyListItem active":"moneyListItem"}>
                    <span className='moneyListItemNumber'>{index + 1}</span>
                    <span className='moneyListItemAmount'>Rs. {index < 4 ? (index + 1) * 100 : (index + 1) * 200 }</span>
                </li> 
              ))
            }
              
            </ul>
          </div>
        </>

        ):<Start 
          setUsername ={ setUsername}
        />
    } 
    </div>
  );
}

export default App;
