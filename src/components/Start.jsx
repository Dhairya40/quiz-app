import React,{useRef} from 'react'

export default function Start({setUsername}) {
	const inputRef = useRef();
	const handelClick = ()=>{
		inputRef.current.value && setUsername(inputRef.current.value);
	}
	return (
		<div className="start">
			<input placeholder="Enter You Name" className="startInput" ref={inputRef} />
			<button className="startButton" onClick ={handelClick}>Start</button>
		</div>
	)
}