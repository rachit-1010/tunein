import React from "react";

export default function PlaylistList() {
	return (
		<>
			<PlaylistItem name="Liked Songs 💚" numSongs={100} />
			<PlaylistItem name="My Playlist" numSongs={5} />
			<PlaylistItem name="Slow Mornings" numSongs={10} />
			<PlaylistItem name="Slow Mornings" numSongs={10} />
			<PlaylistItem name="Slow Mornings" numSongs={10} />
			<PlaylistItem name="Slow Mornings" numSongs={10} />
			<PlaylistItem name="Slow Mornings" numSongs={10} />
			<PlaylistItem name="Old" numSongs={27} />
			<PlaylistItem name="Long Long long name" numSongs={14} />
		</>
	)
}

function PlaylistItem({name, numSongs}) {
	return (
		<div className="cursor-pointer hover:bg-gray-200 rounded-md">
			<div className="text-xl text-left ps-4">
				{name}
			</div>
			<div className="text-sm text-left ps-8 pb-2 leading-none">
				{numSongs} songs
			</div>
		</div>
	)
}