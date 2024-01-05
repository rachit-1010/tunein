import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function MainPanel() {
	return (
		<div className="MainPanel absolute top-24 bottom-24 left-64 right-0 text-slate-500 bg-black py-4  mt-2 ms-2 flex flex-col">
			<SongListHeader />
			<div className="overflow-y-scroll ScrollCSS w-full">
			<SongItem id={42} name={"Khaabon ke Parinday"} album={"Zindagi Na Milegi Dobara"} duration={"4:28"}/>
			<SongItem id={102} name={"Dildara"} album={"RaOne"} duration={"6:27"} selected={true}/>
			<SongItem id={102} name={"Aise Kyun"} album={"Mismatched"} duration={"6:27"} />
			<SongItem id={102} name={"Willow"} album={"Taylor Swift"} duration={"6:27"} />
			<SongItem id={102} name={"As It Was"} album={"Harry Styles"} duration={"6:27"} />
			<SongItem id={102} name={"Aise Kyun"} album={"Mismatched"} duration={"6:27"} />
			<SongItem id={102} name={"The Nights"} album={"Avicii"} duration={"6:27"} />
			<SongItem id={102} name={"Aise Kyun"} album={"Mismatched"} duration={"6:27"} />
			<SongItem id={102} name={"Maahi Ve"} album={"Highway"} duration={"6:27"} />
			<SongItem id={102} name={"The Nights"} album={"Avicii"} duration={"6:27"} />
			<SongItem id={102} name={"Aise Kyun"} album={"Mismatched"} duration={"6:27"} />
			<SongItem id={102} name={"Maahi Ve"} album={"Highway"} duration={"6:27"} /><SongItem id={102} name={"The Nights"} album={"Avicii"} duration={"6:27"} />
			<SongItem id={102} name={"Aise Kyun"} album={"Mismatched"} duration={"6:27"} />
			<SongItem id={102} name={"Maahi Ve"} album={"Highway"} duration={"6:27"} />
			</div>
		</div>
	)
}

function SongListHeader() {
	return (
		<div className="flex space-x-4 border-b-2 border-slate-500 px-4 py-1">
			<div className="w-8 text-right">#</div>
			<div className="w-1/3 ps-2">Title</div>
			<div className="w-1/5">Album</div>
			<div className="w-20 text-center">Duration</div>
			<div className="w-1/4 text-center">Options</div>
		</div>
	)
}

function SongItem({ id, name, album, duration, selected}) {
	return (
		<div className="flex space-x-4 items-center px-4 py-3">
			<div className={`w-8 text-right text-sm ${selected ? 'text-green-500' : 'text-slate-500'}`}>{id}</div>
			<div className={`w-1/3 text-xl ps-2 ${selected ? 'text-green-500' : 'text-slate-50'}`}>{name}</div>
			<div className="w-1/5">{album}</div>
			<div className="w-20 text-center">{duration}</div>
			<div className="w-1/4 text-center flex gap-8 justify-evenly items-center">
				<FontAwesomeIcon icon={regularHeart} color="green" className="hover:scale-110 cursor-pointer"/> 
				<div className="flex gap-3 items-center">
					<div><button className="hover:bg-slate-700 p-1 px-2 rounded-full text-xs">+<FontAwesomeIcon icon={faBars} /></button></div>
					<button className="hover:bg-slate-700 p-1 border-2 border-slate-700 text-xs"> +Playlist</button>
				</div>
			</div>
		</div>
	)
}

