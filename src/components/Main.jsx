import {useState,useEffect} from 'react'
import useSound from 'use-sound'
import play from '../assets/play.mp3' 
import correct from '../assets/correct.mp3' 
import wrong from '../assets/wrong.mp3' 

export default function Main({
	items,
	setGameOver,
	questionNumber,
	setQuestionNumber
}) {

	const [question, setQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [activeClass, setActiveClass] = useState('answer');
	const [gameStart] = useSound(play)
	const [correctAns] = useSound(correct)
	const [wrongAns] = useSound(wrong)

	useEffect(() => {
		gameStart()
	}, [gameStart])

	useEffect(() => {
		 setQuestion(items[questionNumber]);  
	}, [items,questionNumber]); 

	const delay = (duration, callback)=>{
		setTimeout(()=>{
			callback();
		},duration)
	}

	const handelClcik=(key,t,correct_answers)=>{
		setSelectedAnswer(t);
		setActiveClass('answer active');
		delay(3000,()=>{
			// if (correct_answers[key+'_correct']==='true') {
			// 	setActiveClass('answer correct')
			// } else{
			// 	setActiveClass('answer wrong')
			// }
			setActiveClass(correct_answers[key+'_correct']==='true' ? 'answer correct' : 'answer wrong')	 
		})
		delay(5000,()=>{
			if (correct_answers[key+'_correct']==='true') {
				correctAns();
				delay(1000,()=>{ 
					setQuestionNumber((prev) => prev + 1);
					setSelectedAnswer(null);
				});
			} else{
				wrongAns();
				delay(1000,()=>{ 
					setGameOver(true)
				});
			}
		})
		 
		console.log(correct_answers[key+'_correct']);
		// console.log(key);
		// console.log(t);
		// console.log(correct_answers);
	} 
	return (
		<div className="question__answer">
			<div className="question">
				{question?.question}
			</div>
			{
				question ? (
					<>
					<div className="answers">
						 {/*value={t[0]}*/}
						{ Object.entries(question.answers).map(([key, value]) => (
						    <div style={{display: value ? 'block' :'none'}} className={selectedAnswer === value ? activeClass : 'answer'} onClick={()=>handelClcik(key, value, question.correct_answers)} key={key}>{value}</div>
						)) };
						{/*{ Object.entries(question.answers).map((t,k) => <div className={selectedAnswer === t ? activeClass : 'answer'} onClick={()=>handelClcik(t)} style={{display: t[1] ? 'block' :'none'}} key={k} >{t[1]}</div>) }*/}
					 	{/*<div className= "answer" onClick={handelClcik}>{question.answers.answer_a}</div>
					 	<div className="answer" onClick={handelClcik}>{question.answers.answer_b}</div>
					 	<div className="answer" onClick={handelClcik}>{question.answers.answer_c}</div>
					 	<div className="answer" onClick={handelClcik}>{question.answers.answer_d}</div>*/}
					</div>
					</>
					):( 
						<h1 className="endText">Please wait...</h1>  
					)
			}
			
		</div>
	)
}