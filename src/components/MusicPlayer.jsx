import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faCirclePause } from "@fortawesome/free-regular-svg-icons";
import { faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";


export default function MusicPlayer() {
	return (
		<div className="bg-blue-950 fixed bottom-0 w-full h-24 flex items-center justify-evenly">
			{/* Currently Playing Song*/}
			<div className="p-4 text-slate-50 text-xl font-medium">
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
					<div className="bg-gray-300">
						<div className="h-1 w-1/4 bg-green-400"></div>
					</div>
					<div className="flex justify-between">
						<span className="text-slate-50">3:28</span>
						<span className="text-slate-50">5:14</span>
					</div>
				</div>

			</div>
			<div>	
				{/* Show Video button */}
				<button className="text-slate-50 p-4 border-2 m-4 ">
					Show Video
				</button>
			</div>
		</div>
	)
	
}