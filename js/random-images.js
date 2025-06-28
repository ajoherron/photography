// Auto-generated random image picker (no bias towards smaller galleries)
function showRandomImage() {
    // Get all images from all galleries
    const galleryImages = {'gallery1': ['bridge', 'cross', 'lamp', 'stairs'], 'gallery10': ['book_club', 'cannon', 'cozy', 'flock', 'focus', 'haze', 'heist', 'shine', 'snacking', 'tundra', 'vanishing'], 'gallery11': ['basking', 'beam', 'cradle', 'flock', 'frame', 'old_school', 'puddle', 'sheet', 'snow_day', 'split', 'stroll', 'thorny'], 'gallery12': ['aligned', 'cage', 'capture', 'focus', 'galaxy', 'golden', 'hangout', 'net', 'snowglobe', 'stance', 'tracks', 'tunnel'], 'gallery13': ['Timothy', 'creek', 'docks', 'edge', 'frozen', 'grab', 'grin', 'hedgehog', 'perch', 'soar', 'stare', 'sunny', 'toothy'], 'gallery14': ['beach', 'clear', 'downhill', 'field', 'lineup', 'pentagon', 'pier', 'pose', 'rings', 'riverside', 'scritch', 'sinister', 'stare', 'sunblock', 'sunnies'], 'gallery15': ['balance', 'bridge', 'catch', 'crowd', 'finale', 'finish', 'focus', 'green', 'kisses', 'marathon', 'pose', 'sail', 'stare', 'statuesque', 'trees', 'wave'], 'gallery16': ['backbay', 'commonwealth', 'downtown', 'focus', 'lines', 'ominous', 'sundown', 'texture', 'tower', 'windsurf'], 'gallery17': ['brothers', 'cheese', 'chilly', 'cousins', 'cove', 'dune', 'fenway', 'field', 'smile'], 'gallery2': ['arches', 'bench', 'boat', 'fountain', 'intrepid', 'path', 'pier', 'reservoir', 'road', 'sunny', 'sunset', 'twist'], 'gallery3': ['boat', 'flowers', 'kayak', 'lawn', 'lines', 'room', 'seagull', 'town_hall', 'trees', 'tucked_in', 'tunnel'], 'gallery4': ['clouds', 'columns', 'ghostly', 'glimmer', 'glow', 'hudson', 'ivy', 'performance', 'red', 'shine', 'tilted', 'traffic', 'wood', 'yellow'], 'gallery5': ['arch', 'backdrop', 'bridge', 'church', 'cleaning', 'fountain', 'ivy', 'monument', 'pond', 'rat', 'reservoir', 'riverside', 'tear', 'waves'], 'gallery6': ['Lindor', 'Ohtani', 'basking', 'crash', 'field', 'flowers', 'foliage', 'gull', 'paraglider', 'park', 'path', 'rowboats', 'subway', 'sunrise', 'sunset', 'surfer', 'tracks', 'triplet', 'view'], 'gallery7': ['bench', 'bridge', 'chess', 'fall', 'fire', 'gradient', 'leaves', 'marathon', 'moon', 'orange', 'pastel', 'yellow'], 'gallery8': ['dual_reflections', 'ducks', 'heavenly_1', 'heavenly_2', 'heavenly_3', 'heavenly_4', 'ice', 'serene', 'silhouettes', 'spikes', 'stone', 'tree'], 'gallery9': ['center', 'flurry', 'follow', 'glow', 'gradient', 'party', 'pathway', 'peaking', 'rocky', 'setting', 'shadows'], 'gallery_cat': ['bookshelf', 'box', 'cleaning', 'closet', 'couch', 'feisty', 'fierce', 'floor', 'frozen', 'gnaw', 'hunting', 'lamp', 'lust', 'nap', 'pensive', 'perch', 'pose', 'sink', 'stare', 'stretch', 'string', 'sunbeam', 'sunny', 'thirsty', 'thumbs', 'trot', 'twins', 'wild', 'window', 'wrestling']};
    
    // Build flat array of all images with their gallery info
    const allImages = [];
    for (const gallery in galleryImages) {
        const imagesInGallery = galleryImages[gallery];
        for (const image of imagesInGallery) {
            allImages.push({gallery: gallery, image: image});
        }
    }
    
    // Pick one random image from the entire collection
    const randomSelection = allImages[Math.floor(Math.random() * allImages.length)];
    
    // Update the display
    const imagePath = `images/${randomSelection.gallery}/${randomSelection.image}.jpg`;
    const galleryPath = `galleries/${randomSelection.gallery}.html`;
    
    document.getElementById('randomImage').src = imagePath;
    document.getElementById('randomImage').alt = randomSelection.image;
    document.getElementById('imageInfo').textContent = `${randomSelection.image} from ${randomSelection.gallery}`;
    document.getElementById('galleryLink').href = galleryPath;
    document.getElementById('randomImageContainer').style.display = 'block';
}