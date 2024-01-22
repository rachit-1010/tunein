import React, {useEffect, useReducer} from "react";

const initialState = {
	showModal: false,
  	modalContent: "",
  	isMainView: true,
	showVideo: false,
	allSongs: [],
	currentSongIndex: 0, //global index - based on the allSongs list
	currentSection: "All Saved Songs", //to show at the TopBar
	currentSongList: [], // to display in the mainpanel
	currenPlayingSection:"All Saved Songs", // to decide the nextSong
	queue: [],
	playlistList: [],
	YTPlayer: null,
	YTPlayerState: null,
	
}

const reducer = (state, action) => {
	switch(action.type) {
		case "setShowModal":
			return {...state, showModal: action.payload}
		case "setModalContent":
			return {...state, modalContent: action.payload}
		case "setIsMainView":
			return {...state, isMainView: action.payload}
		case "setAllSongs":
			return {...state, allSongs: action.payload}
		case "setCurrentSongIndex":
			return {...state, currentSongIndex: action.payload}
		case "toggleShowVideo":
			return {...state, showVideo: !state.showVideo}
		case "setYTPlayer":
			return {...state, YTPlayer: action.payload}
		case "playSong":
			console.log("playSong", state.currentSongIndex)
			if (state.YTPlayer) {
				state.YTPlayer.playVideo()
			}
			return state
		case "togglePlayPause":
			if (state.YTPlayer) {
				if (state.YTPlayer.getPlayerState() === 1) {
					state.YTPlayer.pauseVideo()
				} else {
					state.YTPlayer.playVideo()
				}
			}
			return state
		case "nextSong":
			if (state.queue.length > 0) {
				return {...state, currentSongIndex: state.queue[0], queue: state.queue.slice(1)}
			}
			// if there is nothing in the queue, then 
			if (state.currentSongIndex < state.allSongs.length - 1) {
				return {...state, currentSongIndex: state.currentSongIndex + 1}
			} else {
				return state
			}
		case "prevSong":
			if (state.currentSongIndex > 0) {
				return {...state, currentSongIndex: state.currentSongIndex - 1}
			} else {
				return state
			}
		case "setYTPlayerState":
			return {...state, YTPlayerState: action.payload}
		case "setQueue":
			return {...state, queue: action.payload}
		case "addToQueue":
			return {...state, queue: [...state.queue, action.payload]}
		case "setCurrentSection":
			return {...state, currentSection: action.payload}
		case "setCurrentSongList":
			return {...state, currentSongList: action.payload}
		case "setPlaylistList":
			return {...state, playlistList: action.payload}
		case "setCurrentPlayingSection":
			return {...state, currentPlayingSection: action.payload}
		default:
			return state
	}
}

const useHooksLogic = () => {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		fetch("http://127.0.0.1:5000/getallsongs")
			.then(res => res.json())
			.then(data => {
				data = JSON.parse(data)
				dispatch({type: "setAllSongs", payload: data})
				// set currentSongList to [0,...,data.length-1]
				let currentSongList = []
				for (let i = 0; i < data.length; i++) {
					currentSongList.push(i)
				}
				dispatch({type: "setCurrentSongList", payload: currentSongList})
			})
		
		fetch("http://127.0.0.1:5000/getallplaylists")
			.then(res => res.json())
			.then(data => {
				data = JSON.parse(data)
				dispatch({type: "setPlaylistList", payload: data})
			})
	}, [])

	useEffect(() => {
		if (state.currentSection === "All Saved Songs") {
			dispatch({type: "setCurrentSongList", payload: [...Array(state.allSongs.length).keys()]})
		} else if (state.currentSection === "Queue") {
			dispatch({type: "setCurrentSongList", payload: state.queue})
		} else if (typeof state.currentSection === "number") {
			dispatch({type: "setCurrentSongList", payload: state.playlistList[state.currentSection].songs})
		}
	}, [state.currentSection])

	return [state, dispatch]
}

export default useHooksLogic
