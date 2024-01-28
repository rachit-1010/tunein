import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function SongItem({ id, name, songIndex, album, duration, selected, state, dispatch}) {

	const { token } = useAuth();
	const { page } = useParams();
	const [isFocused, setIsFocused] = useState(false);

	// check if the songIndex is in the likedSongs list
	const [isLiked, setIsLiked] = useState(state.playlistList[0].songs.includes(songIndex));

	function toggleLike() {
		if (isLiked) {
			removeSongFromPlaylist(songIndex, 0);
		} else {
			addSongToPlaylist(songIndex, 0);
		}
		setIsLiked(!isLiked);
	}

	function handleModal() {
		dispatch({type:'setModalContent', payload:'Added to queue'});
		dispatch({type:'setShowModal', payload:true});
	}

	function onSongClick() {
		dispatch({type:'setCurrentSongIndex', payload:songIndex})
		if (state.currentSongIndex === 0) {
			dispatch({type:'playSong'})
		}
		dispatch({type:"setCurrentPlayingSection", payload: state.currentSection})
	}

	function addSongToPlaylist(songIndex, playlistIndex) {
		fetch(`${state.backendURL}}/addSongToPlaylist`, {
				method: "POST",
				headers: {
					"Authorization": token,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					playlistName: state.playlistList[playlistIndex].playlistName,
					songIndex: songIndex,
				})
			})
				.then(res => res.json())
				.then(data => {
					if (data.success) {
						// add the song from the playlistList
						dispatch({type:'addSongToPlaylist', payload:{songIndex:songIndex, playlistIndex:playlistIndex}});
						dispatch({type:'setModalContent', payload:'Song added to playlist'});
						dispatch({type:'setShowModal', payload:true});
					}
				})
	}

	function removeSongFromPlaylist(songIndex, playlistIndex) {
		fetch("http://127.0.0.1:5000/removeSongFromPlaylist", {
				method: "POST",
				headers: {
					"Authorization": token,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					playlistName: state.playlistList[playlistIndex].playlistName,
					songIndex: songIndex,
				})
			})
				.then(res => res.json())
				.then(data => {
					if (data.success) {
						dispatch({type:'removeSongFromPlaylist', payload:{songIndex:songIndex, playlistIndex:playlistIndex}});
						dispatch({type:'setModalContent', payload:'Song deleted from playlist'});
						dispatch({type:'setShowModal', payload:true});
					}
				})
	}

	return (
		<div 
			className={`flex space-x-1 lg:space-x-2 items-center lg:px-4 py-1 lg:py-3 rounded-md lg:mx-1 ${isFocused ? 'lg:bg-color-secondary' : ''}`}
			onMouseEnter={() => setIsFocused(true)}
			onMouseLeave={() => setIsFocused(false)}
		>
			<div className={`hidden lg:block w-8 text-right text-sm ${selected ? 'text-color-highlight' : 'text-color-secondary'}`}>{id}</div>
			<div className={`w-3/5 lg:w-1/3 text-lg lg:text-xl ps-1 lg:ps-2 flex flex-col ${selected ? 'text-color-highlight' : 'text-color-primary'}`} onClick={onSongClick}>
				<div>
					{name}
				</div>
				<div className='text-color-secondary text-xs lg:hidden'>
					{album} • {duration}
				</div>
			</div>
			<div className="w-1/5 hidden lg:block" onClick={onSongClick}>{album}</div>
			<div className="w-20 text-center hidden lg:block" onClick={onSongClick}>{duration}</div>
			<div className="lg:flex-grow text-center">
					<FontAwesomeIcon icon={solidHeart} style={{ color: 'var(--text-color-highlight)'}} className={`scale-125 cursor-pointer me-2 lg:me-0 ${isLiked ? 'inline' : 'hidden' } ${page==='saved_songs'?'':'invisible'}`} onClick={toggleLike}/>
					<FontAwesomeIcon icon={regularHeart} style={{ color: 'var(--text-color-highlight)'}} className={`hover:scale-125 cursor-pointer me-2 lg:me-0 ${ !isLiked ? 'inline' : 'hidden'} ${!isLiked&&isFocused ? 'lg:inline' : 'lg:hidden'} ${page==='saved_songs'?'':'invisible'}` } onClick={toggleLike}/>
			</div>
			<div className="text-left flex gap-8 items-center w-1/6 grow lg:grow-0">
				<div className="flex gap-3 items-center">
					<div className="relative inline-block hoverTextStyle">
						<button className="lg:hover:bg-slate-700 p-1 px-2 rounded-full text-xs " 
							onClick={() => {
								handleModal();
								dispatch({type:'addToQueue', payload:songIndex});
							}}
						>
							+<FontAwesomeIcon icon={faBars} />
						</button>
					</div>

					{page === 'saved_songs' ? 
					<div className="relative inline-block addPlBtn">
						<button className={`lg:hover:bg-slate-700 p-1 border-2 border-slate-700 text-xs ${isFocused?'':'lg:invisible'}`}>+Playlist</button>
						<div className="dropdown-content">
							{/* <a href="#">My Playlist</a>
							<a href="#">Slow Mornings</a>
							<a href="#">Old</a>
							<a href="#">Very very very long long name</a> */}
							{/* get the list of playlists from global state */}
							{state.playlistList.map((playlist, index) => {
								if (index !== 0){
									return (
										<a href="#" onClick={() => {
											addSongToPlaylist(songIndex, index);
										}}>{playlist.playlistName}</a>
									)
								}
							})}
						</div>
					</div> :
					<div className="relative inline-block">
						<button className={`lg:hover:bg-slate-700 p-2 text-xs rounded-md ${isFocused?'':'lg:invisible'}`} onClick={() => {
							removeSongFromPlaylist(songIndex, page);
						}}>
							<FontAwesomeIcon icon={faTrash} color='#b83737'/>
						</button>
					</div>
					}
					
				</div>
			</div>
		</div>
	)
}

