 import { getEpisodes } from "./api.js";

const root = document.getElementById('root');
const sideBarContainer = document.createElement('div');
sideBarContainer.classList.add('side-bar')
const listOfEpisodes = document.createElement('ul');
sideBarContainer.appendChild(listOfEpisodes);
const episodeInfoContainer = document.createElement('div');
episodeInfoContainer.classList.add('espisodes-info-area')
const episodeContainer = document.createElement('div')
episodeContainer.classList.add('characters-image-container')

function creatHeader() {
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header')
    const imageTitle = document.createElement('img');
    imageTitle.src = 'images/image4.png'
    headerContainer.appendChild(imageTitle);
    return headerContainer;
}

function sideBar(episodes) {

    episodes.results.map(({id}) => {
        const episodeId = document.createElement('li');
        episodeId.textContent = `Episode ${id}`;
        listOfEpisodes.appendChild(episodeId);
        episodeId.addEventListener('click', getEpisodeInfo)
    });
    
    //button
    const buttonEl = document.createElement('input');
    buttonEl.classList.add('button-side-bar');
    buttonEl.type = 'button';
    buttonEl.value = 'Load Episodes'
    buttonEl.addEventListener('click', loadMoreEpisodes)
    sideBarContainer.appendChild(buttonEl);

    return sideBarContainer;
}

let episodesNumber = 1;

async function getEpisodeInfo() {
    const url = `https://rickandmortyapi.com/api/episode/${episodesNumber}`;

    fetch(url)
    .then(response => response.json())
    .then(json => {
        //creating episode info container
        episodeInfoContainer.textContent = '';

        //creating episode name
        const episodeName = document.createElement('h2');
        episodeName.textContent = json.name;
        episodeInfoContainer.appendChild(episodeName);

        //creating espisode date
        const episodeDate = document.createElement('p');
        episodeDate.textContent = `${json.air_date} | ${json.episode}`
        episodeInfoContainer.appendChild(episodeDate);

        //creating character images 
        let characters = json['characters'];

        characters.forEach(characterLink => {
            fetch(characterLink)
            .then(response => response.json())
            .then(json => {
                //character container
                const characterContainer = document.createElement('div');
                characterContainer.classList.add('character-container');

                //character image
                const character = document.createElement('img');
                character.src = json.image;
                characterContainer.appendChild(character);

                //character name and status
                const characterNameAndStatus = document.createElement('p');
                characterNameAndStatus.textContent = `${json.name} | ${json.status}`
                characterContainer.appendChild(characterNameAndStatus);

                //append character container to father element
                episodeContainer.appendChild(characterContainer);
                episodeInfoContainer.appendChild(episodeContainer); 
            })         
        });
        episodeContainer.textContent = '';
        return episodeInfoContainer;
    })

    episodesNumber++;
}

let pageId = 2;

async function loadMoreEpisodes() {
    const pageUrl = `https://rickandmortyapi.com/api/episode?page=${pageId}`

    fetch(pageUrl)
    .then(response => response.json())
    .then(page => {
        const newEpisodes = page.results
        newEpisodes.forEach(({id}) => {
            const newEpisodeId = document.createElement('li');
            newEpisodeId.textContent = `Episode ${id}`;
            listOfEpisodes.appendChild(newEpisodeId);
            newEpisodeId.addEventListener('click', getEpisodeInfo)
        })
    })
    pageId++
}

root.appendChild(creatHeader());
root.appendChild(sideBar(await getEpisodes()));
root.appendChild(episodeInfoContainer);