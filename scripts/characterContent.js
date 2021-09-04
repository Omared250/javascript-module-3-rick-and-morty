import { getUrl as getEpisode } from "./api.js";

async function createCharacterContent(character, contentNode) {
  const html = `<div class="flex-none pl-6">
    <img src="${character.image}" alt="character profile image" />
    <div>
      <h1>${character.name}</h1>
      <p>${character.species} | ${character.status} | ${character.gender} | ${character.origin.name}</p>
    </div>
  </div>`;

  contentNode.innerHTML = html;

  character.episode.forEach(async (url) => {
    const { name, episode } = await getEpisode(url);
    const episodeHtml = `
      <h3>${name}</h3>
      <p>${episode}</p>
    `;

    const episodeButton = document.createElement("button");
    episodeButton.onclick = async () => {
      // do nothing!
    };

    episodeButton.innerHTML = episodeHtml;
    contentNode.appendChild(episodeButton);
  });
  // const newDiv = document.createElement("div");
  // newDiv.innerHTML = html;
  // node.appendChild(newDiv);
}

export { createCharacterContent };
