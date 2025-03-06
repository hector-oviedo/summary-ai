import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const getLanguages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/languages`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching languages:", error);
    return error.message || "Error fetching languages.";
  }
};

export const getTopNews = async (language) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/news/top?lang=${language}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching top news:", error);
    return error.message || "Error fetching top news.";
  }
};

export const getArticleDetails = async (link, language) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/news?link=${encodeURIComponent(link)}&lang=${language}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article details:", error);
    return error.message || "Error fetching article details.";
  }
};
