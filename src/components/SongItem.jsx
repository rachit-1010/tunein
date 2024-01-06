import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function SongItem({ id, name, album, duration, selected}) {
	
	const [isFocused, setIsFocused] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	function toggleLike() {
		setIsLiked(!isLiked);
	}

	return (
		<div 
			className={`flex space-x-4 items-center px-4 py-3 rounded-md mx-1 ${isFocused ? 'bg-color-secondary' : ''}`}
			onMouseEnter={() => setIsFocused(true)}
			onMouseLeave={() => setIsFocused(false)}
		>
			<div className={`w-8 text-right text-sm ${selected ? 'text-color-highlight' : 'text-color-secondary'}`}>{id}</div>
			<div className={`w-1/3 text-xl ps-2 ${selected ? 'text-color-highlight' : 'text-color-primary'}`}>{name}</div>
			<div className="w-1/5">{album}</div>
			<div className="w-20 text-center">{duration}</div>
			<div className="flex-grow text-center">
				{isLiked && <FontAwesomeIcon icon={solidHeart} style={{ color: 'var(--text-color-highlight)'}} className="scale-125 cursor-pointer" onClick={toggleLike}/> }
				{isFocused && !isLiked && <FontAwesomeIcon icon={regularHeart} style={{ color: 'var(--text-color-highlight)'}} className="hover:scale-125 cursor-pointer" onClick={toggleLike}/> }
			</div>
			<div className="text-left flex gap-8 items-center w-1/6">
				<div className="flex gap-3 items-center">
					<div className="relative inline-block hoverTextStyle">
						<button className="hover:bg-slate-700 p-1 px-2 rounded-full text-xs ">+<FontAwesomeIcon icon={faBars} /></button>
					</div>

					<div className="relative inline-block addPlBtn">
						<button className={`hover:bg-slate-700 p-1 border-2 border-slate-700 text-xs ${isFocused?'':'invisible'}`}>+Playlist</button>
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

