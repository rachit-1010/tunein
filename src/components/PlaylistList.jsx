import React from "react";

export default function PlaylistList({dispatch}) {
	return (
		<>
			<PlaylistItem name="Liked Songs 💚" numSongs={100} dispatch={dispatch}/>
			<PlaylistItem name="My Playlist" numSongs={5} dispatch={dispatch} />
			<PlaylistItem name="Slow Mornings" numSongs={10} dispatch={dispatch} />
			<PlaylistItem name="Slow Mornings" numSongs={10} dispatch={dispatch} />
			<PlaylistItem name="Slow Mornings" numSongs={10} dispatch={dispatch} />
			<PlaylistItem name="Slow Mornings" numSongs={10} dispatch={dispatch} />
			<PlaylistItem name="Slow Mornings" numSongs={10} dispatch={dispatch} />
			<PlaylistItem name="Old" numSongs={27} dispatch={dispatch}/>
			<PlaylistItem name="Long Long long name" numSongs={14} dispatch={dispatch}/>
		</>
	)
}

function PlaylistItem({name, numSongs, dispatch}) {
	function switchToMainView() {
		dispatch({type:'setIsMainView', payload:true});
	}

	return (
		<div className="cursor-pointer hover:bg-color-secondary rounded-md" onClick={switchToMainView}>
			<div className="text-xl text-left ps-4 text-color-primary">
				{name}
			</div>
			<div className="text-sm text-left ps-8 pb-2 leading-none">
				{numSongs} songs
			</div>
		</div>
	)
}