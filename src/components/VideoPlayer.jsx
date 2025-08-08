import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

export default function VideoPlayer({ state, dispatch }) {
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

  useEffect(() => {
	console.log("currentSongIndex:", state.currentSongIndex)
	if (state.YTPlayer) {
		console.log("loading video:", state.allSongs[state.currentSongIndex].videoId)
		if (state.YTPlayer) {
			state.YTPlayer.loadVideoById(state.allSongs[state.currentSongIndex].videoId)

		}
		state.YTPlayer.playVideo()
	}
  }, [state.currentSongIndex])

  const onReady = (event) => {
	dispatch({type:"setYTPlayer", payload:event.target})
	dispatch({type:"setYTPlayerState", payload:event.target.getPlayerState()})
  };

  const onStateChange = (event) => {
	// if (event.data === -1 || event.data === 5) {
	// 	event.target.playVideo()
	// }
	if (event.data === 0) {
		dispatch({type:"nextSong"})
	}

	dispatch({type:"setYTPlayerState", payload:event.target.getPlayerState()})
  }

  return (
    <>
		<div
			className={`fixed right-0 bottom-24 ${state.showVideo ? "fixed" : "invisible"}`}
			onKeyDown={(event) => {
				if (event.key === " ") {
					dispatch({type:"togglePlayPause"})
				}
			}}
		>
			{state.allSongs.length > 0 && (
			<YouTube
				// videoId={state.allSongs[state.currentSongIndex].videoId},
				videoId="blRe2wQP-_U"
				opts={{
					width: windowSize.width > 1000 ? "600" : windowSize.width,
					height: windowSize.width > 1000 ? "300" : (windowSize.width * 9) / 16,
				}}
				onReady={onReady}
				onStateChange={onStateChange}

			/>
			)}
		</div>
    </>
  );
}
