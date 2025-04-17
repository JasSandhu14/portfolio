console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a");
// console.log(navLinks);

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname,
// );

// console.log(currentLink);
// currentLink?.classList.add('current');
// console.log(currentLink);

let pages = [
    { url: '', title: 'Home' },
    { url: 'resume/', title: 'Resume'},
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact'},
    // add the rest of your pages here
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // next step: create link and add it to nav
    nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
}  

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "/"                           // Local server
    : "/jassandhu14.github.io/";    // GitHub Pages repo name


url = !url.startsWith('http') ? BASE_PATH + url : url;