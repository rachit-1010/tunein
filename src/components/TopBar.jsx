import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faCirclePause } from "@fortawesome/free-solid-svg-icons";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SearchPanel from "./SearchPanel";

export default function TopBar({ state, dispatch }) {

	const { logout, username } = useAuth();

	const { page } = useParams();

	const onClickBigPlayButton = () => {
		if (state.currentPlayingSection !== state.currentSection) {
			dispatch({type:'setCurrentPlayingSection', payload:state.currentSection})
			if (state.currentSection === "All Saved Songs") {
				dispatch({type:'setCurrentSongIndex', payload:0})
			}
			else if (typeof state.paramPage === "number") {
				dispatch({type:'setCurrentSongIndex', payload:state.playlistList[state.paramPage].songs[0]})
			}
		}
	}

	const shuffleClick = () => {
		dispatch({type:'shuffleSongs'})
		dispatch({type:'setModalContent', payload:'Songs shuffled and Added to queue'});
		dispatch({type:'setShowModal', payload:true});
		dispatch({type:'nextSong'})
	}

	useEffect(() => {
		// convert page to an integer if it is a string
		if (!isNaN(page)) {
			dispatch({type:"setParamPage", payload:parseInt(page)})
		} else {
			dispatch({type:"setParamPage", payload:page})
		}
		if (page === 'queue') {
			dispatch({type:'setCurrentSection', payload:'Queue'})
		} else if (page === 'search') {
			dispatch({type:'setCurrentSection', payload:'Search'})
		} else if (page === 'saved_songs') {
			dispatch({type:'setCurrentSection', payload:'All Saved Songs'})
		} else if (state.playlistList[page]){
			dispatch({type:'setCurrentSection', payload:state.playlistList[page].playlistName})
		}

	}, [page])

	return (
		state.isMainView && 
		<>
			{/* hamburger menu button for mobile view */}
			<div className="lg:hidden fixed top-20 left-5 z-10" onClick={()=>dispatch({type:'setIsMainView', payload:false})}>
				<FontAwesomeIcon icon={faBars} size="2x" style={{ color: 'var(--text-color-primary)'}} className="cursor-pointer hover:scale-110 duration-200"/>
			</div>
			
			<div className="top-bar fixed top-0 left-0 lg:left-64 right-0 h-32 lg:h-24 topbar-bg flex flex-col lg:flex-row gap-2 lg:gap-6 text-color-primary items-end pb-4 ps-16 lg:m-2 rounded-t-lg">
				{/* Playlist name */}
				{ page!== 'search' ?
					<>
					<div className="max-w-80">
						<div className="text-3xl lg:text-4xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
							{/* Slow Mornings slow slow */}
							{state.currentSection}
						</div>
					</div>
					<div className="mr-6 lg:mr-0">
						{/* play button */}
						{!(state.YTPlayerState === 1 && state.currentPlayingSection === state.currentSection) && <FontAwesomeIcon icon={faCirclePlay} size="3x" style={{ color: 'var(--text-color-highlight)' }} className="cursor-pointer hover:scale-110 duration-200 mx-3" onClick={() => {dispatch({type:"togglePlayPause"}); onClickBigPlayButton()}}/>}
						{(state.YTPlayerState === 1 && state.currentPlayingSection === state.currentSection) && <FontAwesomeIcon icon={faCirclePause} size="3x" style={{ color: 'var(--text-color-highlight)' }} className="cursor-pointer hover:scale-110 duration-200 mx-3" onClick={() => {dispatch({type:"togglePlayPause"})}}/>}
						{/* Shuffle button - shown only if currentSection == some Playlist*/}
						{ (typeof state.paramPage === "number") &&
							<FontAwesomeIcon icon={faShuffle} size="3x" style={{ color: 'var(--text-color-highlight)'}} className="cursor-pointer hover:scale-110 duration-200 mx-3" onClick={shuffleClick}/>
						}	
					</div>
					</> : 
					<SearchPanel state={state} dispatch={dispatch}/>
				}

				<div className="self-end flex-grow text-right me-8 hidden lg:block">
					<button className="p-2  whitespace-nowrap rounded-md text-color-secondary leading-none bg-color-secondary" onClick={logout}>
						<div>Hi, {username}!</div>
						<div><span className="text-red-400">Logout?</span></div>
					</button>
				</div>
			</div>
		</>
	)
}