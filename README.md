# Steps for uploading new film

0. Select keeper images from roll

- Often helps to have a second opinion

1. Create new folder in images/

- Should follow gallery<#> format

2. Add images to new folder

- Drag over from finder

3. Create names for each image

- Generally sticking with one-word names
- Keep it simple, not worth overthinking it

4. Update inputs for generate_gallery.py (then run script)

- Including gallery, date, film, and camera
- This will also run generate_random_image_js.py, which updates the random image list with the new gallery

5. Push changes

### Notes on testing for web development

- Use localhost for testing

```bash
cd photography
python -m http.server 8000
```

- Visit http://localhost:8000
- Hard refresh after changes (Cmd + Shift + R)