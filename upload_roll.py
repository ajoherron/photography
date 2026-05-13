import os
import re
import shutil
from datetime import datetime
from pathlib import Path

FILM_DIR = Path("/Users/alexherron/Documents/Film")
FULL_ROLLS_DIR = FILM_DIR / "Full Rolls"
KEEPERS_DIR = FILM_DIR / "Keepers"
PHOTOGRAPHY_DIR = Path(__file__).parent

CAMERA_CSS = {
    "Canon AE-1": "canon-ae-1",
    "Canon AE-1 Program": "canon-ae-1",
    "Olympus Stylus Epic Zoom 170": "olympus-stylus-epic-zoom-170",
    "Nikon Photomic FTn": "nikon-photomic-ftn",
}


def _get_roll_prefix(roll_folder: Path) -> str:
    files = sorted(f for f in os.listdir(roll_folder) if f.lower().endswith(".jpg"))
    if not files:
        raise FileNotFoundError(f"No JPGs found in {roll_folder}")
    return files[0][:8]


def _format_date(date_str: str) -> str:
    return datetime.strptime(date_str, "%m/%d/%Y").strftime("%B %-d, %Y")


def _strip_film_format(film: str) -> str:
    return re.sub(r"\s*\([^)]+\)\s*$", "", film).strip()


def setup(rolls: list[dict]):
    """
    Stage 1: copy frames from Full Rolls → Keepers → images/galleryN/.
    After this runs, name the images in Finder, then call finalize().

    Each roll dict requires:
        full_roll_folder  str   folder name in Full Rolls, e.g. "2026-04-27_Harman_Phoenix_200_ii"
        keeper_frames     list  frame numbers, e.g. [1, 6, 7, 9]
        gallery           str   e.g. "gallery29"
        date              str   e.g. "4/27/2026"
        film              str   e.g. "Harman Phoenix 200 ii (35mm)"
        camera            str   e.g. "Olympus Stylus Epic Zoom 170"
        description       str   for index.html
        location          str   for index.html
    """
    for roll in rolls:
        folder_name = roll["full_roll_folder"]
        full_roll_path = FULL_ROLLS_DIR / folder_name
        keeper_path = KEEPERS_DIR / folder_name
        gallery_path = PHOTOGRAPHY_DIR / "images" / roll["gallery"]

        prefix = _get_roll_prefix(full_roll_path)

        keeper_path.mkdir(exist_ok=True)
        for frame in roll["keeper_frames"]:
            filename = f"{prefix}{frame:04d}.jpg"
            shutil.copy2(full_roll_path / filename, keeper_path / filename)
        print(f"[{roll['gallery']}] Copied {len(roll['keeper_frames'])} frames → Keepers/{folder_name}")

        gallery_path.mkdir(exist_ok=True)
        for frame in roll["keeper_frames"]:
            filename = f"{prefix}{frame:04d}.jpg"
            shutil.copy2(keeper_path / filename, gallery_path / filename)
        print(f"[{roll['gallery']}] Copied → images/{roll['gallery']}/")

    print("\nDone. Name your images in Finder, then call finalize().")


def finalize(rolls: list[dict]):
    """
    Stage 2: generate gallery HTML, update random image list, update index.html.
    Call this after naming images in Finder.
    """
    os.chdir(PHOTOGRAPHY_DIR)

    from generate_gallery import generate_html
    from generate_random_image_json import generate_random_image_json

    for roll in rolls:
        generate_html(roll["gallery"], roll["date"], roll["film"], roll["camera"])
        print(f"[{roll['gallery']}] Generated gallery HTML")

    generate_random_image_json()
    print("Random image list updated")

    index_path = PHOTOGRAPHY_DIR / "index.html"
    content = index_path.read_text()

    new_rows = ""
    for roll in rolls:
        css_class = CAMERA_CSS.get(roll["camera"], roll["camera"].lower().replace(" ", "-"))
        new_rows += (
            f'                <tr class="{css_class}">\n'
            f'                    <td class="gallery-date">'
            f'<a href="galleries/{roll["gallery"]}.html">{_format_date(roll["date"])}</a></td>\n'
            f'                    <td class="gallery-description">{roll["description"]}</td>\n'
            f'                    <td>{roll["location"]}</td>\n'
            f'                    <td>{_strip_film_format(roll["film"])}</td>\n'
            f'                </tr>\n'
        )

    content = content.replace("<tbody>\n", f"<tbody>\n{new_rows}", 1)
    index_path.write_text(content)
    print("index.html updated")
