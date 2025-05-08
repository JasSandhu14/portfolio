console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a");

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname,
// );

// currentLink?.classList.add('current');

let pages = [
    { url: '', title: 'Home' },
    { url: 'resume/', title: 'Resume'},
    { url: 'projects/', title: 'Projects' },
    { url: 'https://github.com/JasSandhu14', title: 'GitHub'},
    { url: 'contact/', title: 'Contact'},
    { url: 'meta/', title: 'Meta'}
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  // next step: create link and add it to nav

  const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                                    // Local server
  : "/portfolio/";             // GitHub Pages repo name

  url = !url.startsWith('http') ? BASE_PATH + url : url;

  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  nav.append(a);

  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }
  
  if (a.host != location.host){
    a.target = "_blank"
  }
}  

document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
			<option value='light dark'>Automatic</option>
      <option value='light'>Light</option>
      <option value='dark'>Dark</option>
		</select>
	</label>`,
);

const select = document.querySelector('select')

select.addEventListener('input', function (event) {
  console.log('color scheme changed to', event.target.value);
  document.documentElement.style.setProperty('color-scheme', event.target.value);
  localStorage.colorScheme = event.target.value;
});

if ("colorScheme" in localStorage){
  select.value = localStorage.colorScheme;
  document.documentElement.style.setProperty('color-scheme', select.value);
}

export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  // Fallback in case containerElement is null
  if (!containerElement) {
    console.warn('No valid container element provided.');
    return;
  }

  // Clear out any previous content
  containerElement.innerHTML = '';

  // Validate heading level
  const validHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const tag = validHeadings.includes(headingLevel) ? headingLevel : 'h2';

  projects.forEach(project => {
    const article = document.createElement('article');
    const title = project.title || 'Untitled';
    const image = project.image || '';
    const description = project.description || 'No description provided';
    const year = project.year || '';

    article.innerHTML = `
      <${tag}>${title}</${tag}>
      <img src="${image}" alt="${title}">
      <div>
      <p>${description}</p>
      <p style="font-family: Baskerville; color:gray; font-variant-numeric: oldstyle-nums">${year}</p>
      </div>
    `;

    containerElement.appendChild(article);
  });
}

export async function fetchGitHubData(username){
  return fetchJSON(`https://api.github.com/users/${username}`);
}