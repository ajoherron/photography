# ajoherron photography

Film photography website. Galleries are HTML pages generated from images stored in `images/`.

## Directory structure

```
photography/          ← this repo (served at ajoherron.github.io)
  images/
    gallery1/ … galleryN/   ← named .jpg files, one folder per roll
    gallery_cat/
  galleries/
    gallery1.html … galleryN.html
  js/
    gallery-data.json        ← auto-generated, do not edit
  generate_gallery.py        ← generates gallery HTML + calls random image updater
  generate_random_image_json.py
  index.html                 ← main table of all galleries
```

Adjacent directories (outside this repo):

```
Film/
  Full Rolls/    ← every scan from the lab, named YYYY-MM-DD_Film_Name
  Keepers/       ← selected frames copied from Full Rolls, same folder naming
  photography/   ← this repo
```

## Workflow for adding a new roll

1. **Select keeper frames** — human judgment, done externally
2. **Copy keepers from Full Rolls → Keepers** — identify frames by number, copy to matching folder in Keepers (create folder if needed)
3. **Create gallery folder** — `images/galleryN/` where N is next in sequence
4. **Copy from Keepers → images/galleryN/** — copy the keeper files
5. **Name the images** — rename .jpg files to one-word descriptive names (human step)
6. **Generate gallery HTML** — run `generate_gallery.py` (see below)
7. **Update index.html** — add a new `<tr>` at the top of `<tbody>` (see format below)
8. **Push** — standard git commit and push

## Full Rolls file naming

Folders in `Full Rolls/` follow `YYYY-MM-DD_Film_Name` (e.g. `2026-04-27_Ilford_HP5_Plus_400`).

Scanned files within each folder have a unique numeric prefix per roll (e.g. `000050740001.jpg`, `000050740002.jpg`). The prefix is 8 digits; the frame number is the last 4 digits zero-padded. When the user gives keeper frame numbers, identify the roll by its prefix from the folder listing and construct filenames as `{8-digit-prefix}{frame:04d}.jpg`.

## Adding new rolls with upload_roll.py

Use `upload_roll.py` for all new uploads — never edit `generate_gallery.py` variables directly. The script never commits or pushes.

### Stage 1 — setup

Call `setup(rolls)` with all inputs upfront. Copies frames from Full Rolls → Keepers → `images/galleryN/`, then tell the user to name their images in Finder and wait for confirmation.

```python
from upload_roll import setup, finalize

rolls = [
    {
        "full_roll_folder": "2026-04-27_Harman_Phoenix_200_ii",
        "keeper_frames": [1, 6, 7, 9, 14, 19, 21, 22, 26, 29, 30, 36],
        "gallery": "gallery29",
        "date": "4/27/2026",
        "film": "Harman Phoenix 200 ii (35mm)",
        "camera": "Olympus Stylus Epic Zoom 170",
        "description": "An Edinburgh excursion and a London adventure",
        "location": "Edinburgh, London",
    },
]

setup(rolls)
```

### Stage 2 — finalize

Once the user confirms images are named, call `finalize(rolls)` with the same `rolls` list. Generates gallery HTML, updates random image list, and inserts rows into `index.html`.

```python
finalize(rolls)
```

Pass multiple dicts in `rolls` to handle several rolls in one session.

## index.html row format

New rows go at the top of `<tbody>`. Match the camera CSS class to the camera used.

```html
<tr class="olympus-stylus-epic-zoom-170">
    <td class="gallery-date"><a href="galleries/galleryN.html">April 27, 2026</a></td>
    <td class="gallery-description">Description here</td>
    <td>Location</td>
    <td>Film Name (no format suffix)</td>
</tr>
```

## Camera CSS classes

| Camera | CSS class |
|---|---|
| Canon AE-1 / AE-1 Program | `canon-ae-1` |
| Olympus Stylus Epic Zoom 170 | `olympus-stylus-epic-zoom-170` |
| Nikon Photomic FTn | `nikon-photomic-ftn` |

## Film name formatting

- In `generate_gallery.py` (gallery page): include format, e.g. `Kodak Portra 400 (35mm)`
- In `index.html` (table): no format suffix, e.g. `Kodak Portra 400`

## Local preview

```
cd photography && python3 -m http.server 8000
```

Must run from `photography/`, not from the parent `Film/` directory.
