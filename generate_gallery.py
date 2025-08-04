import os

##############
### Update ###
##############
GALLERY = "gallery18"  # E.g., gallery15
DATE = "8/4/2025"  # E.g., 4/27/2025
FILM = "Kodak Portra 160 (35mm)"  # E.g., Kodak UltraMax 400 (35mm)
CAMERA = "Canon AE-1 Program"  # E.g., Canon AE-1 Program or Olympus Stylus Epic Zoom 170


def generate_html(gallery, date, film, camera):
    # HTML header
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Picture Gallery {gallery[-2:]}</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <!-- Header with clickable title -->
    <header>
        <h1><a href="../index.html">ajoherron photography</a></h1>
    </header>

    <!-- Title for the specific picture gallery -->
    <h2>{date}</h2>

    <!-- Film information -->
    <p>{film}</p>

    <!-- Camera information -->
    <p>{camera}</p>  
    
    <!-- Instructions -->
    <p style="color: #666; font-size: 0.8em; font-weight: normal; margin-top: 10px;">
        Click to see the next image, or return to the homepage with the link above
    </p>

    <!-- Slider for images -->
"""

    # Get all jpg files in the correct images/gallery* directory
    image_files = [
        f for f in os.listdir(f"images/{gallery}") if f.lower().endswith(".jpg")
    ]

    # Generate HTML for each image
    for image_file in image_files:
        file_name = os.path.splitext(image_file)[0]  # Remove the .jpg extension
        html += f"""    <div class="slider">
        <div class="slide" onclick="nextSlide()">
            <img src="../images/{gallery}/{image_file}" alt="{file_name}">
            <p class="caption">{file_name}</p>
        </div>
    </div>
"""

    # Close the HTML
    html += """
    <script src="../js/scripts.js"></script>
</body>
</html>
"""

    # Write the HTML to a file
    with open(f"galleries/{gallery}.html", "w") as f:
        f.write(html)


if __name__ == "__main__":
    # Run the function to generate the HTML
    generate_html(GALLERY, DATE, FILM, CAMERA)
    print(
        f"Generated HTML for {GALLERY} with date {DATE}, film {FILM}, and camera {CAMERA}."
    )

    # Import random generator
    from generate_random_image_json import generate_random_image_json

    # Run random generator to update the random image selection
    generate_random_image_json()
    print("Random image selection updated with new gallery.")
