async function getEpisodes() {
    const url = 'https://rickandmortyapi.com/api/episode';
    
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export { getEpisodes };