import React, {useEffect, useReducer} from "react";
import { useAuth } from './components/AuthContext';



const initialState = {
	showModal: false,
  	modalContent: "",
  	isMainView: true,
	showVideo: false,
	allSongs: [],
	currentSongIndex: 0, //global index - based on the allSongs list
	currentSection: "All Saved Songs", //to show at the TopBar - more like currentDisplaySection
	paramPage: "saved_songs", 
	currentSongList: [], // to display in the mainpanel - again more like currentDisplaySongList - not the playing list
	currentPlayingSection: [], // to decide the nextSong
	queue: [],
	playlistList: [],
	YTPlayer: null,
	YTPlayerState: null,
	searchQuery: ""
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
			if (state.currentPlayingSection === "All Saved Songs") {
				if (state.currentSongIndex < state.allSongs.length - 1) {
					return {...state, currentSongIndex: state.currentSongIndex + 1}
				} 
			}
			else if (state.currentPlayingSection !== "Queue" && state.currentPlayingSection !== "All Saved Songs") {
				console.log("playing next song in the playlist")
				let index = -1
				for (let i = 0; i < state.playlistList[state.paramPage].songs.length; i++) {
					if (state.playlistList[state.paramPage].songs[i] === state.currentSongIndex) {
						index = i
						break
					}
				}
				console.log("index", index)
				if (index < state.playlistList[state.paramPage].songs.length - 1) {
					console.log("next song index", index + 1, state.playlistList[state.paramPage].songs[index + 1])
					return {...state, currentSongIndex: state.playlistList[state.paramPage].songs[index + 1]}
				}
			}

			return state

		case "prevSong":
			if (state.queue.length > 0) {
				return state
			} else if (state.currentPlayingSection === "All Saved Songs") {
				if (state.currentSongIndex > 0) {
					return {...state, currentSongIndex: state.currentSongIndex - 1}
				}
			} else if (state.currentPlayingSection !== "Queue" && state.currentPlayingSection !== "All Saved Songs") {
				let index = -1
				for (let i = 0; i < state.playlistList[state.paramPage].songs.length; i++) {
					if (state.playlistList[state.paramPage].songs[i] === state.currentSongIndex) {
						index = i
						break
					}
				}
				if (index > 0) {
					return {...state, currentSongIndex: state.playlistList[state.paramPage].songs[index - 1]}
				}
				
			}
			return state

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
		case "setParamPage":
			return {...state, paramPage: action.payload}
		case "shuffleSongs":
			// add songs from currentSection to the queue and shuffle the queue
			let newQueue = []
			if (typeof state.paramPage === "number") {
				newQueue = [...state.playlistList[state.paramPage].songs]
			}
			// shuffle the queue
			for (let i = newQueue.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[newQueue[i], newQueue[j]] = [newQueue[j], newQueue[i]];
			}
			return {...state, queue: newQueue}
		case "createPlaylist":
			// create an empty playlist with the given name and add it to the playlistList
			const newPlaylist = {
				playlistName: action.payload,
				songs: [],
				numSongs: 0,
				totalDuration: "0 h 0 min"
			}
			return {...state, playlistList: [...state.playlistList, newPlaylist]}
		case "addSongToPlaylist":
			const newPlaylistList = [...state.playlistList]
			newPlaylistList[action.payload.playlistIndex].songs.push(action.payload.songIndex)
			newPlaylistList[action.payload.playlistIndex].numSongs += 1
			return {...state, playlistList: newPlaylistList}
		case "removeSongFromPlaylist":
			const newPlaylistList2 = [...state.playlistList]
			// find the index of the song in the playlist
			const index = newPlaylistList2[action.payload.playlistIndex].songs.indexOf(action.payload.songIndex)
			newPlaylistList2[action.payload.playlistIndex].songs.splice(index, 1)
			newPlaylistList2[action.payload.playlistIndex].numSongs -= 1
			return {...state, playlistList: newPlaylistList2}
		case "setSearchQuery":
			return {...state, searchQuery: action.payload}
		case "addSong":
			return {...state, allSongs: [...state.allSongs, action.payload]}
		default:
			return state
	}
}

const useHooksLogic = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { token, setUsername } = useAuth();
	// dispatch({type: "setToken", payload: token})

	useEffect(() => {
		console.log("useHooksLogic useEffect", token)
		if (token !== null) {

		async function getUserDetails () {
			if (token !== null) {
				await fetch ("http://127.0.0.1:5000/getlogininfo", {
					method: "GET",
					headers: {
					"Authorization": token
					}
				})
					.then(res => res.json())
					.then(data => {
					console.log(data)
					setUsername(data)
					})
					.catch(err => console.log())
			}
		}
		getUserDetails().then(() => {
		fetch("http://127.0.0.1:5000/getallsongs", {
			method: "GET",
			headers: {
				"Authorization": token
			}
		})
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
		
		fetch("http://127.0.0.1:5000/getallplaylists", {
			method: "GET",
			headers: {
				"Authorization": token
			}

		})
			.then(res => res.json())
			.then(data => {
				data = JSON.parse(data)
				dispatch({type: "setPlaylistList", payload: data})
			})
		})
		}
	}, [token])

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
