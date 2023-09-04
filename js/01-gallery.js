import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryList = document.querySelector(".gallery");

function createGalleryItem({ preview, original, description }) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
      </a>
    </li>`;
}

const markup = galleryItems.map(createGalleryItem).join("");

galleryList.insertAdjacentHTML("beforeend", markup);
galleryList.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();

  //   if (!event.target.closest(".gallery__image")) {
  //     return;
  //   }

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const source = event.target.dataset.source;
  const alt = event.target.alt;

  const instance = basicLightbox.create(
    `<img src="${source}" alt="${alt}" width="800">`,
    {
      onShow: (instance) => window.addEventListener("keydown", modalClose),
      onClose: (instance) => window.removeEventListener("keydown", modalClose),
    }
  );

  instance.show();

  window.addEventListener("keydown", modalClose);

  function modalClose(event) {
    if (event.key === "Escape") {
      instance.close();
      window.removeEventListener("keydown", modalClose);
    }
  }
}

console.log(galleryItems);
