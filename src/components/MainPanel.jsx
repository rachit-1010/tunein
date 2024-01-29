import React, { useEffect, useState } from "react";
import SongItem from "./SongItem";
import { useParams } from "react-router-dom";
import SearchResults from "./SearchResults";

export default function MainPanel({ state, dispatch}) {
	const { page } = useParams();
	return (
	(state.isMainView &&  page !== 'search') ?
		<div className="MainPanel fixed top-32 lg:top-24 bottom-24 left-0 lg:left-64 right-0 text-color-secondary bg-color-primary py-4 lg:mt-2 lg:ms-2 flex flex-col lg:rounded-b-lg">
			<SongListHeader />
			<div className="overflow-y-scroll ScrollCSS w-full">
				{
					state.currentSongList.map((currentIndex, index) => {
						const song = state.allSongs[currentIndex];

						return (
							<SongItem
								key={index+1}
								id={index+1}
								songIndex={currentIndex}
								name={song.title}
								album={song.album}
								duration={song.duration}
								selected={state.currentSongIndex === currentIndex}
								state={state}
								dispatch={dispatch}
							/>
						)
					})
				}
			</div>
		</div> :
		(state.isMainView && <SearchResults state={state} dispatch={dispatch}/>)
		
	)
}

function SongListHeader() {
	return (
		<div className="flex space-x-1 lg:space-x-2 border-b-2 border-slate-700 lg:px-4 py-1 me-2">
			<div className="w-8 text-right hidden lg:block">#</div>
			<div className="w-3/5 lg:w-1/3 ps-1 lg:ps-2">Title</div>
			<div className="w-1/5 hidden lg:block">Album</div>
			<div className="w-20 text-center hidden lg:block">Duration</div>
			<div className="w-4 lg:flex-grow"></div>
			<div className="text-left w-1/6">Options</div>
		</div>
	)
}

