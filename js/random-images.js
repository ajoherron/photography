// Auto-generated random image picker
function showRandomImage() {
    // Get all gallery directories dynamically
    const galleryDirs = ['gallery1', 'gallery10', 'gallery11', 'gallery12', 'gallery13', 'gallery14', 'gallery15', 'gallery16', 'gallery17', 'gallery2', 'gallery3', 'gallery4', 'gallery5', 'gallery6', 'gallery7', 'gallery8', 'gallery9'];
    
    // Pick random gallery
    const randomGallery = galleryDirs[Math.floor(Math.random() * galleryDirs.length)];
    
    // Get images for this gallery
    const galleryImages = {'gallery1': ['bridge', 'cross', 'lamp', 'stairs'], 'gallery10': ['book_club', 'cannon', 'cozy', 'flock', 'focus', 'haze', 'heist', 'shine', 'snacking', 'tundra', 'vanishing'], 'gallery11': ['basking', 'beam', 'cradle', 'flock', 'frame', 'old_school', 'puddle', 'sheet', 'snow_day', 'split', 'stroll', 'thorny'], 'gallery12': ['aligned', 'cage', 'capture', 'focus', 'galaxy', 'golden', 'hangout', 'net', 'snowglobe', 'stance', 'tracks', 'tunnel'], 'gallery13': ['Timothy', 'creek', 'docks', 'edge', 'frozen', 'grab', 'grin', 'hedgehog', 'perch', 'soar', 'stare', 'sunny', 'toothy'], 'gallery14': ['beach', 'clear', 'downhill', 'field', 'lineup', 'pentagon', 'pier', 'pose', 'rings', 'riverside', 'scritch', 'sinister', 'stare', 'sunblock', 'sunnies'], 'gallery15': ['balance', 'bridge', 'catch', 'crowd', 'finale', 'finish', 'focus', 'green', 'kisses', 'marathon', 'pose', 'sail', 'stare', 'statuesque', 'trees', 'wave'], 'gallery16': ['focus'], 'gallery17': ['chilly'], 'gallery2': ['arches', 'bench', 'boat', 'fountain', 'intrepid', 'path', 'pier', 'reservoir', 'road', 'sunny', 'sunset', 'twist'], 'gallery3': ['boat', 'flowers', 'kayak', 'lawn', 'lines', 'room', 'seagull', 'town_hall', 'trees', 'tucked_in', 'tunnel'], 'gallery4': ['clouds', 'columns', 'ghostly', 'glimmer', 'glow', 'hudson', 'ivy', 'performance', 'red', 'shine', 'tilted', 'traffic', 'wood', 'yellow'], 'gallery5': ['arch', 'backdrop', 'bridge', 'church', 'cleaning', 'fountain', 'ivy', 'monument', 'pond', 'rat', 'reservoir', 'riverside', 'tear', 'waves'], 'gallery6': ['Lindor', 'Ohtani', 'basking', 'crash', 'field', 'flowers', 'foliage', 'gull', 'paraglider', 'park', 'path', 'rowboats', 'subway', 'sunrise', 'sunset', 'surfer', 'tracks', 'triplet', 'view'], 'gallery7': ['bench', 'bridge', 'chess', 'fall', 'fire', 'gradient', 'leaves', 'marathon', 'moon', 'orange', 'pastel', 'yellow'], 'gallery8': ['dual_reflections', 'ducks', 'heavenly_1', 'heavenly_2', 'heavenly_3', 'heavenly_4', 'ice', 'serene', 'silhouettes', 'spikes', 'stone', 'tree'], 'gallery9': ['center', 'flurry', 'follow', 'glow', 'gradient', 'party', 'pathway', 'peaking', 'rocky', 'setting', 'shadows']};
    
    // Pick random image from that gallery
    const imagesInGallery = galleryImages[randomGallery];
    const randomImageName = imagesInGallery[Math.floor(Math.random() * imagesInGallery.length)];
    
    // Update the display
    const imagePath = `images/${randomGallery}/${randomImageName}.jpg`;
    const galleryPath = `galleries/${randomGallery}.html`;
    
    document.getElementById('randomImage').src = imagePath;
    document.getElementById('randomImage').alt = randomImageName;
    document.getElementById('imageInfo').textContent = `${randomImageName} from ${randomGallery}`;
    document.getElementById('galleryLink').href = galleryPath;
    document.getElementById('randomImageContainer').style.display = 'block';
}