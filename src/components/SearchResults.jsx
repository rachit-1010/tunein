import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./AuthContext";

export default function SearchResults({ state, dispatch }) {
	const { token } = useAuth();
	const [ searchResults, setSearchResults ] = useState([]);
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	  });
	
	
	  useEffect(() => {
		const handleResize = () => {
		  setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		  });
		};
	
		window.addEventListener("resize", handleResize);
	
		return () => {
		  window.removeEventListener("resize", handleResize);
		};
	  }, []);

	const [inFocusSong, setInFocusSong] = useState(-1);

	useEffect(() => {
		if (state.searchQuery !== "") {
			console.log(state.searchQuery);
			fetch(`${state.backendURL}/searchSongYT`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					searchQuery: state.searchQuery
				})
			})
				.then(res => res.json())
				.then(data => {
					console.log(data);
					setSearchResults(data["items"]);
				})
		}
	}, [state.searchQuery])

	const addNewSong = (title, album, duration ,videoId) => {
		const body = {
			title: title,
			album: album,
			duration: duration,
			videoId: videoId
		}
		fetch(`${state.backendURL}/addSong`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": token,
			},
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.success) {
					dispatch({type:'addSong', payload:body});
					dispatch({type:'setModalContent', payload:'Song added'});
					dispatch({type:'setShowModal', payload:true});
				}
			})
	}

	return (
		<div className="MainPanel fixed top-32 lg:top-24 bottom-24 left-0 lg:left-64 right-0 text-color-secondary bg-color-primary py-4 lg:mt-2 lg:ms-2 lg:rounded-b-lg overflow-y-scroll ScrollCSS">
			{state.searchQuery !=="" && <div className="text-2xl text-center text-color-secondary border-b-2 border-slate-700 pb-2">Select the right song!</div>}
			{
				searchResults.map((song, index) => {
					return (
						<div className="py-8 my-4 px-4 lg:px-24 w-fit mx-auto bg-color-secondary cursor-pointer rounded-md" onClick={() => setInFocusSong(index)}>
							{/* embed the video here */}
							<YouTube
								videoId={song["id"]["videoId"]}
								opts={{
									width: windowSize.width > 1000 ? "600" : windowSize.width * 0.8,
									height: windowSize.width > 1000 ? "300" : (windowSize.width * 9 * 0.8) / 16,
								}}

							/>
							{index === inFocusSong &&
								<div className="text-center mt-6">
									<form onSubmit={(e) => {
										e.preventDefault();
										addNewSong(e.target.title.value, e.target.album.value, e.target.duration.value, song["id"]["videoId"])
									}}>
										<label htmlFor="title" className="w-1/8"><div className="w-1/2 mx-auto text-left">Title</div></label>
										<input type="text" id="title" className="w-1/2 mb-4 outline-none text-black px-4 py-1 rounded-md" placeholder="Waka Waka"/>

										<label htmlFor="album" className="w-1/8"><div className="w-1/2 mx-auto text-left">Album</div></label>
										<input type="text" id="album" className="w-1/2 mb-4 outline-none text-black px-4 py-1 rounded-md" placeholder="Shakira"/>

										<label htmlFor="duration" className="w-1/8"><div className="w-1/2 mx-auto text-left">Duration</div></label>
										<input type="text" id="duration" className="w-1/2 outline-none text-black px-4 py-1 rounded-md" placeholder="3:31"/>

										<div className="px-2 py-2 mt-4 w-fit mx-auto text-xl rounded-md bg-color-primary">
											<FontAwesomeIcon icon={faCloudArrowDown} size="lg" />
											<button className="ms-4">Add to Saved Songs</button>
										</div>
									</form>
								</div>
							}
						</div>
					)
				})
			}

		</div>
	)
	
}