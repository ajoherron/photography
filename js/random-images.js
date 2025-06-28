// Static random image picker using Math.random()

let galleryImages = null;

// Load gallery data once
fetch('js/gallery-data.json')
  .then(response => response.json())
  .then(data => {
    galleryImages = data;
  })
  .catch(error => console.error('Error loading gallery data:', error));

function showRandomImage() {
    if (!galleryImages) {
        console.log('Gallery data still loading...');
        return;
    }
    
    // Build flat array of all images
    const allImages = [];
    for (const gallery in galleryImages) {
        const imagesInGallery = galleryImages[gallery];
        for (const image of imagesInGallery) {
            allImages.push({gallery: gallery, image: image});
        }
    }
    
    // Use built-in Math.random()
    const randomIndex = Math.floor(Math.random() * allImages.length);
    const randomSelection = allImages[randomIndex];
    
    // Update display
    updateDisplay(randomSelection, 'Math.random()');
}

function updateDisplay(randomSelection, algorithmName) {
    const imagePath = `images/${randomSelection.gallery}/${randomSelection.image}.jpg`;
    const galleryPath = `galleries/${randomSelection.gallery}.html`;
    
    document.getElementById('randomImage').src = imagePath;
    document.getElementById('randomImage').alt = randomSelection.image;
    document.getElementById('imageInfo').textContent = `${randomSelection.image} from ${randomSelection.gallery}`;
    document.getElementById('galleryLink').href = galleryPath;
    document.getElementById('randomImageContainer').style.display = 'block';
}