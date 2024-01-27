import React from "react";

export default function SearchPanel({ state, dispatch }) {
	const onFormSubmit = (e) => {
		e.preventDefault();
		console.log(e.target[0].value);
		dispatch({type:'setSearchQuery', payload:e.target[0].value})
		e.target[0].value = "";
	}

	return (
		<div>
			<form onSubmit={onFormSubmit}>
				<input type="text" className="w-96 h-10 rounded-3xl p-4 mb-2 outline-0 text-black" placeholder="Search Songs on Youtube"/>
			</form>
		</div>
	)
}