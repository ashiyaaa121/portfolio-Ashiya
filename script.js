/* ----------------------------------------------------
   1. MOBILE MENU TOGGLE
---------------------------------------------------- */

// Create a menu button dynamically (since your HTML has none)
const navbar = document.querySelector('.navbar');

const menuButton = document.createElement('button');
menuButton.id = 'menu-button';
menuButton.textContent = '☰'; 
menuButton.setAttribute('aria-label', 'Menu');
menuButton.style.fontSize = '24px';
menuButton.style.background = 'none';
menuButton.style.border = 'none';
menuButton.style.cursor = 'pointer';
menuButton.style.display = 'none'; // JS will show it on mobile

navbar.insertBefore(menuButton, navbar.children[1]);

const navLinks = document.getElementById('navLinks');

// Show/hide button only on mobile
function checkScreenWidth() {
  if (window.innerWidth < 768) {
    menuButton.style.display = 'block';
    navLinks.style.display = 'none';
  } else {
    menuButton.style.display = 'none';
    navLinks.style.display = 'flex';
    navLinks.classList.remove('open');
  }
}
checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);

function toggleMenu() {
  navLinks.classList.toggle('open');

  if (navLinks.classList.contains('open')) {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.gap = '1rem';
    menuButton.textContent = '✕';
  } else {
    navLinks.style.display = 'none';
    menuButton.textContent = '☰';
  }
}

menuButton.addEventListener('click', toggleMenu);

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      toggleMenu();
    }
  });
});


/* ----------------------------------------------------
   2. SCROLL INDICATOR (Progress Bar)
---------------------------------------------------- */

// Create the scroll bar at top
const scrollBar = document.createElement('div');
scrollBar.style.position = 'fixed';
scrollBar.style.top = '0';
scrollBar.style.left = '0';
scrollBar.style.height = '4px';
scrollBar.style.background = '#6b21a8';
scrollBar.style.width = '0%';
scrollBar.style.zIndex = '9999';

document.body.appendChild(scrollBar);

function updateScrollBar() {
  let scrollTop = window.scrollY;
  let height = document.documentElement.scrollHeight - window.innerHeight;
  let scrolled = (scrollTop / height) * 100;
  scrollBar.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollBar);


/* ----------------------------------------------------
   3. CONTACT FORM VALIDATION
---------------------------------------------------- */

const form = document.querySelector('form');

// Create message box below form
const messageBox = document.createElement('div');
messageBox.style.marginTop = '1rem';
messageBox.style.fontWeight = '600';
form.appendChild(messageBox);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]');
  const email = form.querySelector('input[type="email"]');
  const msg = form.querySelector('textarea');

  let errors = [];

  if (name.value.trim() === "") {
    errors.push("Name is required.");
  }

  if (email.value.trim() === "") {
    errors.push("Email is required.");
  }

  if (msg.value.trim() === "") {
    errors.push("Message cannot be empty.");
  }

  if (errors.length > 0) {
    messageBox.style.color = "red";
    messageBox.innerHTML = errors.join("<br>");
  } else {
    messageBox.style.color = "green";
    messageBox.textContent = "Thank you! Your message has been received.";

    // Optional: Clear form
    form.reset();
  }
});
