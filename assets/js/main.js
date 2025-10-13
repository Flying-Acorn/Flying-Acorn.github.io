function toggleNavbar() {
    const navbar = document.querySelector('nav ul');
    navbar.classList.toggle('active');
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('transparent');
    } else {
        navbar.classList.remove('transparent');
    }
});

// Load service templates from embedded JSON in index.html
// To edit templates: find the <script id="contact-templates"> in index.html
// - Add/edit fields in "fields" dictionary
// - Compose services by listing field IDs in "services"
let templateData = {};

function buildTemplateText(fieldIds) {
  if (!fieldIds || !Array.isArray(fieldIds)) return '';
  return fieldIds
    .map(id => templateData.fields[id])
    .filter(text => text) // Remove undefined fields
    .join('\n\n');
}

// Load templates from embedded JSON script
try {
  const templateScript = document.getElementById('contact-templates');
  if (templateScript) {
    templateData = JSON.parse(templateScript.textContent);
  }
} catch (error) {
  console.error('Error parsing templates:', error);
}

// Attach the event listener
document.getElementById('service-select').addEventListener('change', function() {
  const selectedService = this.value;
  const textarea = document.querySelector('.contact-form textarea');
  const fieldIds = templateData.services ? templateData.services[selectedService] : null;
  textarea.value = fieldIds ? buildTemplateText(fieldIds) : '';
});