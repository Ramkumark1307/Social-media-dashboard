// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto'; // Importing for Chart.js

// const API_KEY = 'AIzaSyCrHrKynKUn7JQYnBWcprije5YML9oM6o4'; // Replace with your actual API key
// const CHANNEL_ID = 'UCsvbtREDWIJF3kGVYg2g_ew'; // Replace with the channel ID

// function App() {
//   const [videoData, setVideoData] = useState([]);
//   const [channelName, setChannelName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sliderValue, setSliderValue] = useState(10); // Default to showing 10 videos

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch channel details
//         const channelResponse = await axios.get(
//           `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`
//         );
//         if (!channelResponse.data.items.length) {
//           throw new Error('Channel not found.');
//         }
//         setChannelName(channelResponse.data.items[0].snippet.title);

//         // Fetch video data
//         const videoResponse = await axios.get(
//           `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=20&key=${API_KEY}`
//         );

//         if (!videoResponse.data.items.length) {
//           throw new Error('No videos found for this channel.');
//         }

//         const videoIds = videoResponse.data.items.map(item => item.id.videoId).join(',');

//         const statsResponse = await axios.get(
//           `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
//         );

//         if (statsResponse.data.items.length !== videoResponse.data.items.length) {
//           throw new Error('Mismatch between videos and statistics.');
//         }

//         const data = videoResponse.data.items.map((item, index) => {
//           const stats = statsResponse.data.items[index].statistics;
//           return {
//             title: item.snippet.title,
//             views: parseInt(stats.viewCount, 10) || 0,
//             likes: parseInt(stats.likeCount, 10) || 0,
//             comments: parseInt(stats.commentCount, 10) || 0,
//             date: item.snippet.publishedAt.split('T')[0],
//           };
//         });

//         setVideoData(data);
//       } catch (error) {
//         setError(error.response ? error.response.data.error.message : error.message);
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p style={styles.message}>Loading...</p>;
//   if (error) return <p style={styles.message}>Error: {error}</p>;

//   // Slice the video data based on the slider value
//   const displayedVideoData = videoData.slice(0, sliderValue);

