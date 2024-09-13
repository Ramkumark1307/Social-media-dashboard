import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyCkmsMqQ-XdMUX85cbZplpFCJvJgCbHc74'; // Replace with your actual API key
const CHANNEL_ID = 'UC8HTlJ2pkXiRYS1fNn5z1Pw'; // Replace with the channel ID

const About = () => {
  const [channelTitle, setChannelTitle] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [channelLogo, setChannelLogo] = useState('');
  const [subscriberCount, setSubscriberCount] = useState('');
  const [videoCount, setVideoCount] = useState('');
  const [viewCount, setViewCount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        if (!response.data.items.length) {
          throw new Error('Channel not found.');
        }

        const { title, description, thumbnails } = response.data.items[0].snippet;
        const { subscriberCount, videoCount, viewCount } = response.data.items[0].statistics;

        setChannelTitle(title);
        setChannelDescription(description);
        setChannelLogo(thumbnails.high.url); // Get the channel logo
        setSubscriberCount(parseInt(subscriberCount).toLocaleString());
        setVideoCount(parseInt(videoCount).toLocaleString());
        setViewCount(parseInt(viewCount).toLocaleString());
      } catch (error) {
        setError(error.response ? error.response.data.error.message : error.message);
        console.error('Error fetching channel data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, []);

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (error) return <p style={styles.message}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About the Channel</h1>
      <div style={styles.channelInfo}>
        <img src={channelLogo} alt="Channel Logo" style={styles.channelLogo} />
        <h2 style={styles.channelName}>{channelTitle}</h2>
        <p style={styles.description}>{channelDescription}</p>
        <div style={styles.stats}>
          <p><strong>Subscribers:</strong> {subscriberCount}</p>
          <p><strong>Total Videos:</strong> {videoCount}</p>
          <p><strong>Total Views:</strong> {viewCount}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '2rem',
  },
  channelInfo: {
    textAlign: 'center',
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
    marginBottom: '10px',
  },
  description: {
    color: '#34495e',
    fontSize: '1rem',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  stats: {
    color: '#2c3e50',
    fontSize: '1rem',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  message: {
    textAlign: 'center',
    color: '#e74c3c',
    fontSize: '1.2rem',
  },
};

export default About;
