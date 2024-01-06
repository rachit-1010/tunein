import React from "react";
import SongItem from "./SongItem";
import { useState } from "react";

export default function MainPanel() {

	return (
		<div className="MainPanel absolute top-24 bottom-24 left-64 right-0 text-color-secondary bg-color-primary py-4  mt-2 ms-2 flex flex-col rounded-b-lg">
			<SongListHeader />
			<div className="overflow-y-scroll ScrollCSS w-full">
			<SongItem id={1} name={"Khaabon ke Parinday"} album={"Zindagi Na Milegi Dobara"} duration={"4:28"} selected={true}/>
			<SongItem id={2} name={"Dildara"} album={"RaOne"} duration={"6:27"} />
			<SongItem id={3} name={"Aise Kyun"} album={"Mismatched"} duration={"6:27"} />
			<SongItem id={4} name={"Willow"} album={"Taylor Swift"} duration={"6:27"} />
			<SongItem id={5} name={"As It Was"} album={"Harry Styles"} duration={"6:27"} />
			<SongItem id={6} name={"Aise Kyun"} album={"Mismatched"} duration={"6:27"} />
			<SongItem id={7} name={"The Nights"} album={"Avicii"} duration={"6:27"} />
			<SongItem id={8} name={"Aise Kyun"} album={"Mismatched"} duration={"6:27"} />
			<SongItem id={9} name={"Maahi Ve"} album={"Highway"} duration={"6:27"} />
			<SongItem id={10} name={"The Nights"} album={"Avicii"} duration={"6:27"} />
			<SongItem id={11} name={"Aise Kyun"} album={"Mismatched"} duration={"6:27"} />
			<SongItem id={12} name={"Maahi Ve"} album={"Highway"} duration={"6:27"} />
			<SongItem id={13} name={"Aise Kyun"} album={"Mismatched"} duration={"6:27"} />
			<SongItem id={14} name={"Maahi Ve"} album={"Highway"} duration={"6:27"} />
			<SongItem id={15} name={"The Nights"} album={"Avicii"} duration={"6:27"} />
			</div>
		</div>
	)
}

function SongListHeader() {
	return (
		<div className="flex space-x-4 border-b-2 border-slate-700 px-4 py-1 me-2">
			<div className="w-8 text-right">#</div>
			<div className="w-1/3 ps-2">Title</div>
			<div className="w-1/5">Album</div>
			<div className="w-20 text-center">Duration</div>
			<div className="w-4 flex-grow"></div>
			<div className="text-left w-1/6">Options</div>
		</div>
	)
}

