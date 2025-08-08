import React from "react";
import { useEffect } from 'react';


export default function ModalCmp({state, dispatch}) {


	useEffect(() => {
		if (!state.showModal) return;
		const timerId = setTimeout(() => {
			dispatch({type:'setShowModal', payload:false});
		}
		, 2000);

		return () => {
			clearTimeout(timerId);
			dispatch({type:'setShowModal', payload:false});
		}

	}, [state.showModal]);



	return (
		<>
			{state.showModal &&
			<div className="fixed bottom-36 lg:bottom-28 w-full">
				<div className="w-fit mx-auto bg-green-400 z-10 px-3 py-2 border-none rounded-md">
					{state.modalContent}
				</div>
			</div>}
		</>
	)
}