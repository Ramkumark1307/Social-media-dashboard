// Analytics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Importing for Chart.js

const API_KEY = 'AIzaSyCkmsMqQ-XdMUX85cbZplpFCJvJgCbHc74'; // Replace with your actual API key
const CHANNEL_ID = 'UC8HTlJ2pkXiRYS1fNn5z1Pw'; // Replace with the channel ID

const Analytics = () => {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const chartData = {
    labels: videoData.map(video => video.date),
    datasets: [
      {
        label: 'Views',
        data: videoData.map(video => video.views),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4,
      },
      {
        label: 'Likes',
        data: videoData.map(video => video.likes),
        fill: true,
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
        tension: 0.4,
      },
      {
        label: 'Comments',
        data: videoData.map(video => video.comments),
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
      <h1 style={styles.title}>Engagement Over Time</h1>
      <div style={styles.chartContainer}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

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
};

export default Analytics;
