document.addEventListener('DOMContentLoaded', () => {
  fetch('paintings.json')
    .then(response => response.json())
    .then(data => {
      const ul = document.querySelector('#paintings ul');
      const figure = document.querySelector('figure');
      const full = document.querySelector('#full');
      const title = document.querySelector('#title');
      const artist = document.querySelector('#artist');
      const description = document.querySelector('#description');

      // Add thumbnails
      data.forEach(painting => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = `images/sm/${painting.id}.jpg`;
        img.alt = painting.title;
        img.dataset.id = painting.id;
        li.appendChild(img);
        ul.appendChild(li);
      });

      // Click handler using delegation
      ul.addEventListener('click', e => {
        if (e.target.tagName === 'IMG') {
          const id = e.target.dataset.id;
          const painting = data.find(p => p.id === id);

          // Update image, title, artist
          figure.innerHTML = '';
          full.src = `images/lg/${painting.id}.jpg`;
          full.alt = painting.title;
          figure.appendChild(full);

          title.textContent = painting.title;
          artist.textContent = painting.artist;

          // Add rectangles for features
          painting.features.forEach(feature => {
            const box = document.createElement('div');
            box.classList.add('box');

            const [x1, y1] = feature.upperLeft;
            const [x2, y2] = feature.lowerRight;
            const width = x2 - x1;
            const height = y2 - y1;

            box.style.position = 'absolute';
            box.style.left = `${x1}px`;
            box.style.top = `${y1}px`;
            box.style.width = `${width}px`;
            box.style.height = `${height}px`;

            box.addEventListener('mouseover', () => {
              description.textContent = feature.description;
            });

            box.addEventListener('mouseout', () => {
              description.textContent = '';
            });

            figure.appendChild(box);
          });
        }
      });
    })
    .catch(err => console.error('Error loading painting data:', err));
});
