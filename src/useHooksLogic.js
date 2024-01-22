import React, {useEffect, useReducer} from "react";

const initialState = {
	showModal: false,
  	modalContent: "",
  	isMainView: true,
	allSongs: [],
	currentSongIndex: 0,
	showVideo: false,
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
			})
	}, [])

	return [state, dispatch]
}

export default useHooksLogic
