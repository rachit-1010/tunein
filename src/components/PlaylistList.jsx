import React from "react";
import { Link } from "react-router-dom";

export default function PlaylistList({state, dispatch}) {
	return (
		<>
			{/* <PlaylistItem name="Liked Songs 💚" numSongs={100} dispatch={dispatch}/>
			<PlaylistItem name="My Playlist" numSongs={5} dispatch={dispatch} />
			<PlaylistItem name="Slow Mornings" numSongs={10} dispatch={dispatch} />
			<PlaylistItem name="Slow Mornings" numSongs={10} dispatch={dispatch} />
			<PlaylistItem name="Slow Mornings" numSongs={10} dispatch={dispatch} />
			<PlaylistItem name="Slow Mornings" numSongs={10} dispatch={dispatch} />
			<PlaylistItem name="Slow Mornings" numSongs={10} dispatch={dispatch} />
			<PlaylistItem name="Old" numSongs={27} dispatch={dispatch}/>
			<PlaylistItem name="Long Long long name" numSongs={14} dispatch={dispatch}/> */}

			{
				state.playlistList.map((playlist, index) => {
					const isSelected = state.paramPage === index ? true : false;
					return (
						<PlaylistItem index={index} name={playlist.playlistName} numSongs={playlist.numSongs} dispatch={dispatch} selected={isSelected}/>
					)
				})
			}
		</>
	)
}

function PlaylistItem({index, name, numSongs, dispatch, selected}) {
	function onPlaylistClick() {
		dispatch({type:'setCurrentSection', payload:index});
		dispatch({type:'setIsMainView', payload:true});
	}

	return (
		<Link to={`/${index}`}>
			<div className={`cursor-pointer ${selected ? "bg-color-highlight" : ""} hover:bg-color-secondary rounded-md`} onClick={onPlaylistClick}>
				<div className="text-xl text-left ps-4 text-color-primary">
					{name}
				</div>
				<div className="text-sm text-left ps-8 pb-2 leading-none">
					{numSongs} songs
				</div>
			</div>
		</Link>
	)
}