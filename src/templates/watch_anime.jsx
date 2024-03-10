import React, { useState, useEffect } from 'react';
import '../css/watch_anime.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Hls from 'hls.js';

function WatchAnime() {

	const { id } = useParams();
	const [info, fetchedInfo] = useState(null);
	const [link, fetchedLink] = useState(null);

	useEffect(() => {
		if (link && Hls.isSupported()) {
			const video = document.getElementById("video");
			const hls = new Hls();
			hls.loadSource(link);
			hls.attachMedia(video);
		}
	}, [link]);

	function fetchInfo() {
		fetch(`https://anime-sensei-api.vercel.app/anime/gogoanime/info/${id}`)
		.then(response => response.json())
		.then(data => {
			fetchedInfo(data);
		})
		.catch(error => console.error('Error fetching data:', error));
	}

	function fetchVideoLink(input) {
		fetch(`https://anime-sensei-api.vercel.app/anime/gogoanime/watch/${input}`)
		.then(response => response.json())
		.then(data => {
			fetchedLink(data.sources[3].url);
			const test = document.querySelector(".animeTitle");
			test.innerHTML = input.toUpperCase();
		})
		.catch(error => console.error('Error fetching data:', error));
	}

	return (
		<div className='WA_main'>
			<div>
				<Link to="/" className='header'>
					<p>Dramalama</p>
				</Link>
			</div>

			{fetchInfo()}
			{info && (
				<p className='animeTitle' id='title'>{info.title}</p>
			)}

			<div className='mainFrame'>
				<video className="video_player" id="video" controls playsInline crossOrigin='true' preload="auto"></video>
			</div>

			<div className='infoFrame'>
				{info && (
					<div className='infoText'>
						<p className='episodesText'>Episodes: {info.totalEpisodes}</p>
						<p className='statusText'>Status: {info.status}</p>
						<p className='typeText'>Type: {info.type}</p>
					</div>	
				)}

				<div className='episodesButtons' >
					{info && info.episodes.map((item, index) => (
						<button key={index}  onClick={() => fetchVideoLink(item.id)} className='episodeButton'>{item.number}</button>
					))}
				</div>
			</div>

		</div>
	);
}

export default WatchAnime;
