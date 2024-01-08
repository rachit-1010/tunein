import React from "react";
import { useState, useEffect } from 'react';


export default function ModalCmp({content, closeFn}) {

	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(true);
		const timerId = setTimeout(() => {
			setShow(false);
			closeFn();
		}
		, 2000);

		return () => {
			clearTimeout(timerId);
			closeFn();
		}

	}, []);


	return (
		<>
			{show && <div className="fixed bottom-28 w-full">
				<div className="w-fit mx-auto bg-green-400 z-10 px-3 py-2 border-none rounded-2xl">
					{content}
				</div>
			</div>}
		</>
	)
}