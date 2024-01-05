import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faCirclePause } from "@fortawesome/free-regular-svg-icons";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

export default function TopBar() {
	return (
		<div className="top-bar fixed top-0 left-64 right-0 h-24 bg-slate-700 flex gap-6 text-slate-50 items-end pb-4 ps-16 m-2 rounded-t-lg">
			{/* Playlist name */}
			<div>
				<div className="text-4xl font-bold max-w-1/2">
					Slow Mornings
				</div>
				<div className="font-semibold leading-none text-right mr-4">
					31 songs • 2 hr 15 min
				</div>
			</div>
			{/* play button */}
			<FontAwesomeIcon icon={faCirclePlay} size="3x" color="green" className="cursor-pointer hover:scale-110 duration-200"/>
			{/* Shuffle button */}
			<FontAwesomeIcon icon={faShuffle} size="3x" color="green" className="cursor-pointer hover:scale-110 duration-200"/>
			


		</div>
	)
}