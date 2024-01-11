import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function SongItem({ id, name, album, duration, selected, setShowModal, setModalContent}) {
	
	const [isFocused, setIsFocused] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	function toggleLike() {
		setIsLiked(!isLiked);
	}

	function handleModal() {
		setModalContent("Added to queue");
		setShowModal(true);
	}

	return (
		<div 
			className={`flex space-x-1 lg:space-x-4 items-center lg:px-4 py-1 lg:py-3 rounded-md lg:mx-1 ${isFocused ? 'lg:bg-color-secondary' : ''}`}
			onMouseEnter={() => setIsFocused(true)}
			onMouseLeave={() => setIsFocused(false)}
		>
			<div className={`hidden lg:block w-8 text-right text-sm ${selected ? 'text-color-highlight' : 'text-color-secondary'}`}>{id}</div>
			<div className={`w-3/5 lg:w-1/3 text-lg lg:text-xl ps-1 lg:ps-2 flex flex-col ${selected ? 'text-color-highlight' : 'text-color-primary'}`}>
				<div>
					{name}
				</div>
				<div className='text-color-secondary text-xs lg:hidden'>
					{album} • {duration}
				</div>
			</div>
			<div className="w-1/5 hidden lg:block">{album}</div>
			<div className="w-20 text-center hidden lg:block">{duration}</div>
			<div className="lg:flex-grow text-center">
				<FontAwesomeIcon icon={solidHeart} style={{ color: 'var(--text-color-highlight)'}} className={`scale-125 cursor-pointer me-2 lg:me-0 ${isLiked ? 'inline' : 'hidden' }`} onClick={toggleLike}/>
				<FontAwesomeIcon icon={regularHeart} style={{ color: 'var(--text-color-highlight)'}} className={`hover:scale-125 cursor-pointer me-2 lg:me-0 ${ !isLiked ? 'inline' : 'hidden'} ${!isLiked&&isFocused ? 'lg:inline' : 'lg:hidden'}` } onClick={toggleLike}/>
			</div>
			<div className="text-left flex gap-8 items-center w-1/6 grow lg:grow-0">
				<div className="flex gap-3 items-center">
					<div className="relative inline-block hoverTextStyle">
						<button className="lg:hover:bg-slate-700 p-1 px-2 rounded-full text-xs " onClick={handleModal}>+<FontAwesomeIcon icon={faBars} /></button>
					</div>

					<div className="relative inline-block addPlBtn">
						<button className={`lg:hover:bg-slate-700 p-1 border-2 border-slate-700 text-xs ${isFocused?'':'lg:invisible'}`}>+Playlist</button>
						<div className="dropdown-content">
							<a href="#">My Playlist</a>
							<a href="#">Slow Mornings</a>
							<a href="#">Old</a>
							<a href="#">Very very very long long name</a>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	)
}

