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

// Load templates from embedded JSON script
try {
  const templateScript = document.getElementById('contact-templates');
  if (templateScript) {
    templateData = JSON.parse(templateScript.textContent);
  }
} catch (error) {
  console.error('Error parsing templates:', error);
}

// Create dynamic form fields based on selected service
function createDynamicFields(fieldIds) {
  const dynamicFieldsContainer = document.getElementById('dynamic-fields');
  // Clear existing dynamic fields
  dynamicFieldsContainer.innerHTML = '';
  
  if (!fieldIds || !Array.isArray(fieldIds) || fieldIds.length === 0) {
    return;
  }
  
  // Create form fields for each field ID
  fieldIds.forEach(fieldId => {
    const fieldLabel = templateData.fields[fieldId];
    if (!fieldLabel) return;
    
    const fieldWrapper = document.createElement('div');
    fieldWrapper.className = 'dynamic-field';
    
    // Create textarea for multi-line inputs, input for single-line
    const isLongField = fieldId.includes('idea') || fieldId.includes('describe') || fieldId.includes('requirements') || fieldId.includes('needs') || fieldId.includes('details');
    
    if (isLongField) {
      const textarea = document.createElement('textarea');
      textarea.name = fieldId;
      textarea.placeholder = fieldLabel;
      textarea.rows = 3;
      fieldWrapper.appendChild(textarea);
    } else {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = fieldId;
      input.placeholder = fieldLabel;
      fieldWrapper.appendChild(input);
    }
    
    dynamicFieldsContainer.appendChild(fieldWrapper);
  });
}

// Attach the event listener
document.getElementById('service-select').addEventListener('change', function() {
  const selectedService = this.value;
  const textarea = document.querySelector('.contact-form textarea[name="message"]');
  const fieldIds = templateData.services ? templateData.services[selectedService] : null;
  
  // Prefill the message textarea with service-specific message
  if (fieldIds && fieldIds.length > 0 && templateData.messages && templateData.messages[selectedService]) {
    textarea.value = templateData.messages[selectedService];
  } else {
    textarea.value = '';
  }
  
  // Create dynamic fields
  createDynamicFields(fieldIds);
});