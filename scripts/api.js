async function getListOfEpisodes(page) {
  const url = `https://rickandmortyapi.com/api/episode?page=${page}`;
  const res = await fetch(url);
  const json = await res.json();

  return json.results;
}

async function getEpisode(episode) {
  const url = `https://rickandmortyapi.com/api/episode/${episode}`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
}

export { getListOfEpisodes, getEpisode };