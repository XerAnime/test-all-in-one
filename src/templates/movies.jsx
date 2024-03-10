import React, {useEffect, useState} from "react";
import "../css/movies.css"
import { Link } from "react-router-dom";

const tmdb_api_search = "https://api.themoviedb.org/3/search/movie?api_key=171fe27dbfecc58e2a18fbced644cda9&query="
const tmdb_trending = "https://api.themoviedb.org/3/trending/movie/day?api_key=171fe27dbfecc58e2a18fbced644cda9"
const tmdb_recommended = "https://api.themoviedb.org/3/discover/movie?api_key=171fe27dbfecc58e2a18fbced644cda9"
const tmdb_tv_recommended = "https://api.themoviedb.org/3/discover/tv?api_key=171fe27dbfecc58e2a18fbced644cda9"

function Movies() {

	const [inputValue, setInputValue] = useState('');

	const [movieTrending, movieTrendingData] = useState(null);
	const [loadingMovie, setloadingMovie] = useState(false);

	const [recommended, recommendedData] = useState(null);
	const [recommendMovie, setrecommendMovie] = useState(false);

	// const [recommendedTV, recommendedDataTV] = useState(null);
	// const [recommended_TV, setrecommended_TV] = useState(false);

	// STATES FOR SEARCHED MOVIE DATA
	const [SearchedMovie, setSearchedMovie] = useState(null);
	function search_for_movie(input){
		var new_url = tmdb_api_search + input +"&page_size=5";
		fetch(new_url)
			.then(response => response.json())
			.then(data => {
				setSearchedMovie(data);
				const popup = document.querySelector(".popup")
				popup.style.display = "flex";
			})
			.catch(error => {
				console.log("Error occured", error)
			})
			console.log(SearchedMovie)
	}


	useEffect(() => {
		setloadingMovie(true);
		fetch(tmdb_trending)
			.then(response => response.json())
			.then(data => {
				movieTrendingData(data);
				setloadingMovie(false);
			})
			.catch(error => {
				console.error("Error fetching trending shows:", error);
				setloadingMovie(false);
			});
	}, []);

	function handleKeyEvent(event) {
		if ((event.code === "Enter" || event.code === 13 || event.key === "Enter") && inputValue !== "" ) {
			// Make changes here. Get the searched value and show the searched menu and other stuff
			search_for_movie(inputValue)
		}
	}

	function popupExit() {
		const popup = document.querySelector(".popup")
		popup.style.display = "none";
	}

	useEffect(() => {
		setrecommendMovie(true);
		fetch(tmdb_recommended)
			.then(response => response.json())
			.then(data => {
				recommendedData	(data);
				setrecommendMovie(false);
			})
			.catch(error => {
				console.error("Error fetching trending shows:", error);
				setrecommendMovie(false);
			});
	}, []);	

	// useEffect(() => {
	// 	setrecommendMovie(true);
	// 	fetch(tmdb_tv_recommended)
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			recommendedDataTV(data);
	// 			setrecommended_TV(false);
	// 		})
	// 		.catch(error => {
	// 			console.error("Error fetching trending shows:", error);
	// 			setrecommended_TV(false);
	// 		});
	// }, []);	

	return (
		<div className="movieMain">

			<ul className='navbar'>
				<li><a href="/">Dramalama</a></li>
				<input
					placeholder='Enter movie title '
					onKeyDown={(event) => handleKeyEvent(event)}
					onChange={(event) => setInputValue(event.target.value)}
				/>
			</ul>

			<div className="movieTrending">
				<p className="movieTrendingIntro">Trending Movies</p>
				{ loadingMovie ? <div>Loading...</div>
				 : (
					<div className="trendingContainer">
						{recommended && recommended.results.map((item, index) => (
							<Link key={index} to={`/watch_movies/${encodeURI(item.id)}`} style={{textDecoration: "None"}}>
								<div className="trendingEntries">
									<img className="movieImage" src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}></img>
									<p className="movieTitle">{item.title}</p>
									<p className="movieInfo">Rating: {item.vote_average}</p>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>

			<div className="movieTrending">
				<p className="movieTrendingIntro">Recommended Movies</p>
				{ recommendMovie ? <div>Loading...</div>
				 : (
					<div className="trendingContainer">
						{movieTrending && movieTrending.results.map((item, index) => (
							<Link key={index} to={`/watch_movies/${encodeURI(item.id)}`} style={{textDecoration: "None"}}>
								<div className="trendingEntries">
									<img className="movieImage" src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}></img>
									<p className="movieTitle">{item.title}</p>
									<p className="movieInfo">Rating: {item.vote_average}</p>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>

			{/* TO ADD WEBSERIES */}
			{/* <div className="movieTrending">
				<p className="movieTrendingIntro">Recommended TV (Broken)</p>
				{ recommended_TV ? <div>Loading...</div>
				 : (
					<div className="trendingContainer">
						{recommendedTV && recommendedTV.results.map((item, index) => (
							<Link key={index} to={`/watch_series/${encodeURI(item.id)}`} style={{textDecoration: "None"}} >
								<div className="trendingEntries">
									<img className="movieImage" src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}></img>
									<p className="movieTitle">{item.name}</p>
									<p className="movieInfo">Rating: {item.vote_average}</p>
								</div>
							</Link>
						))}
					</div>
				)}
			</div> */}


			{/* MOVIE SEARCH POPUP */}
			<div className='popup' id='test' onClick={() => popupExit() }>
				<div className="popupEntries">
					{SearchedMovie && SearchedMovie.results.map((item, index) => (
						<Link key={index} to={`/watch_movies/${item.id}`} className='watchRedirects' target="_new">
							<div className='animeEntries'>
								<p className='searchTitle'>{item.title}</p>
								<img src={`https://image-proxy-tau.vercel.app/image-proxy?url=https://image.tmdb.org/t/p/w185/${item.poster_path}`} alt='Movie Poster'></img>
							</div>
						</Link>
					))}
				</div>
			</div>

		</div>
	)
};

export default Movies;