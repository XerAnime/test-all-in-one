import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/manga.css'

const anilist_url = "https://dramalama-api.vercel.app/meta/anilist-manga/"

function Manga() {

	const [inputValue, setInputValue] = useState('');
	const [MangaInfo, setMangaInfo] = useState(null);

	function keyPress(event) {
		if ((event.code === "Enter" || event.code === 13 || event.key === "Enter") && inputValue !== "" ) {
			fetchMangaInfo(inputValue);
		}
	};

	function fetchMangaInfo(title) {
		if (title === "clear") {
			console.clear()
		} else {
			var new_url = anilist_url + title;
			fetch(new_url)
				.then(response => response.json())
				.then(data => {
					setMangaInfo(data)
				})
				.catch(error => console.log("Some error occured", error))
				.then(console.log(MangaInfo))
		}
	};


	return (
		<div>
			<div className='MangaHeader'>
				<p className='heading'>
					<a href='/'>XerStream-Manga</a>
				</p>
				<p className='headerPara'>Your one stop for all your manga needs</p>
			</div>

			<div className='searchSection'>
				<input 
					placeholder='Enter manga title'
					onKeyDown={(event) => keyPress(event)}	
					onChange={(event) => setInputValue(event.target.value)}
				/>
			</div>

			<div className='MangaMangaContainer'>
				<div className='mangaContainer'>
					{ MangaInfo && MangaInfo.results.map((item, index) => (
						<Link key={index} to={`/manga_reader/${item.id}`} className="redirectsManga" target="_new" style={{textDecoration: "None"}}>
							<div className='mangaEntries'>
								<img src={item.image} alt='Anime Poster' className='mangaImage'></img>
								<p className='mangaTitle'>{item.title["romaji"]}</p>
								<p className='mangaStatus'>Status: {item.status}</p>
								<p className='mangaChapters'>{item.totalChapters} Chapters</p>
								<p className='mangaVolumes'>{item.volumes} Volumes</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export default Manga;
