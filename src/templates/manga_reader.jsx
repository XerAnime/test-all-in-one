import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import "../css/manga_reader.css"

function MangaReader() {

	const { id } = useParams();
	const anilist_info = `https://dramalama-api.vercel.app/meta/anilist-manga/info/${id}?provider=mangareader`

	useEffect(() => {
        get_manga_info();
    }, []);

	const [MangaInfo, setMangaInfo] = useState(null);
	function get_manga_info() {
		fetch(anilist_info)
			.then(response => response.json())
			.then(data => setMangaInfo(data))
			.catch(error => console.log("Some error occured", error))
	}


	return (
		<div className="MangaReaderMain">
			<div className='MangaHeader'>
				<p className='heading'>
					<a href='/'>XerStream-Manga</a>
				</p>
				<p className='headerPara'>Your one stop for all your manga needs</p>
			</div>


			<div className='MangaDetailsContainer'>
				{ MangaInfo && (
					<div className='MangaInfoEntries'>
						<p className='MangaInfoTitle'>{MangaInfo.title["english"]}</p>
						<img src={MangaInfo.cover} className='MangaInfoImage'></img>
						<p className='MangaInfoDesc'>{MangaInfo.description}</p>

						<div className='MangaCharacterContainer'>
							{ MangaInfo && MangaInfo.characters.map((item, index) => (
								<div className='MangaCharacterEntries' key={index}>
									<img src={item.image} alt='Character Image' className='MangaCharacterImage'></img>
									<p className='MangaCharacterName'>{item.name["full"]}</p>
								</div>
							))}
						</div>

						<div className='MangaPages'>
							{ MangaInfo && MangaInfo.chapters.map((item, index) => {
								if (item.id.includes("/en/")) {
									return (
										<button key={index} id={item.id} className='MangaChapterButton'>{item.title}</button>
								)}
							})}

						</div>

					</div>


				)}
			</div>


		</div>
	)
}

export default MangaReader
