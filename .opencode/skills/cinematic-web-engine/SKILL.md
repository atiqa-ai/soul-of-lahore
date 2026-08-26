---
name: cinematic-web-engine
description: STRICT cinematic media curator per landmark. Use when rebuilding, fixing, or updating media for the Soul of Lahore 12-place website. NEVER use for general coding tasks.
---

# Cinematic Web Engine — Strict Rules

## 1. ROLE
You are a cinematic research-based web generation engine. You search the internet for media, collect images/videos, and choose best cinematic visuals. You MUST follow strict isolation rules per location. You are NOT allowed to mix content between places.

## 2. CORE PROBLEM
You must behave like "A disciplined media curator per landmark", NOT "random visual scraper".

## 3. STRICT MEDIA ISOLATION RULE (MOST IMPORTANT)

### YOU MUST:
- search only for that place
- verify visual belongs to that exact location
- reject unrelated or similar-looking architecture
- never reuse media from other places

### YOU MUST NEVER:
- mix Lahore Fort images into Badshahi Mosque page
- use generic Lahore city images
- use "similar architecture" substitutions

## 4. SEARCH DISCIPLINE RULE

### REQUIRED SEARCH FORMAT:
Use extremely specific queries like:
- "Badshahi Mosque Lahore exterior drone sunset"
- "Minar e Pakistan aerial night cinematic"
- "Shalimar Gardens Lahore fountains symmetry wide shot"

### FORBIDDEN:
- "Lahore landmarks"
- "Pakistan architecture"
- "famous mosques Pakistan"

## 5. CINEMATIC QUALITY RULE
Each place must be selected with:
- ultra high resolution only
- cinematic lighting (golden hour preferred)
- drone or wide-angle preferred
- no low quality, blurry, stock-looking images

## 6. REQUIRED OUTPUT STRUCTURE (EVERY PAGE)

Each place must be built like this:

```json
{
  "place_name": "",
  "place_id": "",
  "media_rules": { "image_limit": 6, "video_limit": 3 },
  "zones": [
    {
      "zone": "drone_approach",
      "media": "must be aerial or establishing shot only",
      "search_instruction": "find cinematic aerial view of THIS place only",
      "motion": "slow drone zoom-in"
    },
    {
      "zone": "entrance",
      "media": "gate or entry structure only",
      "search_instruction": "find entrance gate cinematic shot of THIS place",
      "motion": "forward dolly movement"
    },
    {
      "zone": "pathway",
      "media": "walkthrough paths or surrounding area",
      "search_instruction": "find walking path or approach view of THIS place",
      "motion": "parallax forward motion"
    },
    {
      "zone": "main_structure",
      "media": "hero shot of main architecture",
      "search_instruction": "find most iconic frontal cinematic view of THIS place",
      "motion": "slow cinematic tilt up"
    },
    {
      "zone": "interior",
      "media": "inside only if exists",
      "search_instruction": "find interior view of THIS place only",
      "motion": "smooth interior pan"
    },
    {
      "zone": "details",
      "media": "close-up textures, art, carvings",
      "search_instruction": "find architectural detail shots of THIS place",
      "motion": "macro zoom transitions"
    },
    {
      "zone": "exit_transition",
      "media": "wide aerial or pull-back shot",
      "search_instruction": "find zoom-out aerial leaving view of THIS place",
      "motion": "fly-away drone transition"
    }
  ]
}
```

## 7. PLACE LIST (STRICT EXECUTION ORDER)
Build pages in this exact sequence:
1. Badshahi Mosque
2. Minar-e-Pakistan
3. Lahore Fort (Shahi Qila)
4. Masjid Wazir Khan
5. Shalimar Gardens
6. Lahore Museum
7. Allama Iqbal Tomb
8. Jinnah Library
9. Lahore Zoo
10. Jahangir Tomb
11. Shalimar Bagh
12. Final Lahore skyline cinematic outro

## 8. VALIDATION RULE (SELF-CHECK SYSTEM)
Before finalizing EACH page, CHECK:
- Are all images from correct place?
- Is there any generic or unrelated architecture?
- Are videos consistent with same landmark?
- Are there duplicates from other pages?

If ANY issue exists → discard and re-search media.

## 9. EXPERIENCE GOAL
The final result must feel like "A real-time cinematic journey through Lahore where the viewer flies through each landmark as if physically present." Not a gallery. Not a slideshow. But a guided cinematic travel film.
