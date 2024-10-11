import os


def generate_html():
    # HTML header
    html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Picture Group 1</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- Header with clickable title -->
    <header>
        <h1><a href="index.html">ajoherron photography</a></h1>
    </header>

    <!-- Title for the specific picture group -->
    <h2>10/9/2024</h2>

    <!-- Film information -->
    <p>Kodak Gold 200 Color Negative Film (35mm)</p>

    <!-- Camera information -->
    <p>Olympus Stylus Epic Zoom 170</p>  
    
    <!-- Instructions -->
    <p style="color: #666; font-size: 0.8em; font-weight: normal; margin-top: 10px;">
        Click to see the next image, or return to the homepage with the link above
    </p>

    <!-- Slider for images -->
"""

    # Get all jpg files in the images/group5 directory
    image_files = [f for f in os.listdir("images/group5") if f.lower().endswith(".jpg")]

    # Generate HTML for each image
    for image_file in image_files:
        file_name = os.path.splitext(image_file)[0]  # Remove the .jpg extension
        html += f"""    <div class="slider">
        <div class="slide" onclick="nextSlide()">
            <img src="images/group5/{image_file}" alt="{file_name}">
            <p class="caption">{file_name}</p>
        </div>
    </div>
"""

    # Close the HTML
    html += """
    <script src="js/scripts.js"></script>
</body>
</html>
"""

    # Write the HTML to a file
    with open("photo_gallery.html", "w") as f:
        f.write(html)


# Run the function to generate the HTML
generate_html()
