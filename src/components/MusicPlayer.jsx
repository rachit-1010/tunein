import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";


export default function MusicPlayer() {
	return (
		<div className="bg-black fixed bottom-0 w-full h-24 flex items-center justify-evenly">
			{/* Currently Playing Song*/}
			<div className="p-4 text-color-primary text-xl font-medium">
				Khaabon Ke Parinday
			</div>
			{/* Player Controls */}
			<div className="pb-2">
				{/* Buttons */}
				<div className="flex gap-8 my-3 px-36 items-center">
					<FontAwesomeIcon icon={faBackwardStep} style={{ fontSize: '1.3rem' }} color="white" className="cursor-pointer hover:scale-125 duration-200"/>
					<FontAwesomeIcon icon={faCirclePlay} size="2x" color="white" className="cursor-pointer hover:scale-125 duration-200"/>
					{/* <FontAwesomeIcon icon={faCirclePause} size="2x"/> */}
					<FontAwesomeIcon icon={faForwardStep} style={{ fontSize: '1.3rem' }} color="white" className="cursor-pointer hover:scale-125 duration-200"/>
				</div>
				{/* Progress bar */}
				<div>
					<div style={{backgroundColor:"#4d4c4c"}}>
						<div className="h-1 w-1/4 bg-white"></div>
					</div>
					<div className="flex justify-between">
						<span className="text-color-primary">3:28</span>
						<span className="text-color-primary">5:14</span>
					</div>
				</div>

			</div>
			<div className="w-40">	
				{/* Dummy element just to align other elements in the flexbox */}
			</div>
		</div>
	)
	
}