const axios = require('axios');
const fs = require('fs'); 
;


const fetchAndSaveMovies = async () => {
  const options = {
    method: 'GET',
    url: 'https://imdb-top-100-movies.p.rapidapi.com/',
    headers: {
      'x-rapidapi-key': '73c641987cmsh012d5fb40aeb84bp1ea436jsnc2b2e8193c87',
      'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // Simpan data ke file JSON
    fs.writeFileSync('movies.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log('Data berhasil disimpan ke file movies.json');
  } catch (error) {
    console.error('Error fetching or saving movies:', error.message);
  }
};

// Jalankan fungsi
fetchAndSaveMovies();