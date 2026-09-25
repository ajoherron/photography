.PHONY: serve random gallery

# Local preview at http://localhost:8000 (Ctrl+C to stop)
serve:
	cd $(CURDIR) && python3 -m http.server 8000

# Regenerate js/gallery-data.json
random:
	cd $(CURDIR) && python3 generate_random_image_json.py

# Build HTML for the gallery set at the top of generate_gallery.py, then refresh the random list
gallery:
	cd $(CURDIR) && python3 generate_gallery.py
