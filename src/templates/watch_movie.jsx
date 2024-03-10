import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import '../css/watch_movie.css'


function MoviePlayer() {
	
	const { id } = useParams();
	const movie_info = `https://api.themoviedb.org/3/movie/${id}?api_key=171fe27dbfecc58e2a18fbced644cda9`

	const [MovieInfo, setMovieInfo] = useState(null);
		
	function fetch_movie_Info() {
		fetch(movie_info)
			.then(response => response.json())
			.then(data => {
				setMovieInfo(data);
			})
			.catch(error => {
				console.log("Some error occured", error)
			})
	};
	fetch_movie_Info()

	return (
		<div className="MoviePlayerMain">

			<div>
				<Link to="/" className='header'>
					<p>Dramalama</p>
				</Link>
			</div>

			<div className="moviePlayer">
				<iframe title="movie-player" src={`https://vidsrc.pro/embed/movie/${id}`} referrerPolicy="origin" allowFullScreen>
				</iframe>
			</div>

			{ MovieInfo && (
				<div className="movieInfoContainer">
					<p className="movieInfoTitle">{MovieInfo.original_title}</p>
					<p className="movieInfoOverview">{MovieInfo.overview}</p>
					<p className="movieInfoReleaseDate">Released: {MovieInfo.release_date}</p>
					<p className="movieInfoRatings">Ratings: {MovieInfo.vote_average}</p>
				</div>
			)}
		</div>
	)
}

export default MoviePlayer;