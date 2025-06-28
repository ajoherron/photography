import os
import json

def generate_random_image_json():
    """Generate only the JSON data file - JS files are static"""
    
    # Get the gallery data
    gallery_images = get_all_gallery_images()
    
    # =============================================================================
    # GENERATE gallery-data.json (Only file that gets generated)
    # =============================================================================
    os.makedirs('js', exist_ok=True)
    
    with open('js/gallery-data.json', 'w') as f:
        json.dump(gallery_images, f, indent=2)

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
                image_name = os.path.splitext(file)[0]
                images.append(image_name)
        
        gallery_images[gallery] = sorted(images)
    
    return gallery_images

def print_stats():
    """Print statistics about galleries and images"""
    gallery_images = get_all_gallery_images()
    
    print(f"\nFound {len(gallery_images)} galleries:")
    total_images = 0
    for gallery, images in gallery_images.items():
        print(f"  {gallery}: {len(images)} images")
        total_images += len(images)
    
    print(f"\nTotal images: {total_images}")
    print("Generated: js/gallery-data.json\n")

if __name__ == "__main__":
    generate_random_image_json()
    print_stats()