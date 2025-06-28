// Static Mersenne Twister random image picker

let galleryImagesMersenne = null;

// Load gallery data once
fetch('js/gallery-data.json')
  .then(response => response.json())
  .then(data => {
    galleryImagesMersenne = data;
  })
  .catch(error => console.error('Error loading gallery data:', error));

// Mersenne Twister Implementation
class MersenneTwister {
    constructor(seed = null) {
        this.N = 624;
        this.M = 397;
        this.MATRIX_A = 0x9908b0df;
        this.UPPER_MASK = 0x80000000;
        this.LOWER_MASK = 0x7fffffff;
        
        this.mt = new Array(this.N);
        this.mti = this.N + 1;
        
        if (seed === null) {
            seed = Date.now();
        }
        this.init_genrand(seed);
    }
    
    init_genrand(s) {
        this.mt[0] = s >>> 0;
        for (this.mti = 1; this.mti < this.N; this.mti++) {
            s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
            this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + 
                               (s & 0x0000ffff) * 1812433253) + this.mti;
            this.mt[this.mti] >>>= 0;
        }
    }
    
    genrand_int32() {
        let y;
        const mag01 = [0x0, this.MATRIX_A];
        
        if (this.mti >= this.N) {
            let kk;
            
            if (this.mti == this.N + 1) {
                this.init_genrand(5489);
            }
            
            for (kk = 0; kk < this.N - this.M; kk++) {
                y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            for (; kk < this.N - 1; kk++) {
                y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
            this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
            
            this.mti = 0;
        }
        
        y = this.mt[this.mti++];
        
        y ^= (y >>> 11);
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= (y >>> 18);
        
        return y >>> 0;
    }
    
    random() {
        return this.genrand_int32() * (1.0 / 4294967296.0);
    }
}

// Global Mersenne Twister instance
const mtGenerator = new MersenneTwister();

function showRandomImageMersenne() {
    if (!galleryImagesMersenne) {
        console.log('Gallery data still loading...');
        return;
    }
    
    // Build flat array of all images
    const allImages = [];
    for (const gallery in galleryImagesMersenne) {
        const imagesInGallery = galleryImagesMersenne[gallery];
        for (const image of imagesInGallery) {
            allImages.push({gallery: gallery, image: image});
        }
    }
    
    // Use Mersenne Twister algorithm
    const randomIndex = Math.floor(mtGenerator.random() * allImages.length);
    const randomSelection = allImages[randomIndex];
    
    // Update display
    updateDisplay(randomSelection, 'Mersenne Twister');
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