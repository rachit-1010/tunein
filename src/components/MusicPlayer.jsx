import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";


export default function MusicPlayer({state, dispatch}) {

	return (
		<div className="bg-black fixed bottom-0 w-full h-24 flex items-center justify-between lg:justify-evenly">
			{/* Currently Playing Song*/}
			<div className="p-4 w-60 text-color-primary text-xl font-medium">
				{state.allSongs[state.currentSongIndex] && state.allSongs[state.currentSongIndex].title}
			</div>
			{/* Player Controls */}
			<div className="pb-2">
				{/* Buttons */}
				<div className="flex gap-5 lg:gap-8 my-3 px-8 lg:px-36 items-center">
					<FontAwesomeIcon icon={faBackwardStep} style={{ fontSize: '2rem' }} color="white" className="cursor-pointer hover:scale-125 duration-200" onClick={() => {dispatch({type:"prevSong"})}}/>
					{state.YTPlayerState !== 1 && <FontAwesomeIcon icon={faCirclePlay} size="3x" color="white" className="cursor-pointer hover:scale-125 duration-200" onClick={() => {dispatch({type:"togglePlayPause"})}}/>}
					{state.YTPlayerState === 1 && <FontAwesomeIcon icon={faCirclePause} size="3x" color="white" className="cursor-pointer hover:scale-125 duration-200" onClick={() => {dispatch({type:"togglePlayPause"})}}/>}
					{/* <FontAwesomeIcon icon={faCirclePause} size="2x"/> */}
					<FontAwesomeIcon icon={faForwardStep} style={{ fontSize: '2rem' }} color="white" className="cursor-pointer hover:scale-125 duration-200" onClick={() => {dispatch({type:"nextSong"})}}/>
				</div>

				{/* Progress bar - not implementing as of now because you can always use the YouTube Video Player*/}
				{/* <div className="hidden lg:block">
					<div style={{backgroundColor:"#4d4c4c"}}>
						<div className="h-1 w-1/4 bg-white"></div>
					</div>
					<div className="flex justify-between">
						<span className="text-color-primary">3:28</span>
						<span className="text-color-primary">5:14</span>
					</div>
				</div> */}

			</div>
			<div className="w-40 hidden lg:block">	
				{/* Dummy element just to align other elements in the flexbox */}
			</div>
		</div>
	)
	
}