const gallery = document.querySelector(".gallery");
const search = document.querySelector("#search");

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeBtn = document.querySelector("#close");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

const buttons = document.querySelectorAll(".filter-btn");

const images = [
  {
    title: "Mountain",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
  },
  {
    title: "Ocean",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
  },
  {
    title: "Forest",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"
  },
  {
    title: "City",
    category: "Travel",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800"
  },
  {
    title: "Desert",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"
  },
  {
    title: "Flowers",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800"
  }
];

let currentImages = [...images];
let currentIndex = 0;

function displayImages(data) {
  gallery.innerHTML = "";

  data.forEach((image, index) => {
    gallery.innerHTML += `
      <div class="card" onclick="openLightbox(${index})">
        <img src="${image.url}" alt="${image.title}">
        <h3>${image.title}</h3>
      </div>
    `;
  });

  currentImages = data;
}

displayImages(images);

// Search
search.addEventListener("keyup", () => {
  const value = search.value.toLowerCase();

  const filtered = images.filter(image =>
    image.title.toLowerCase().includes(value) ||
    image.category.toLowerCase().includes(value)
  );

  displayImages(filtered);
});

// Category Filters
buttons.forEach(button => {

  button.addEventListener("click", () => {

    buttons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    const category = button.dataset.category;

    if (category === "All") {
      displayImages(images);
    } else {
      const filtered = images.filter(image => image.category === category);
      displayImages(filtered);
    }

  });

});

// Lightbox
function openLightbox(index) {

  currentIndex = index;

  lightbox.style.display = "flex";

  lightboxImage.src = currentImages[currentIndex].url;

}

window.openLightbox = openLightbox;

// Close
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Next
nextBtn.addEventListener("click", () => {

  currentIndex++;

  if (currentIndex >= currentImages.length) {
    currentIndex = 0;
  }

  lightboxImage.src = currentImages[currentIndex].url;

});

// Previous
prevBtn.addEventListener("click", () => {

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = currentImages.length - 1;
  }

  lightboxImage.src = currentImages[currentIndex].url;

});

// Close when clicking outside the image
lightbox.addEventListener("click", (e) => {

  if (e.target === lightbox) {

    lightbox.style.display = "none";

  }

});