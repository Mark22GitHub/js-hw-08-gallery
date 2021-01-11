import galleryItems from './gallery-items.js'

const ul = document.querySelector('.js-gallery');
const div = document.querySelector('.js-lightbox');
const image = document.querySelector('.lightbox__image');
const buttonX = document.querySelector("[data-action=close-lightbox]");
const overlay = document.querySelector(".lightbox__overlay");

galleryItems.map((item , index) => {
    const li = document.createElement('li');
    li.classList.add('gallery__item');

    const a = document.createElement('a');
    a.classList.add('gallery__link');
    a.setAttribute('href' , item.original);

    const img = document.createElement('img');
    img.classList.add('gallery__image');
    img.setAttribute('src' , item.preview);
    img.setAttribute('data-source', item.original);
    img.setAttribute('alt', item.description);
    img.setAttribute('data-index', index);


    ul.append(li);
    li.append(a);
    a.append(img);
})

ul.addEventListener('click', (event) => {
     event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const imageRef = event.target;
    const imageURL = imageRef.dataset.source;
    div.classList.add('is-open');
    image.src = imageURL;
    image.dataset.index = event.target.dataset.index;

});

function close() {
    div.classList.remove('is-open');
    image.src = "";
}

buttonX.addEventListener('click', () => {
    close();
})

window.addEventListener('click', (event) => {
    if (event.target === overlay) {
        close();
    }
})

window.addEventListener('keydown', (event) => {
if (event.code === 'Escape') {
    close();
    }
});

function newSrc(step, index) {
    image.dataset.index = step + index;
    image.src = galleryItems[step + index].original;
}

function arrowLeft() {
    const index = Number(image.dataset.index);
  if (index === 0) {
      newSrc(0, galleryItems.length - 1);
      return;
  }
    newSrc(-1, index);
}

function arrowRight() {
    const index = Number(image.dataset.index);
  if (index === galleryItems.length - 1) {
      newSrc(0, 0);
      return;
  }
    newSrc(1, index);
}

window.addEventListener('keydown', (event) => {
if (event.key === 'ArrowLeft') {
    arrowLeft();
}
else if (event.key === 'ArrowRight') {
    arrowRight();
  }
});