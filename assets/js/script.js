"use strict";

// wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
  // get references to the header, menu toggle button, navigation menu, and navigation links
  var header = document.getElementById("site-header");
  var menuToggle = document.getElementById("menu-toggle");
  var navMenu = document.getElementById("nav-menu");
  var navLinks = document.querySelectorAll("#nav-menu a");
  // stores the previous scroll position and the threshold for hiding the header
  var lastScrollTop = 0;
  var scrollThreshold = 100;

  // if any of the required elements are missing, exit the function
  if (!header || !menuToggle || !navMenu) {
    return;
  }

  // function to open the navigation menu and change the toggle button to a close icon
  function openMenu() {
    // add the "show" class to the navigation menu to display it
    navMenu.classList.add("show");
    // change the menu toggle button text to a close icon
    menuToggle.textContent = "✕";
  }

  // function to close the navigation menu and change the toggle button back to a hamburger icon
  function closeMenu() {
    // remove the "show" class from the navigation menu to hide it
    navMenu.classList.remove("show");
    // change the menu toggle button text back to a hamburger icon
    menuToggle.textContent = "☰";
  }

  // function to toggle the navigation menu when the menu toggle button is clicked
  function toggleMenu(event) {
    // prevent the click event from propagating to the document, which would immediately close the menu
    event.stopPropagation();

    // check if the navigation menu is currently shown; if it is, close it, otherwise open it
    if (navMenu.classList.contains("show")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // add a click event listener to the menu toggle button to toggle the navigation menu
  menuToggle.addEventListener("click", toggleMenu);

  // add click event listeners to each navigation link to close the menu when a link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  // add a click event listener to the document to close the menu if a click occurs outside of the header
  document.addEventListener("click", function (event) {
    // check if the click occurred inside the header; if it did not and the menu is currently shown, close the menu
    var clickedInsideHeader = header.contains(event.target);

    if (!clickedInsideHeader && navMenu.classList.contains("show")) {
      closeMenu();
    }
  });

  // add a scroll event listener to the window to hide or show the header based on the scroll direction and position
  window.addEventListener("scroll", function () {
    // get the current scroll position of the page
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // if the navigation menu is currently shown, keep the header visible and update the last scroll position, then exit the function
    if (navMenu.classList.contains("show")) {
      header.style.top = "0";
      lastScrollTop = scrollTop;
      return;
    }

    // if the scroll position is near the top of the page, show the header; if the user is scrolling down and has scrolled past the threshold, hide the header; otherwise, show the header
    if (scrollTop < 10) {
      header.style.top = "0";
    } else if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      header.style.top = "-" + header.offsetHeight + "px";
    } else {
      header.style.top = "0";
    }

    // update the last scroll position to the current scroll position for the next scroll event
    lastScrollTop = scrollTop;
  });
});
