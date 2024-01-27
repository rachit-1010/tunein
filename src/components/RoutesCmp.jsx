import React from "react";
import { useAuth } from "./AuthContext";
import { Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import LeftSidePanel from "./LeftSidePanel";
import MainPanel from "./MainPanel";
import TopBar from "./TopBar";
import ModalCmp from "./ModalCmp";
import MusicPlayer from "./MusicPlayer";
import useHooksLogic from "../useHooksLogic";
import VideoPlayer from "./VideoPlayer";
import { Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function RoutesCmp() {

	const { token, login } = useAuth();
	const [state, dispatch] = useHooksLogic();

	// check if there is a token in the local storage
	// if there is, then login

	React.useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			login(token);
		}
	}, [])
	

	return (
		<>
			<Routes>
				<Route path="/login" element={token === null ? <LoginPage /> : <Navigate to="/saved_songs" replace/>
			 } />
				<Route path="/:page" element={token === null ? <Navigate to="/login" replace/> : 
					<>
						<LeftSidePanel state={state} dispatch={dispatch} />
						<MusicPlayer state={state} dispatch={dispatch} />
						<MainPanel state={state} dispatch={dispatch} />
						<TopBar state={state} dispatch={dispatch} />
						<ModalCmp state={state} dispatch={dispatch} />
						<VideoPlayer state={state} dispatch={dispatch}/>
					</>
			 } />
			</Routes>
		</>
	)
}