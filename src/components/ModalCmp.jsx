import React from "react";
import { useEffect } from 'react';


export default function ModalCmp({content, showModal, setShowModal}) {


	useEffect(() => {
		if (!showModal) return;
		const timerId = setTimeout(() => {
			setShowModal(false);
		}
		, 2000);

		return () => {
			clearTimeout(timerId);
			setShowModal(false);
		}

	}, [showModal]);


	return (
		<>
			{showModal &&
			<div className="fixed bottom-36 lg:bottom-28 w-full">
				<div className="w-fit mx-auto bg-green-400 z-10 px-3 py-2 border-none rounded-md">
					{content}
				</div>
			</div>}
		</>
	)
}