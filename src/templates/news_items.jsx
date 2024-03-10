import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/news.css'

function NewsItem() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const { id } = useParams();


	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`https://dramalama-api.vercel.app/news/ann/info?id=${id}`);
				setData(response.data);
			} catch (error) {
				setError(error);
			}
		};
		fetchData();
	}, [id]);

	return (
		<div className='main-n'>
			{data && (
				<div className='newsInfo'>
					<p className='newsInfoTitle'>
						{data.title}
					</p>
					<img src={data.thumbnail} alt='News'></img>
					<p className='newsInfoIntro'>{data.intro}</p>
					<p className='newsInfoDesc'>{data.description}</p>
					<p className='newsInfoDate'>{data.uploadedAt}</p>
					{/* Render other details of the news item */}
				</div>
			)}
		</div>
	);
}

export default NewsItem;
