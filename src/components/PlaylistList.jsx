import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PlaylistList({state, dispatch}) {

	const { token } = useAuth();

	function newPlaylist(e) {
		e.preventDefault();
		const newPlaylistName = e.target[0].value;
		console.log(newPlaylistName, token);
		e.target[0].value = "";
		fetch(`${state.backendURL}/createPlaylist`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": token,
			},
			body: JSON.stringify({
				"playlistName": newPlaylistName,
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				dispatch({type:'createPlaylist', payload:newPlaylistName})
			}
		})
	}

	return (
		<>
			<div className="border-b-2 border-gray-600 pb-2">
				{state.playlistList  && 
					state.playlistList.map((playlist, index) => {
						const isSelected = state.paramPage === index ? true : false;
						return (
							<PlaylistItem index={index} name={playlist.playlistName} numSongs={playlist.numSongs} dispatch={dispatch} selected={isSelected}/>
						)
					})
				}
			</div>
			{/* add playlist button */}
			<div className="cursor-pointer py-4">
				<div className="text-xl text-left text-color-primary">
					<form onSubmit={newPlaylist}>
					<input type="text" placeholder="New Playlist" className="bg-transparent border-b-2 border-color-primary text-color-primary focus:outline-none focus:border-color-highlight w-full"/>
					</form>
				</div>
			</div>
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