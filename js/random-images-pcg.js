// Static PCG random image picker

let galleryImagesPCG = null;

// Load gallery data once
fetch('js/gallery-data.json')
  .then(response => response.json())
  .then(data => {
    galleryImagesPCG = data;
  })
  .catch(error => console.error('Error loading gallery data:', error));

// PCG Implementation
class PCG {
    constructor(seed = null) {
        if (seed === null) {
            seed = Date.now() ^ (Math.random() * 0x100000000);
        }
        
        this.state = BigInt(seed) & 0xffffffffffffffffn;
        this.inc = 1013904223n;
        this.next(); // Advance once to scramble initial state
    }
    
    next() {
        const oldstate = this.state;
        this.state = (oldstate * 6364136223846793005n + this.inc) & 0xffffffffffffffffn;
        
        const xorshifted = Number((oldstate >> 18n) ^ oldstate) >>> 0;
        const rot = Number(oldstate >> 59n);
        
        return ((xorshifted >>> rot) | (xorshifted << ((-rot) & 31))) >>> 0;
    }
    
    random() {
        return this.next() / 0x100000000;
    }
}

// Global PCG instance
const pcgGenerator = new PCG();

function showRandomImagePCG() {
    if (!galleryImagesPCG) {
        console.log('Gallery data still loading...');
        return;
    }
    
    // Build flat array of all images
    const allImages = [];
    for (const gallery in galleryImagesPCG) {
        const imagesInGallery = galleryImagesPCG[gallery];
        for (const image of imagesInGallery) {
            allImages.push({gallery: gallery, image: image});
        }
    }
    
    // Use PCG algorithm
    const randomIndex = Math.floor(pcgGenerator.random() * allImages.length);
    const randomSelection = allImages[randomIndex];
    
    // Update display
    updateDisplay(randomSelection, 'PCG');
}

function updateDisplay(randomSelection, algorithmName) {
    const imagePath = `images/${randomSelection.gallery}/${randomSelection.image}.jpg`;
    const galleryPath = `galleries/${randomSelection.gallery}.html`;
    
    document.getElementById('randomImage').src = imagePath;
    document.getElementById('randomImage').alt = randomSelection.image;
    document.getElementById('imageInfo').textContent = `${randomSelection.image} from ${randomSelection.gallery} (${algorithmName})`;
    document.getElementById('galleryLink').href = galleryPath;
    document.getElementById('randomImageContainer').style.display = 'block';
}