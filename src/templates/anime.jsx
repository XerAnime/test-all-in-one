import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/anime.css'

function Anime() {
	const [inputValue, setInputValue] = useState('');
	const [fetchedData, setFetchedData] = useState(null);
	const [air, setAir] = useState(null);
	const [recentEpisodes, setRecentEpisodes] = useState(null);
	const [loadingAir, setLoadingAir] = useState(false);
	const [loadingEpisodes, setLoadingEpisodes] = useState(false);

	function handleKeyEvent(event) {
		if ((event.code === "Enter" || event.code === 13 || event.key === "Enter") && inputValue != "" ) {
			fetchData(inputValue);
		}
	}

	function popupExit() {
		const popup = document.querySelector(".popup")
		popup.style.display = "none";
	}

	function fetchData(input) {
		fetch(`https://anime-sensei-api.vercel.app/anime/gogoanime/${input}?page=1`)
			.then(response => response.json())
			.then(data => {
				setFetchedData(data);
				const popup = document.querySelector(".popup")
				popup.style.display = "flex";
			})
			.catch(error => console.error('Error fetching data:', error));
	}

	function fetchAir() {
		setLoadingAir(true); 
		fetch(`https://anime-sensei-api.vercel.app/anime/gogoanime/top-airing`)
			.then(response => response.json())
			.then(data => {
				setAir(data);
			})
			.catch(error => console.error('Error fetching data:', error))
			.finally(() => setLoadingAir(false)); 
	}

	function newEpisodes() {
		setLoadingEpisodes(true); 
		fetch(`https://anime-sensei-api.vercel.app/anime/gogoanime/recent-episodes`)
			.then(response => response.json())
			.then(data => {
				setRecentEpisodes(data); 
			})
			.catch(error => console.error('Error fetching data:', error))
			.finally(() => setLoadingEpisodes(false)); 
	}

	useEffect(() => {
		fetchAir();
		newEpisodes();
	}, []);

	return (
		<div className='animeMain'>
			<div>
				<ul className='navbar'>
					<li><a href="/">XerStream</a></li>
					<input
						placeholder='Enter anime title '
						onKeyDown={(event) => handleKeyEvent(event)}
						onChange={(event) => setInputValue(event.target.value)}
					/>
				</ul>

				<div className='air'>

					<p>What's Trending Today</p>
					{loadingAir ? <div className='loading2'>Loading...</div> : (
						<div className='airContainer'>
							{air && air.results.map((item, index) => (
								<Link key={index} to={`/watch/${encodeURI(item.id)}`} className="redirectsAnime" target='_new'>
									<div className='airEntries'>
										<img src={`https://image-proxy-tau.vercel.app/image-proxy?url=${item.image}`} className='airImages' alt={item.title}></img>
										<div className='imgOverlayTitle'>{item.title}</div>
									</div>
								</Link>
							))}
						</div>
					)}

				</div>

				<div className='air'>

					<p>Recent Episodes</p>
					{loadingEpisodes ? <div className='loading2'>Loading...</div> : (
						<div className='airContainer'>
							{recentEpisodes && recentEpisodes.results.map((item, index) => (
								<Link key={index} to={`/watch/${encodeURI(item.id)}`} className="redirectsAnime" target='_new'>
									<div className='airEntries'>
										<img src={`https://image-proxy-tau.vercel.app/image-proxy?url=${item.image}`} className='airImages' alt={item.title}></img>
										<div className='imgOverlayTitle'>{item.title}</div>
										<div className='imgEpisodeNumber'>Episode: {item.episodeNumber}</div>
									</div>
								</Link>
							))}
						</div>
					)}

				</div>

			</div>

				
			<div className='popup' id='test' onClick={() => popupExit() }>
				<div className="popupEntries">
					{fetchedData && fetchedData.results.map((item, index) => (
						<Link key={index} to={`/watch/${item.id}`} className='watchRedirects'>
							<div className='animeEntries'>
								<p className='searchTitle'>{item.title}</p>
								<img src={item.image} alt='searchImage'></img>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export default Anime;
