const btnEl = document.querySelector(".btn");


btnEl.addEventListener("mouseover", (event) => {
  const x = event.pageX - btnEl.offsetLeft;
  const y = event.pageY - btnEl.offsetTop;

  btnEl.style.setProperty("--xPos", x + "px");
  btnEl.style.setProperty("--yPos", y + "px");
});

const apiKey = 'i3ZjcLSLTp5reB3CVZyA9aBrKcbFcLz_oUkAqUNAbhY';
const apiUrl = 'https://api.unsplash.com/search/photos';
const error = document.getElementById('error');

let currentPage = 1;
let currentQuery = '';


const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  searchImages(); 
});

const searchImages = () => {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        error.textContent = 'Please enter a search term.';
        return;
    }

    error.textContent = '';
    currentQuery = query;
    currentPage = 1;
    document.getElementById('imageContainer').innerHTML = ''; 
    fetchImages();
};

const loadMoreImages = () => {
    currentPage++;
    fetchImages();
};

const fetchImages = () => {
    fetch(`${apiUrl}?query=${currentQuery}&page=${currentPage}&per_page=10&client_id=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('imageContainer');
            if (data.results.length === 0) {
                error.innerHTML = '<p>No images found. Try a different search term.</p>';
                document.getElementById('loadMoreContainer').style.display = 'none';
                return;
            }

            data.results.forEach(img => {
                const link = document.createElement('a');
                link.href = img.links.html;
                link.target = '_blank';
                const image = document.createElement('img');
                image.src = img.urls.small;
                image.alt = img.alt_description || 'Image';
                link.appendChild(image);
                container.appendChild(link);
            });

            if (data.results.length < 10) {
                document.getElementById('loadmorecontainer').style.display = 'none';
            } else {
                document.getElementById('loadmorecontainer').style.display = 'block';
            }
        })
        .catch(err => {
            error.textContent = 'Failed to fetch images. Please try again later.';
            console.error(err);
        });
};

