function createContent(node, content, prevContentNode) {
    if (prevContentNode) {
      node.removeChild(prevContentNode);
    }
  
    const html = `<div class ="flex-none pl-6"><p class="card bordered">
      <div><h1>${content.name}</h1></div>
      <div>${content.air_date} | ${content.episode}</div>
    </div></div>`;
    const newDiv = document.createElement("div");
    newDiv.innerHTML = html;
    node.appendChild(newDiv);
  
    return newDiv;
}
  
export { createContent };