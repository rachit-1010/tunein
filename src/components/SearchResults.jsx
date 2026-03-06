import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { faPlus, faMagnifyingGlass, faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./AuthContext";

function decodeHtmlEntities(text) {
	const doc = new DOMParser().parseFromString(text, "text/html");
	return doc.documentElement.textContent;
}

export default function SearchResults({ state, dispatch }) {
	const { authFetch } = useAuth();
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [addedSongs, setAddedSongs] = useState({});
	const [editingIndex, setEditingIndex] = useState(-1);
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (state.searchQuery !== "") {
			setLoading(true);
			setEditingIndex(-1);
			setAddedSongs({});
			fetch(`${state.backendURL}/searchSongYT`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ searchQuery: state.searchQuery })
			})
				.then(res => res.json())
				.then(data => {
					setSearchResults(data["items"]);
					setLoading(false);
				})
				.catch(() => setLoading(false));
		}
	}, [state.searchQuery]);

	const addNewSong = (title, album, duration, videoId) => {
		const body = { title, album, duration, videoId };
		authFetch(`${state.backendURL}/addSong`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					dispatch({ type: 'addSong', payload: body });
					dispatch({ type: 'setModalContent', payload: 'Song added' });
					dispatch({ type: 'setShowModal', payload: true });
					setAddedSongs(prev => ({ ...prev, [videoId]: true }));
				}
			});
	};

	const toggleExpand = (e, index) => {
		e.stopPropagation();
		setEditingIndex(editingIndex === index ? -1 : index);
	};

	const videoWidth = windowSize.width > 1000 ? 480 : Math.min(windowSize.width * 0.85, 480);
	const videoHeight = videoWidth * 9 / 16;

	return (
		<div className="MainPanel fixed top-32 lg:top-24 bottom-24 left-0 lg:left-64 right-0 text-color-secondary bg-color-primary py-6 lg:mt-2 lg:ms-2 lg:rounded-b-lg overflow-y-scroll ScrollCSS">

			{/* Empty state */}
			{state.searchQuery === "" && searchResults.length === 0 && (
				<div className="flex flex-col items-center justify-center h-full opacity-40">
					<FontAwesomeIcon icon={faMagnifyingGlass} className="text-6xl mb-4" />
					<p className="text-xl">Search for songs on YouTube</p>
					<p className="text-sm mt-1">Use the search bar above to find and add songs</p>
				</div>
			)}

			{/* Loading state */}
			{loading && (
				<div className="flex flex-col items-center justify-center h-full">
					<FontAwesomeIcon icon={faSpinner} className="text-4xl animate-spin text-color-highlight mb-3" />
					<p className="text-sm">Searching YouTube...</p>
				</div>
			)}

			{/* Results header */}
			{!loading && state.searchQuery !== "" && searchResults.length > 0 && (
				<div className="px-6 lg:px-12 mb-6">
					<h2 className="text-xl text-color-primary font-semibold">
						Results for "<span className="text-color-highlight">{state.searchQuery}</span>"
					</h2>
					<p className="text-sm mt-1">Click + to review details and add to your library</p>
				</div>
			)}

			{/* Results */}
			{!loading && (
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 px-4 lg:px-12 pb-4">
					{searchResults.map((song, index) => {
						const videoId = song["id"]["videoId"];
						const title = decodeHtmlEntities(song["snippet"]?.["title"] || "Untitled");
						const channel = song["snippet"]?.["channelTitle"] || "";
						const duration = song["duration"] || "";
						const isAdded = addedSongs[videoId];

						return (
							<div
								key={videoId}
								className={`w-full rounded-lg overflow-hidden transition-all duration-300
									${editingIndex === index ? 'bg-color-highlight ring-1 ring-color-highlight' : 'bg-color-secondary hover:bg-color-highlight'}`}
							>
								{/* Video */}
								<div className="p-4 pb-2">
									<div className="rounded-md overflow-hidden mx-auto" style={{ width: videoWidth, maxWidth: '100%' }}>
										<YouTube
											videoId={videoId}
											opts={{ width: '100%', height: videoHeight }}
										/>
									</div>
								</div>

								{/* Song info + add button */}
								<div className="px-4 pb-4 flex items-center gap-3">
									<div className="flex-1 min-w-0">
										<p className="text-color-primary text-sm font-medium truncate">{title}</p>
										<p className="text-xs opacity-70 truncate">{channel}{duration ? ` · ${duration}` : ""}</p>
									</div>

									{/* Add / expand button */}
									<button
										onClick={(e) => !isAdded && toggleExpand(e, index)}
										className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all
											${isAdded
												? 'bg-color-green text-black cursor-default'
												: 'bg-color-green text-black hover:scale-110'}`}
										title={isAdded ? "Added" : "Add to library"}
									>
										<FontAwesomeIcon icon={isAdded ? faCheck : faPlus} />
									</button>
								</div>

								{/* Expanded edit form */}
								{editingIndex === index && (
									<div className="px-6 pb-5 pt-1">
										<div className="border-t border-gray-600 pt-4">
											<form onSubmit={(e) => {
												e.preventDefault();
												addNewSong(
													e.target.songTitle.value,
													e.target.album.value,
													e.target.duration.value,
													videoId
												);
												setEditingIndex(-1);
											}}>
												<div className="space-y-3">
													<div>
														<label htmlFor={`title-${index}`} className="text-xs uppercase tracking-wider text-color-secondary block mb-1">Title</label>
														<input
															type="text"
															id={`title-${index}`}
															name="songTitle"
															defaultValue={title}
															className="w-full bg-black bg-opacity-40 text-color-primary px-3 py-2 rounded-md outline-none border border-gray-600 focus:border-color-highlight transition-colors text-sm"
														/>
													</div>
													<div>
														<label htmlFor={`album-${index}`} className="text-xs uppercase tracking-wider text-color-secondary block mb-1">Artist / Album</label>
														<input
															type="text"
															id={`album-${index}`}
															name="album"
															defaultValue={channel}
															className="w-full bg-black bg-opacity-40 text-color-primary px-3 py-2 rounded-md outline-none border border-gray-600 focus:border-color-highlight transition-colors text-sm"
														/>
													</div>
													<div>
														<label htmlFor={`duration-${index}`} className="text-xs uppercase tracking-wider text-color-secondary block mb-1">Duration</label>
														<input
															type="text"
															id={`duration-${index}`}
															name="duration"
															defaultValue={duration}
															className="w-full bg-black bg-opacity-40 text-color-primary px-3 py-2 rounded-md outline-none border border-gray-600 focus:border-color-highlight transition-colors text-sm"
														/>
													</div>
												</div>
												<button
													type="submit"
													className="mt-4 w-full flex items-center justify-center gap-2 bg-color-green text-black font-semibold py-2.5 rounded-full hover:scale-105 transition-transform text-sm"
												>
													<FontAwesomeIcon icon={faPlus} />
													Add to Library
												</button>
											</form>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
