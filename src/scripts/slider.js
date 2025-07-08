const imageList = document.querySelector('.slider__items');
const slideButtons = document.querySelectorAll('.slider-controls__button');
const sliderScrollbar = document.querySelector('.slider-scrollbar');
const scrollbarThumb = document.querySelector('.slider-scrollbar__thumb');

let sliderMaxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
scrollbarThumb.style.width = `${(imageList.clientWidth / imageList.scrollWidth) * 100}%`;
const updateMaxScrollLeft = () => {
  sliderMaxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
};
const updateScrollbarWidth = () => {
  scrollbarThumb.style.width = `${(imageList.clientWidth / imageList.scrollWidth) * 100}%`;
};

slideButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.id === 'btn-prev' ? -1 : 1;
    let scrollAmount = sliderScrollbar.clientWidth * direction;
    imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
});

const updateThumbPosition = () => {
  const scrollPosition = imageList.scrollLeft;
  const thumbPosition =
    (scrollPosition / sliderMaxScrollLeft) *
    (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);

  scrollbarThumb.style.left = `${thumbPosition}px`;
};
imageList.addEventListener('scroll', updateThumbPosition);

document.addEventListener('mousedown', (mouseDownEvent) => {
  if (mouseDownEvent.target !== scrollbarThumb) {
    return;
  }

  const startX = mouseDownEvent.clientX;
  const thumbPosition = scrollbarThumb.offsetLeft;
  document.body.style.cursor = 'grabbing';
  document.body.style.userSelect = 'none';

  const handleMouseMove = (mouseMoveEvent) => {
    const deltaX = mouseMoveEvent.clientX - startX;
    const newThumbPosition = thumbPosition + deltaX;
    const maxThumbPosition = sliderScrollbar.offsetWidth - scrollbarThumb.offsetWidth;
    const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
    const scrollPosition = (boundedPosition / maxThumbPosition) * sliderMaxScrollLeft;

    scrollbarThumb.style.left = `${boundedPosition}px`;
    imageList.scrollLeft = scrollPosition;
  };

  const handleMouseUp = () => {
    document.body.style.cursor = 'default';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});

window.addEventListener('resize', () => {
  updateMaxScrollLeft();
  updateScrollbarWidth();
});
