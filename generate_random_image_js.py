import os
import random

def generate_random_image_js():
    """Generate JavaScript that picks random images dynamically"""
    
    js_content = """// Auto-generated random image picker
function showRandomImage() {
    // Get all gallery directories dynamically
    const galleryDirs = """ + str(get_gallery_directories()) + """;
    
    // Pick random gallery
    const randomGallery = galleryDirs[Math.floor(Math.random() * galleryDirs.length)];
    
    // Get images for this gallery
    const galleryImages = """ + str(get_all_gallery_images()) + """;
    
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
}"""
    
    # Write to js/random-images.js
    os.makedirs('js', exist_ok=True)
    with open('js/random-images.js', 'w') as f:
        f.write(js_content)

def get_gallery_directories():
    """Get all gallery directory names"""
    images_dir = 'images'
    galleries = []
    
    for item in os.listdir(images_dir):
        item_path = os.path.join(images_dir, item)
        if os.path.isdir(item_path) and item.startswith('gallery'):
            galleries.append(item)
    
    return sorted(galleries)

def get_all_gallery_images():
    """Get all images for each gallery"""
    images_dir = 'images'
    gallery_images = {}
    
    for gallery in get_gallery_directories():
        gallery_path = os.path.join(images_dir, gallery)
        images = []
        
        for file in os.listdir(gallery_path):
            if file.lower().endswith('.jpg'):
                # Remove .jpg extension
                image_name = os.path.splitext(file)[0]
                images.append(image_name)
        
        gallery_images[gallery] = sorted(images)
    
    return gallery_images

def print_stats():
    """Print statistics about galleries and images"""
    gallery_images = get_all_gallery_images()
    
    print(f"Found {len(gallery_images)} galleries:")
    total_images = 0
    for gallery, images in gallery_images.items():
        print(f"  {gallery}: {len(images)} images")
        total_images += len(images)
    
    print(f"Total images: {total_images}")

if __name__ == "__main__":
    generate_random_image_js()
    print_stats()

if __name__ == "__main__":
    generate_random_image_js()
    print_stats()