//   const chartData = {
//     labels: displayedVideoData.map(video => video.date),
//     datasets: [
//       {
//         label: 'Views',
//         data: displayedVideoData.map(video => video.views),
//         fill: true,
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//         tension: 0.4,
//       },
//       {
//         label: 'Likes',
//         data: displayedVideoData.map(video => video.likes),
//         fill: true,
//         backgroundColor: 'rgba(153,102,255,0.2)',
//         borderColor: 'rgba(153,102,255,1)',
//         tension: 0.4,
//       },
//       {
//         label: 'Comments',
//         data: displayedVideoData.map(video => video.comments),
//         fill: true,
//         backgroundColor: 'rgba(255,159,64,0.2)',
//         borderColor: 'rgba(255,159,64,1)',
//         tension: 0.4,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         grid: {
//           color: '#e0e0e0',
//         },
//       },
//       y: {
//         grid: {
//           color: '#e0e0e0',
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: {
//             size: 14,
//           },
//         },
//       },
//       tooltip: {
//         backgroundColor: '#333',
//         titleFont: {
//           size: 16,
//         },
//         bodyFont: {
//           size: 14,
//         },
//       },
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>YouTube Channel Analytics Dashboard</h1>
//       {channelName && <h2 style={styles.channelName}>Channel Name: {channelName}</h2>}
      
//       <div style={styles.sliderContainer}>
//         <label htmlFor="videoSlider" style={styles.sliderLabel}>Number of videos to display: {sliderValue}</label>
//         <input
//           id="videoSlider"
//           type="range"
//           min="1"
//           max={videoData.length}
//           value={sliderValue}
//           onChange={(e) => setSliderValue(e.target.value)}
//           style={styles.slider}
//         />
//       </div>

//       <div style={styles.dataContainer}>
//         <h2 style={styles.subTitle}>Video Engagement Data</h2>
//         <div style={styles.scrollableContainer}>
//           <div style={styles.cardsContainer}>
//             {displayedVideoData.map(video => (
//               <div key={video.title} style={styles.card}>
//                 <h3 style={styles.videoTitle}>{video.title}</h3>
//                 <p style={styles.videoDetail}><strong>Published Date:</strong> {video.date}</p>
//                 <p style={styles.videoDetail}><strong>Views:</strong> {video.views.toLocaleString()}</p>
//                 <p style={styles.videoDetail}><strong>Likes:</strong> {video.likes.toLocaleString()}</p>
//                 <p style={styles.videoDetail}><strong>Comments:</strong> {video.comments.toLocaleString()}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       <div style={styles.chartContainer}>
//         <h2 style={styles.subTitle}>Engagement Over Time</h2>
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     fontFamily: 'Arial, sans-serif',
//     padding: '30px',
//     backgroundColor: '#f0f2f5',
//     minHeight: '100vh',
//   },
//   title: {
//     textAlign: 'center',
//     color: '#2c3e50',
//     marginBottom: '20px',
//     fontSize: '2.5rem',
//   },
//   channelName: {
//     textAlign: 'center',
//     color: '#3498db',
//     marginBottom: '20px',
//     fontSize: '1.5rem',
//   },
//   subTitle: {
//     color: '#34495e',
//     marginBottom: '15px',
//     fontSize: '1.5rem',
//   },
//   dataContainer: {
//     marginBottom: '40px',
//   },
//   scrollableContainer: {
//     maxHeight: '300px',
//     overflowY: 'auto',
//     paddingRight: '15px',
//   },
//   cardsContainer: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//     gap: '20px',
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     padding: '20px',
//     transition: 'transform 0.2s',
//   },
//   videoTitle: {
//     margin: '0 0 10px',
//     color: '#2c3e50',
//     fontSize: '1.2rem',
//   },
//   videoDetail: {
//     margin: '5px 0',
//     color: '#7f8c8d',
//   },
//   chartContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     padding: '20px',
//     height: '400px',
//   },
//   message: {
//     textAlign: 'center',
//     color: '#e74c3c',
//     fontSize: '1.2rem',
//   },
//   sliderContainer: {
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   sliderLabel: {
//     display: 'block',
//     color: '#34495e',
//     fontSize: '1rem',
//     marginBottom: '10px',
//   },
//   slider: {
//     width: '300px',
//   },
// };

// export default App;
// App.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';

// import 'chart.js/auto'; // Importing for Chart.js
// import NavBar from './NavBar'; // Import the NavBar component

// const API_KEY = 'AIzaSyCrHrKynKUn7JQYnBWcprije5YML9oM6o4'; // Replace with your actual API key
// const CHANNEL_ID = 'UCsvbtREDWIJF3kGVYg2g_ew'; // Replace with the channel ID

// function App() {
//   const [videoData, setVideoData] = useState([]);
//   const [channelName, setChannelName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sliderValue, setSliderValue] = useState(10); // Default to showing 10 videos

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch channel details
//         const channelResponse = await axios.get(
//           `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`
//         );
//         if (!channelResponse.data.items.length) {
//           throw new Error('Channel not found.');
//         }
//         setChannelName(channelResponse.data.items[0].snippet.title);

//         // Fetch video data
//         const videoResponse = await axios.get(
//           `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=20&key=${API_KEY}`
//         );

//         if (!videoResponse.data.items.length) {
//           throw new Error('No videos found for this channel.');
//         }

//         const videoIds = videoResponse.data.items.map(item => item.id.videoId).join(',');

//         const statsResponse = await axios.get(
//           `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
//         );

//         if (statsResponse.data.items.length !== videoResponse.data.items.length) {
//           throw new Error('Mismatch between videos and statistics.');
//         }

//         const data = videoResponse.data.items.map((item, index) => {
//           const stats = statsResponse.data.items[index].statistics;
//           return {
//             title: item.snippet.title,
//             views: parseInt(stats.viewCount, 10) || 0,
//             likes: parseInt(stats.likeCount, 10) || 0,
//             comments: parseInt(stats.commentCount, 10) || 0,
//             date: item.snippet.publishedAt.split('T')[0],
//           };
//         });

//         setVideoData(data);
//       } catch (error) {
//         setError(error.response ? error.response.data.error.message : error.message);
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p style={styles.message}>Loading...</p>;
//   if (error) return <p style={styles.message}>Error: {error}</p>;

//   // Slice the video data based on the slider value
//   const displayedVideoData = videoData.slice(0, sliderValue);

//   const chartData = {
//     labels: displayedVideoData.map(video => video.date),
//     datasets: [
//       {
//         label: 'Views',
//         data: displayedVideoData.map(video => video.views),
//         fill: true,
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//         tension: 0.4,
//       },
//       {
//         label: 'Likes',
//         data: displayedVideoData.map(video => video.likes),
//         fill: true,
//         backgroundColor: 'rgba(153,102,255,0.2)',
//         borderColor: 'rgba(153,102,255,1)',
//         tension: 0.4,
//       },
//       {
//         label: 'Comments',
//         data: displayedVideoData.map(video => video.comments),
//         fill: true,
//         backgroundColor: 'rgba(255,159,64,0.2)',
//         borderColor: 'rgba(255,159,64,1)',
//         tension: 0.4,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         grid: {
//           color: '#e0e0e0',
//         },
//       },
//       y: {
//         grid: {
//           color: '#e0e0e0',
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: {
//             size: 14,
//           },
//         },
//       },
//       tooltip: {
//         backgroundColor: '#333',
//         titleFont: {
//           size: 16,
//         },
//         bodyFont: {
//           size: 14,
//         },
//       },
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <NavBar /> {/* Include the NavBar component */}
//       <h1 style={styles.title}>YouTube Channel Analytics Dashboard</h1>
//       {channelName && <h2 style={styles.channelName}>Channel Name: {channelName}</h2>}
      
//       <div style={styles.sliderContainer}>
//         <label htmlFor="videoSlider" style={styles.sliderLabel}>Number of videos to display: {sliderValue}</label>
//         <input
//           id="videoSlider"
//           type="range"
//           min="1"
//           max={videoData.length}
//           value={sliderValue}
//           onChange={(e) => setSliderValue(e.target.value)}
//           style={styles.slider}
//         />
//       </div>

//       <div style={styles.dataContainer}>
//         <h2 style={styles.subTitle}>Video Engagement Data</h2>
//         <div style={styles.scrollableContainer}>
//           <div style={styles.cardsContainer}>
//             {displayedVideoData.map(video => (
//               <div key={video.title} style={styles.card}>
//                 <h3 style={styles.videoTitle}>{video.title}</h3>
//                 <p style={styles.videoDetail}><strong>Published Date:</strong> {video.date}</p>
//                 <p style={styles.videoDetail}><strong>Views:</strong> {video.views.toLocaleString()}</p>
//                 <p style={styles.videoDetail}><strong>Likes:</strong> {video.likes.toLocaleString()}</p>
//                 <p style={styles.videoDetail}><strong>Comments:</strong> {video.comments.toLocaleString()}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       <div style={styles.chartContainer}>
//         <h2 style={styles.subTitle}>Engagement Over Time</h2>
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     fontFamily: 'Arial, sans-serif',
//     padding: '30px',
//     backgroundColor: '#f0f2f5',
//     minHeight: '100vh',
//   },
//   title: {
//     textAlign: 'center',
//     color: '#2c3e50',
//     marginBottom: '20px',
//     fontSize: '2.5rem',
//   },
//   channelName: {
//     textAlign: 'center',
//     color: '#3498db',
//     marginBottom: '20px',
//     fontSize: '1.5rem',
//   },
//   subTitle: {
//     color: '#34495e',
//     marginBottom: '15px',
//     fontSize: '1.5rem',
//   },
//   dataContainer: {
//     marginBottom: '40px',
//   },
//   scrollableContainer: {
//     maxHeight: '300px',
//     overflowY: 'auto',
//     paddingRight: '15px',
//   },
//   cardsContainer: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//     gap: '20px',
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     padding: '20px',
//     transition: 'transform 0.2s',
//   },
//   videoTitle: {
//     margin: '0 0 10px',
//     color: '#2c3e50',
//     fontSize: '1.2rem',
//   },
//   videoDetail: {
//     margin: '5px 0',
//     color: '#7f8c8d',
//   },
//   chartContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     padding: '20px',
//     height: '400px',
//   },
//   message: {
//     textAlign: 'center',
//     color: '#e74c3c',
//     fontSize: '1.2rem',
//   },
//   sliderContainer: {
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   sliderLabel: {
//     display: 'block',
//     color: '#34495e',
//     fontSize: '1rem',
//     marginBottom: '10px',
//   },
//   slider: {
//     width: '300px',
//   },
// };

// export default App;

import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Importing for Chart.js
import NavBar from './NavBar'; // Import the NavBar component

const API_KEY = 'AIzaSyCkmsMqQ-XdMUX85cbZplpFCJvJgCbHc74'; // Replace with your actual API key
const CHANNEL_ID = 'UC8HTlJ2pkXiRYS1fNn5z1Pw'; // Replace with the channel ID

function App() {
  const [videoData, setVideoData] = useState([]);
  const [channelName, setChannelName] = useState('');
  const [channelLogo, setChannelLogo] = useState(''); // State for channel logo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderValue, setSliderValue] = useState(10); // Default to showing 10 videos

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch channel details
        const channelResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        if (!channelResponse.data.items.length) {
          throw new Error('Channel not found.');
        }
        setChannelName(channelResponse.data.items[0].snippet.title);
        setChannelLogo(channelResponse.data.items[0].snippet.thumbnails.high.url); // Set the channel logo

        // Fetch video data
        const videoResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=20&key=${API_KEY}`
        );

        if (!videoResponse.data.items.length) {
          throw new Error('No videos found for this channel.');
        }

        const videoIds = videoResponse.data.items.map(item => item.id.videoId).join(',');

        const statsResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
        );

        if (statsResponse.data.items.length !== videoResponse.data.items.length) {
          throw new Error('Mismatch between videos and statistics.');
        }

        const data = videoResponse.data.items.map((item, index) => {
          const stats = statsResponse.data.items[index].statistics;
          return {
            title: item.snippet.title,
            views: parseInt(stats.viewCount, 10) || 0,
            likes: parseInt(stats.likeCount, 10) || 0,
            comments: parseInt(stats.commentCount, 10) || 0,
            date: item.snippet.publishedAt.split('T')[0],
          };
        });

        setVideoData(data);
      } catch (error) {
        setError(error.response ? error.response.data.error.message : error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (error) return <p style={styles.message}>Error: {error}</p>;

  // Slice the video data based on the slider value
  const displayedVideoData = videoData.slice(0, sliderValue);

  const chartData = {
    labels: displayedVideoData.map(video => video.date),
    datasets: [
      {
        label: 'Views',
        data: displayedVideoData.map(video => video.views),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4,
      },
      {
        label: 'Likes',
        data: displayedVideoData.map(video => video.likes),
        fill: true,
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
        tension: 0.4,
      },
      {
        label: 'Comments',
        data: displayedVideoData.map(video => video.comments),
        fill: true,
        backgroundColor: 'rgba(255,159,64,0.2)',
        borderColor: 'rgba(255,159,64,1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: '#e0e0e0',
        },
      },
      y: {
        grid: {
          color: '#e0e0e0',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <NavBar /> {/* Include the NavBar component */}
      <h1 style={styles.title}>YouTube Channel Analytics Dashboard</h1>
      {channelName && (
        <div style={styles.channelInfo}>
          <img src={channelLogo} alt={`${channelName} Logo`} style={styles.channelLogo} />
          <h2 style={styles.channelName}>Channel Name: {channelName}</h2>
        </div>
      )}
      
      <div style={styles.sliderContainer}>
        <label htmlFor="videoSlider" style={styles.sliderLabel}>Number of videos to display: {sliderValue}</label>
        <input
          id="videoSlider"
          type="number"
          min="1"
          max={videoData.length}
          value={sliderValue}
          onChange={(e) => setSliderValue(Math.max(1, Math.min(e.target.value, videoData.length)))}
          style={styles.slider}
        />
      </div>

      <div style={styles.dataContainer}>
        <h2 style={styles.subTitle}>Video Engagement Data</h2>
        <div style={styles.scrollableContainer}>
          <div style={styles.cardsContainer}>
            {displayedVideoData.map(video => (
              <div key={video.title} style={styles.card}>
                <h3 style={styles.videoTitle}>{video.title}</h3>
                <p style={styles.videoDetail}><strong>Published Date:</strong> {video.date}</p>
                <p style={styles.videoDetail}><strong>Views:</strong> {video.views.toLocaleString()}</p>
                <p style={styles.videoDetail}><strong>Likes:</strong> {video.likes.toLocaleString()}</p>
                <p style={styles.videoDetail}><strong>Comments:</strong> {video.comments.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div style={styles.chartContainer}>
        <h2 style={styles.subTitle}>Engagement Over Time</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '30px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '2.5rem',
  },
  channelInfo: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  channelLogo: {
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    marginBottom: '10px',
  },
  channelName: {
    color: '#3498db',
    fontSize: '1.5rem',
  },
  subTitle: {
    color: '#34495e',
    marginBottom: '15px',
    fontSize: '1.5rem',
  },
  dataContainer: {
    marginBottom: '40px',
  },
  scrollableContainer: {
    maxHeight: '300px',
    overflowY: 'auto',
    paddingRight: '15px',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '20px',
    transition: 'transform 0.2s',
  },
  videoTitle: {
    margin: '0 0 10px',
    color: '#2c3e50',
    fontSize: '1.2rem',
  },
  videoDetail: {
    margin: '5px 0',
    color: '#7f8c8d',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '20px',
    height: '400px',
  },
  message: {
    textAlign: 'center',
    color: '#e74c3c',
    fontSize: '1.2rem',
  },
  sliderContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  sliderLabel: {
    display: 'block',
    color: '#34495e',
    fontSize: '1rem',
    marginBottom: '10px',
  },
  slider: {
    width: '100px', // Adjust the width to fit the number input field
    textAlign: 'center',
  },
};

export default App;
