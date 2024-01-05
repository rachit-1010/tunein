import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import PlaylistList from './PlaylistList';


export default function LeftSidePanel() {
	return (
		// LeftSidePanel
		<div className="bg-black fixed left-0 top-0 w-64 bottom-24 flex flex-col">
			{/* First block in LeftSidePanel */}
			<div className='LeftPanelBlock'>
				{/* Add more songs button */}
				<div className='LeftPanelBlockItem'>
					<div>
						<FontAwesomeIcon icon={faSquarePlus} size="2x" color='#cbd5e1'/>
					</div>
					<div className='text-xl pb-1 '>
						Add More Songs
					</div>
				</div>
				{/* Home button */}
				<div className='LeftPanelBlockItem'>
					<div>
						<FontAwesomeIcon icon={faHouse} size="2x" color='#cbd5e1'/>
					</div>
					<div className='text-xl pb-1'>
						Home
					</div>
				</div>
			</div>
			{/* Second block in LeftSidePanel */}
			<div className='LeftPanelBlock text-slate-400 overflow-y-scroll ScrollCSS'> 
				{/* Playlist heading with the icon */}
				<div className='flex items-center gap-6'> 
					<div>
						<FontAwesomeIcon icon={faMusic} size="2x" color='#cbd5e1'/>
					</div>
					<div className='text-3xl pb-1 text-slate-400'>
						Playlists
					</div>
				</div>
				<div className='py-4'>
					<PlaylistList />
				</div>
			</div>
			<div className='LeftPanelBlock'>
				{/* Queues button */}
				<div className='LeftPanelBlockItem'>
					<div>
						<FontAwesomeIcon icon={faBars} size="2x" color='#cbd5e1'/>
					</div>
					<div className='text-xl pb-1 '>
						Queue
					</div>
				</div>
			</div>
		</div>
	)
}