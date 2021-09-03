  
import { createHeader } from "./header.js";
import { createSidebar } from "./sidebar.js";
import { createContent } from "./mainContent.js";
import { getEpisode } from "./api.js";

async function init() {
  let contentNode = null;

  const root = document.getElementById("root");
  const flexContainerId = "flex-container";
  createHeader(root, "Rick & Morty");
  await createSidebar(root, flexContainerId, linkCallback);
  const flexContainer = document.getElementById(flexContainerId);

  async function linkCallback(id) {
    const content = await getEpisode(id);
    contentNode = createContent(flexContainer, content, contentNode);
  }
}

init();
