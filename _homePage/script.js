import projectsData from './data.js';

const containerEl = document.getElementById('app__container');
//https://mrchappie.github.io/10.card_expand_on_click/index.html
//https://github.com/mrchappie/mrchappie.github.io/tree/main/1.sidebar_nav

function generateCards(projectName, projectRef, projectImg) {
  const divEl = document.createElement('div');
  divEl.classList.add('project');

  const imgEl = document.createElement('img');
  imgEl.src = projectImg;
  imgEl.alt = projectName;
  divEl.appendChild(imgEl);

  const secDivEl = document.createElement('div');
  secDivEl.classList.add('project__info');
  const headingEl = document.createElement('h4');
  headingEl.classList.add('project__name');
  headingEl.textContent = projectName;
  const codeLinkEl = document.createElement('a');
  codeLinkEl.href = `https://github.com/mrchappie/mrchappie.github.io/tree/main/${projectRef}`;
  codeLinkEl.textContent = 'Source Code';
  codeLinkEl.target = '_blank';
  const demoLinkEl = document.createElement('a');
  demoLinkEl.href = `https://mrchappie.github.io/${projectRef}/index.html`;
  demoLinkEl.textContent = 'Live Demo';
  demoLinkEl.target = '_blank';

  secDivEl.appendChild(headingEl);
  secDivEl.appendChild(codeLinkEl);
  secDivEl.appendChild(demoLinkEl);
  divEl.append(secDivEl);

  containerEl.appendChild(divEl);
}

Object.values(projectsData).forEach((project) => {
  generateCards(
    project.projectName,
    project.projectCodeRef,
    project.projectImg
  );
});
