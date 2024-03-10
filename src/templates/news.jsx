import React, { useState, useEffect } from 'react';
import '../css/news.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function News() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('https://dramalama-api.vercel.app/news/ann/recent-feeds');
				setData(response.data);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='main-n'>
			<div className='headerContainer-n'>
				<p className='header-n'>
					Dramalama-News
				</p>
				<p className='header-p'>Read anime related news for free.</p>
			</div>

			{isLoading ? (
				<div className='loading'>
					<p>Loading...</p>
				</div>
			) : (
				<div className='news'>
					{data && data.map((item, index) => (
					   <Link to={`/news/${encodeURIComponent(item.id)}`} key={index} className='newsBox-n' target='_new'>
							<p className='newsBox-t'>{item.title}</p>
							<p className='newsBox-d'>{item.uploadedAt}</p>
							<img src={`https://image-proxy-tau.vercel.app/image-proxy?url=${item.thumbnail}`} alt="Thumbnail" />
						</Link>
					))}
				</div>
			)}
		</div>
	);
}

export default News;
