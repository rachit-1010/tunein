import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import PlaylistList from './PlaylistList';


export default function LeftSidePanel({state, dispatch}) {

	function switchToMainView() {
		dispatch({type:'setIsMainView', payload:true});
	}

	return (
		// LeftSidePanel
		<div className={`bg-black fixed left-0 top-0 bottom-24 w-screen lg:w-64 ${state.isMainView ? 'hidden' : 'flex'} lg:flex flex-col`}>
			{/* First block in LeftSidePanel */}
			<div className='LeftPanelBlock'>
				{/* Add more songs button */}
				<div className='LeftPanelBlockItem' onClick={switchToMainView}>
					<div>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</div>
					<div className='text-xl pb-1 ps-1'>
						Search
					</div>
				</div>
				{/* Home button */}
				<div className='LeftPanelBlockItem' onClick={switchToMainView}>
					<div className='leading-none'>
						<FontAwesomeIcon icon={faCloudArrowDown} className='scale-90 m-0 p-0'/>
					</div>
					<div className='text-xl pb-1'>
						All Saved Songs
					</div>
				</div>
				<div className='LeftPanelBlockItem' onClick={() => {
					dispatch({type:"toggleShowVideo"})
				}}>
					<div>
						{state.showVideo ? <FontAwesomeIcon icon={faVideoSlash} /> : <FontAwesomeIcon icon={faVideo} />}
					</div>
					<div className='text-xl pb-1'>
						{state.showVideo ? 'Hide' : 'Show'} Video
					</div>
				</div>
			</div>
			{/* Second block in LeftSidePanel */}
			<div className='LeftPanelBlock overflow-y-scroll ScrollCSS'> 
				{/* Playlist heading with the icon */}
				<div className='flex items-center gap-6'> 
					<div>
						<FontAwesomeIcon icon={faMusic} size="2x" />
					</div>
					<div className='text-3xl pb-1 text-color-secondary'>
						Playlists
					</div>
				</div>
				<div className='py-4'>
					<PlaylistList dispatch={dispatch} />
				</div>
			</div>
			<div className='LeftPanelBlock mb-0'>
				{/* Queues button */}
				<div className='LeftPanelBlockItem mb-0' onClick={switchToMainView}>
					<div>
						<FontAwesomeIcon icon={faBars} size="2x" />
					</div>
					<div className='text-xl pb-1'>
						Queue
					</div>
				</div>
			</div>
		</div>
	)
}