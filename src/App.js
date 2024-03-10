import * as React from 'react';
import Home from './templates/home'
import Anime from './templates/anime';
import News from './templates/news';
import Manga from './templates/manga';
import NewsItem from './templates/news_items';
import Movies from './templates/movies';
import WatchAnime from './templates/watch_anime';
import MoviePlayer from './templates/watch_movie';
import MangaReader from './templates/manga_reader';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/anime" element={<Anime />} />
				<Route path="/news" element={<News />} />
				<Route path="/mangas" element={<Manga />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/news/:id" element={<NewsItem />} />
				<Route path="/watch/:id" element={<WatchAnime />} />
				<Route path='/watch_movies/:id' element={<MoviePlayer />}/>
				<Route path='/manga_reader/:id' element={<MangaReader />}/>
			</Routes>
		</Router>
	);
}
	
export default App;
