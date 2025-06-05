document.addEventListener('DOMContentLoaded', () => {
  // Optional: JavaScript to handle hover fallback for dropdowns (if needed)

  document.querySelectorAll('.dropdown-wrapper').forEach(wrapper => {
    const dropdown = wrapper.querySelector('.dropdown-box');

    wrapper.addEventListener('mouseenter', () => {
      dropdown.style.display = 'flex';
    });

    wrapper.addEventListener('mouseleave', () => {
      dropdown.style.display = 'none';
    });
  });

  // Toggle mobile menu and icons
  const toggleButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (toggleButton && mobileMenu) {
    const openIcon = toggleButton.querySelector('.open-icon');
    const closeIcon = toggleButton.querySelector('.close-icon');

    toggleButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const isActive = mobileMenu.classList.contains('active');
      if (openIcon) openIcon.style.display = isActive ? 'none' : 'inline';
      if (closeIcon) closeIcon.style.display = isActive ? 'inline' : 'none';
    });
  }
});