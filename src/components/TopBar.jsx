import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faCirclePause } from "@fortawesome/free-regular-svg-icons";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function TopBar() {
	return (
		<>
			{/* hamburger menu button for mobile view */}
			<div className="lg:hidden fixed top-20 left-5 z-10 ">
				<FontAwesomeIcon icon={faBars} size="2x" style={{ color: 'var(--text-color-primary)'}} className="cursor-pointer hover:scale-110 duration-200"/>
			</div>
			<div className="top-bar fixed top-0 left-0 lg:left-64 right-0 h-32 lg:h-24 topbar-bg flex flex-col justify-end lg:flex-row gap-2 lg:gap-6 text-color-primary items-end pb-4 ps-16 lg:m-2 rounded-t-lg">
				{/* Playlist name */}
				<div className="max-w-80">
					<div className="text-3xl lg:text-4xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
						Slow Mornings slow slow
					</div>
					<div className="font-semibold text-sm lg:text-base leading-none text-right mr-4">
						31 songs • 2 hr 15 min
					</div>
				</div>
				<div className="mr-6 lg:mr-0">
					{/* play button */}
					<FontAwesomeIcon icon={faCirclePlay} size="3x" style={{ color: 'var(--text-color-highlight)' }} className="cursor-pointer hover:scale-110 duration-200 mx-3"/>
					{/* Shuffle button */}
					<FontAwesomeIcon icon={faShuffle} size="3x" style={{ color: 'var(--text-color-highlight)'}} className="cursor-pointer hover:scale-110 duration-200 mx-3"/>
				</div>
				<div className="self-end flex-grow text-right me-8 hidden lg:block">
					<button className="text-color-primary p-4 border-2 whitespace-nowrap">
						Show Video
					</button>
				</div>


			</div>
		</>
	)
}