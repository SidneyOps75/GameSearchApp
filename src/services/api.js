import axios from 'axios';

const API_KEY = '026c421cf1f14b8493a39cfdba254912';
const BASE_URL = 'https://api.rawg.io/api';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

// Get featured games (popular games)
export const getFeaturedGames = async (page = 1, pageSize = 20) => {
  try {
    const response = await api.get('/games', {
      params: {
        ordering: '-rating',
        page,
        page_size: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching featured games:', error);
    throw error;
  }
};

// Search games
export const searchGames = async (query, page = 1, pageSize = 20) => {
  try {
    const response = await api.get('/games', {
      params: {
        search: query,
        page,
        page_size: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

// Get game details
export const getGameDetails = async (gameId) => {
  try {
    const response = await api.get(`/games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};

// Get game screenshots
export const getGameScreenshots = async (gameId) => {
  try {
    const response = await api.get(`/games/${gameId}/screenshots`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game screenshots:', error);
    throw error;
  }
};
