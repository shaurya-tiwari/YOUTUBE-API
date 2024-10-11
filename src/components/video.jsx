import React, { useState, useEffect } from 'react';

function Vdo() {

    const [videos, setVideos] = useState([]);
    const [search, setSearch] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchQuery = e.target.elements.search.value;
 
        if (searchQuery.trim() === '') {
            return;
        } 
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${import.meta.env.VITE_APIkey}&q=${searchQuery}&part=snippet&type=video&maxResults=5`;
  
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            //   console.log(data)
            if (data && data.items) {
                const videoElements = data.items.map((item) => {
                    const videoId = item.id.videoId;
                    const videoTitle = item.snippet.title;
                    const iframe = (
                        <div key={videoId}>
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                width="340"
                                height="180"
                                allowFullScreen
                            />
                            <h2>{videoTitle}</h2>
                        </div>
                    );
                    return iframe;
                });
                setVideos(videoElements);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className=' align-center justify-center'>
            <form onSubmit={handleSubmit}>
                <input className='my-5 rounded-lg bg-slate-700' type="search" name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className='mx-3' type="submit">Q</button>
            </form>
            <div>
                {videos}
            </div>
        </div>
    );
}

export default Vdo;