import { fetchJSON, renderProjects} from './global.js';
/* removed fetchGithubData from imports as it was not showing projects correctly */

const projects = await fetchJSON('./lib/projects.json');
const latestProjects = projects.slice(0, 3);

const projectsContainer = document.querySelector('.projects');
console.log(latestProjects)
renderProjects(latestProjects, projectsContainer, 'h2');