export type CinematicZone = 'drone_approach' | 'entrance' | 'pathway' | 'main_structure' | 'interior' | 'details' | 'exit_transition';

export const ZONE_LABELS: Record<CinematicZone, string> = {
  drone_approach: 'Approach',
  entrance: 'Enter',
  pathway: 'Walk Through',
  main_structure: 'The Structure',
  interior: 'Inside',
  details: 'Details',
  exit_transition: 'Departure',
};

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  caption: string;
  description: string;
  zone?: CinematicZone;
}

export interface Place {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  label: string;
  description: string;
  longDescription: string;
  media: MediaItem[];
  gradient: string;
}

const pexelsImg = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
const unsplashImg = (id: string) => `https://images.unsplash.com/photo-${id}?w=1600`;
const pexelsVid = (id: number) => `https://videos.pexels.com/video-files/${id}/${id}-hd_1080_1920_60fps.mp4`;

export const places: Place[] = [
  {
    id: 'minar',
    slug: 'minar-pakistan',
    title: 'Minar-e-Pakistan',
    subtitle: 'Monument of Freedom',
    label: '01 — Monument of Freedom',
    description: 'On 23 March 1940, the Pakistan Resolution was passed here. Minar-e-Pakistan rises 70 metres as a symbol of identity, unity, and the birth of a nation.',
    longDescription: 'Designed by architect Nasreddin Murat-Khan, the minaret\'s design blends Mughal, Islamic, and modern styles. Its base is shaped like a five-pointed star, with platforms rising in tiers. The monument is surrounded by Iqbal Park, where millions gather for national celebrations. At night, the minaret is dramatically lit, visible from across the city. It stands as the proud symbol of Pakistan\'s independence movement and the dream of Allama Iqbal.',
    gradient: 'from-green-900/80 via-emerald-700/40 to-green-900/80',
    media: [
      // EXT: 1 — DRONE APPROACH — Aerial revealing the five-pointed star foundation
      { id: 'm4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Top_Aerial_View_of_Minar_e_Pakistan.jpg', caption: 'Aerial Star Foundation', description: 'From above, the monument\'s five-pointed star base reveals itself — a geometric symbol of unity etched into Greater Iqbal Park.', zone: 'drone_approach' },
      // INT: 2 — Inside the base museum — Pakistan Resolution gallery
      { id: 'm9', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Stairs_to_Minar-e-Pakistan.jpg', caption: 'Inside the Monument', description: 'The 324 interior steps rise through the base of the tower, passing four platforms that each represent a stage of the freedom movement.', zone: 'entrance' },
      // INT: 3 — Ascending through the interior platforms
      { id: 'm10', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Aerial_view_of_Minar_e_Pakistan.jpg', caption: 'The Star Platform Interior', description: 'The interior base unfolds as a five-pointed star — platforms clad in Taxila stone rising in sequence, each level a chapter in Pakistan\'s founding story.', zone: 'pathway' },
      // INT: 4 — The central tower viewed from within the platform
      { id: 'm1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Minar-e-Pakistan%28Lahore%29.jpg', caption: 'Tower from the Base', description: 'From inside the star platform, the 70-metre spire rises directly overhead — a vertical timeline of independence carved in stone and marble.', zone: 'main_structure' },
      // INT: 5 — Deep inside the tower looking up
      { id: 'm2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Minar-e-Pakistan_%28Iqbal_Park%29.jpg', caption: 'Looking Up the Tower', description: 'Inside the monument, the tower narrows as it rises through four distinct architectural tiers — each platform a step closer to freedom.', zone: 'interior' },
      // INT: 6 — Architectural detail of the balconies and tiers
      { id: 'm5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Minar-e-Pakistan_%2C_Lahore_%2C_Punjab.jpg', caption: 'Architectural Detail', description: 'Inside, the balconies and tiered platforms reveal the craftsmanship of architect Nasreddin Murat-Khan — each level a different stone, a different chapter.', zone: 'details' },
      // INT: 7 — Exit through the base at night
      { id: 'm3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Minar-e-Pakistan%2C_Lahore..jpg', caption: 'Night Departure', description: 'As night falls, the tower glows from within — a luminous beacon of freedom departing through the illuminated base.', zone: 'exit_transition' },
    ],
  },
  {
    id: 'badshahi',
    slug: 'badshahi-mosque',
    title: 'Badshahi Mosque',
    subtitle: 'Mughal Grandeur',
    label: '02 — Mughal Grandeur',
    description: 'Built in 1673 by Emperor Aurangzeb, the Badshahi Mosque stands as the last great imperial mosque of the Mughal era.',
    longDescription: 'With capacity for 100,000 worshippers, its red sandstone walls and white marble domes have watched over Lahore for over three centuries. The courtyard alone spans 276,000 square feet — larger than a football field. At sunset, the stone glows amber, casting a silhouette that defines Lahore\'s skyline. It is the second largest mosque in Pakistan and one of the most iconic landmarks of the subcontinent.',
    gradient: 'from-amber-900/80 via-amber-700/40 to-amber-900/80',
    media: [
      // EXT: 1 — DRONE APPROACH — Cinematic panning establishing shot
      { id: 'b6', type: 'video', src: pexelsVid(9003971), caption: 'Panoramic View', description: 'A sweeping cinematic pan across the Badshahi Mosque against a perfect blue Lahore sky, revealing its full grandeur.', zone: 'drone_approach' },
      // INT: 2 — Entering the mosque through the main gateway into the courtyard
      { id: 'b1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Badshahi_Mosque_%2C_Lahore.jpg', caption: 'Badshahi Mosque', description: 'The iconic Badshahi Mosque with its red sandstone facade, three white marble domes, and four towering minarets — the last great imperial mosque of the Mughal era.', zone: 'entrance' },
      // INT: 3 — Walking across the courtyard toward the prayer hall
      { id: 'b2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Badshahi_Mosque_%2C_Lahore.jpg', caption: 'Path to the Prayer Hall', description: 'Crossing the vast interior courtyard toward the main prayer hall — its red sandstone facade framed by the white marble domes of the King\'s Mosque.', zone: 'pathway' },
      // INT: 4 — The main prayer hall — massive arched interior
      { id: 'b4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Grand_Architecture_of_Badshahi_Mosque.jpg', caption: 'Prayer Hall Arches', description: 'Inside the prayer hall, massive Mughal arches rise in perfect symmetry — red sandstone and marble inlay creating a forest of columns beneath three white marble domes.', zone: 'main_structure' },
      // INT: 5 — Deep inside the prayer hall looking toward the mihrab
      { id: 'b3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Badshahi_Mosque_%2CLahore_Pakistan.jpg', caption: 'Prayer Hall Interior', description: 'Deep inside the imperial prayer hall — intricate fresco work, marble inlay, and the mihrab marking the direction of Mecca, where 100,000 have knelt in prayer.', zone: 'interior' },
      // INT: 6 — Architectural detail — marble inlay and fresco inside the dome
      { id: 'b5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/The_beautiful_%27baagh%27_where_%27mehfil%27_used_to_take_place_in_the_centre_of_the_King%27s_mosque.JPG', caption: 'Interior Courtyard Garden', description: 'Inside the mosque complex, a central garden courtyard with marble pathways and fountains mirrors the paradise promised in Mughal architecture.', zone: 'details' },
      // INT: 7 — Departure — looking back at the prayer hall from inside the mosque
      { id: 'b8', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Badshahi_Mosque_Sunset.jpg', caption: 'Departure from the Mosque', description: 'As the visitor departs through the interior courtyard, the minarets catch the last amber light — a farewell from within the walls of the Emperor\'s Mosque.', zone: 'exit_transition' },
    ],
  },
  {
    id: 'iqbal-tomb',
    slug: 'allama-iqbal-tomb',
    title: 'Allama Iqbal Tomb',
    subtitle: 'Mazar-e-Iqbal',
    label: '03 — Mazar-e-Iqbal',
    description: 'The final resting place of Dr. Allama Muhammad Iqbal, the poet-philosopher who envisioned Pakistan, nestled between the Badshahi Mosque and Lahore Fort.',
    longDescription: 'Situated in the serene Hazuri Bagh, the Tomb of Allama Iqbal is a stunning structure of red sandstone blending Afghan and Moorish architectural styles. The poet of the East, who gave the vision of a separate homeland for Muslims, was laid to rest here on 21 April 1938. The interior walls are inscribed with his Persian verses. Thousands visit daily to pay homage to the man whose poetry and philosophy continue to inspire millions across the world.',
    gradient: 'from-rose-900/80 via-red-700/40 to-rose-900/80',
    media: [
      // EXT: 1 — DRONE APPROACH — The tomb set between Badshahi Mosque and Lahore Fort
      { id: 'i1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Tomb_of_Allama_Iqbal_next_to_Badshahi_Mosque_main_entrance.jpg', caption: 'Mazar-e-Iqbal Entrance', description: 'The tomb of Allama Iqbal rests in Hazuri Bagh, between the Badshahi Mosque and Lahore Fort — the most regal resting place in all of Lahore.', zone: 'drone_approach' },
      // INT: 2 — Entering through the gate into the mausoleum complex
      { id: 'i2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Muhammad_Allama_Iqbal%E2%80%99s_Tomb.JPG', caption: 'Inside the Complex', description: 'Inside the Hazuri Bagh complex, the red sandstone mausoleum blends Afghan, Moorish, and Mughal styles — stone from Jaipur, marble from Makrana.', zone: 'entrance' },
      // INT: 3 — Approaching the tomb within its enclosed chamber
      { id: 'i4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Allama_Iqbal_Tomb_Lahore.jpg', caption: 'Approaching the Resting Place', description: 'Inside the mausoleum chamber, the tapered red sandstone walls and marble inlay create a hushed sanctuary — the Poet of the East sleeps beneath carved verses.', zone: 'pathway' },
      // INT: 4 — The mausoleum interior as the main structure
      { id: 'i3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Grave_of_Muhammad_Iqbal.jpg', caption: 'The Mausoleum Interior', description: 'Inside the mausoleum, the white marble cenotaph is the focus of the chamber — surrounded by six couplets from Zabur-e-Ajam carved into the walls, the poet\'s own words guarding his eternal sleep.', zone: 'main_structure' },
      // INT: 5 — Deep inside the tomb — the grave and Persian inscriptions
      { id: 'i5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Allama_Muhammad_Iqbal_Mausoleum.jpg', caption: 'Verses in Stone', description: 'Deep inside the tomb, the upper interior walls bear Persian poetry from Iqbal\'s own works — his philosophy of selfhood and spiritual awakening etched in marble for eternity.', zone: 'interior' },
      // INT: 6 — Reused the entrance image for detailed wall inscription view
      { id: 'i6', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Muhammad_Allama_Iqbal%E2%80%99s_Tomb.JPG', caption: 'Inscribed Walls', description: 'Inside the tomb chamber, the walls themselves speak — verses from Zabur-e-Ajam carved in marble, the poet\'s dialogue with eternity.', zone: 'details' },
      // INT: 7 — Reused the pathway image for departure
      { id: 'i7', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Allama_Iqbal_Tomb_Lahore.jpg', caption: 'Departure from the Tomb', description: 'As the visitor departs from within the mausoleum, the red sandstone walls recede — a farewell from the Poet of the East, whose verses echo through the chamber.', zone: 'exit_transition' },
    ],
  },
  {
    id: 'lahore-fort',
    slug: 'lahore-fort',
    title: 'Shahi Qila',
    subtitle: 'The Royal Fort',
    label: '04 — The Royal Fort',
    description: 'The Shahi Qila holds within its walls the rise and fall of empires — from Akbar to Aurangzeb, from Ranjit Singh to the British Raj.',
    longDescription: 'Spanning over 20 hectares, the fort\'s origins trace back to the 11th century, though its current form was shaped by the Mughals. Its Alamgiri Gate, built by Aurangzeb in 1674, faces the Badshahi Mosque in a dialogue frozen in stone. Within lie palaces like the Sheesh Mahal, halls like the Diwan-e-Aam and Diwan-e-Khas, the Naulakha Pavilion, and gardens that tell the story of South Asia\'s most storied dynasty. A UNESCO World Heritage site, it is Lahore\'s crown jewel of history.',
    gradient: 'from-stone-900/80 via-stone-700/40 to-stone-900/80',
    media: [
      // EXT: 1 — DRONE APPROACH — The fort's monumental gate from outside
      { id: 'f1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Shahi_Qila_%28Lahore_Fort_Gate%29.JPG', caption: 'Gate of the Emperor', description: 'Aurangzeb\'s Alamgiri Gate has faced the Badshahi Mosque since 1674 — a monumental threshold between two of Lahore\'s greatest Mughal treasures.', zone: 'drone_approach' },
      // INT: 2 — Passing through the vaulted gate passage into the fort
      { id: 'f5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Inside_of_the_main_gate_of_Lahore_Fort.jpg', caption: 'The Royal Passage', description: 'Crossing the threshold into the fort reveals a vaulted sandstone corridor that has welcomed emperors and visitors for over three centuries.', zone: 'entrance' },
      // INT: 3 — Walking through the fort interior toward Sheesh Mahal
      { id: 'f9', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Sheeh_Mahal_enterance.jpg', caption: 'Path to the Mirror Palace', description: 'Inside the fort, the Shah Burj passage leads toward the Sheesh Mahal — Persian inscriptions on the gate announce the entrance to Shah Jahan\'s private pavilion.', zone: 'pathway' },
      // INT: 4 — The Hall of Public Audience inside the fort
      { id: 'f2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Dewan-e-Aam_%40_Shahi_Qila_%28Lahore_Fort%29_%40_Lahore_%2815272711849%29.jpg', caption: 'Diwan-e-Aam', description: 'Inside the Hall of 40 Pillars, Emperor Shah Jahan would sit in public audience — a symbol of justice where the ruler and ruled met face to face within the fort walls.', zone: 'main_structure' },
      // INT: 5 — Inside the Palace of Mirrors
      { id: 'f10', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Sheesh_Mahal,_Shahi_Qila,_Lahore_(1).jpg', caption: 'Palace of Mirrors', description: 'Thousands of convex mirrors and pietra dura inlay cover the Sheesh Mahal\'s white marble walls — candlelight once transformed this chamber into a shimmering constellation.', zone: 'interior' },
      // INT: 6 — Intricate tile details on the fort walls
      { id: 'f11', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Alamgiri_Gate_of_Lahore_Fort.jpg', caption: 'Alamgiri Gate Details', description: 'The Alamgiri Gate\'s towering facade is covered in intricate tile mosaic and calligraphy — the grand entrance built by Aurangzeb in 1674, now the fort\'s most photographed face.', zone: 'details' },
      // INT: 7 — Departure past the Pearl Mosque inside the fort
      { id: 'f6', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Moti_Masjid%2C_Lahore_Fort_by_Aunzee.jpg', caption: 'The Pearl Mosque', description: 'Shah Jahan\'s Moti Masjid gleams in pure white marble within the fort — a serene farewell as the visitor departs the sacred quarter, leaving Mughal perfection behind.', zone: 'exit_transition' },
    ],
  },
  {
    id: 'wazir-khan',
    slug: 'wazir-khan-mosque',
    title: 'Masjid Wazir Khan',
    subtitle: 'The Painted Mosque',
    label: '05 — The Painted Mosque',
    description: 'Built in 1641 during Shah Jahan\'s reign, Masjid Wazir Khan is adorned with the finest Kashi-kari tile work — a symphony of colour, geometry, and devotion.',
    longDescription: 'Commissioned by the governor Hakim Ilmuddin Ansari (known as Wazir Khan), this mosque is a masterpiece of Mughal tile work. Every surface is covered in vivid blue, green, and orange glazed tiles (kashi-kari), floral frescoes, and intricate calligraphy. The mosque\'s five domes and four minarets rise above the bustling Walled City, a beacon of colour in the heart of old Lahore. It is considered one of the most beautifully decorated mosques in the world.',
    gradient: 'from-teal-900/80 via-emerald-700/40 to-teal-900/80',
    media: [
      // EXT: 1 — DRONE APPROACH — Drone revealing the mosque's courtyard and minarets
      { id: 'w1', type: 'video', src: pexelsVid(12074502), caption: 'Courtyard from Above', description: 'A drone rises over the Walled City to reveal Masjid Wazir Khan\'s courtyard, its four minarets framing the mosque\'s intricate tile work from above.', zone: 'drone_approach' },
      // INT: 2 — Entering through the grand Timurid-style iwan portal
      { id: 'w2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Front_of_wzair_khan_mosque.jpg', caption: 'The Royal Portal', description: 'Passing through the grand entrance iwan, glazed tile calligraphy proclaims the Islamic declaration of faith — crossing the threshold from the bazaar into the divine.', zone: 'entrance' },
      // INT: 3 — The enclosed courtyard with ablution pool
      { id: 'w3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/View_of_pond_for_abulation%2C_minarets_and_main_gate_of_Wazir_Khan_Mosque.jpg', caption: 'Courtyard and Ablution Pool', description: 'Inside the mosque, the central courtyard opens around a 35-foot ablution pool, surrounded by high arched galleries and four 107-foot minarets clad in kashi-kari tile.', zone: 'pathway' },
      // INT: 4 — The tile facade seen from within the courtyard
      { id: 'w4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Wazir_Mosque%2C_Lahore.jpg', caption: 'Tiles of the Mughals', description: 'The facade of Wazir Khan Mosque blazes from within the courtyard — the finest faience tile work of the Mughal era, every surface a canvas of colour and geometry.', zone: 'main_structure' },
      // INT: 5 — Fresco-adorned prayer hall
      { id: 'w5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Interior_of_Wazir_Khan_Mosque.jpg', caption: 'The Prayer Hall', description: 'Inside the prayer hall, the walls are covered in elaborate buon frescoes that blend imperial Mughal motifs with local Punjabi decorative traditions.', zone: 'interior' },
      // INT: 6 — Close-up of geometric kashi-kari tile work inside
      { id: 'w6', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Beautiful_geometric_and_acoustics_pattern_at_Wazir_Khan_Mosque.jpg', caption: 'Geometry in Glazed Clay', description: 'Precise geometric patterns in glazed ceramic tiles — lajvard cobalt blue and firozi cerulean — demonstrate the mathematical mastery of Mughal craftsmen within the mosque.', zone: 'details' },
      // INT: 7 — Sunrise departure from the mosque rooftop
      { id: 'w7', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Lahore_sunrise_seen_from_Wazir_Khan_Mosque.jpg', caption: 'Sunrise Farewell', description: 'From the mosque\'s rooftop, the sun rises over the Walled City — a farewell from within the walls of the painted mosque as the minarets cast long shadows.', zone: 'exit_transition' },
    ],
  },
  {
    id: 'sheesh-mahal',
    slug: 'sheesh-mahal',
    title: 'Sheesh Mahal',
    subtitle: 'Palace of Mirrors',
    label: '06 — Palace of Mirrors',
    description: 'The Palace of Mirrors — Sheesh Mahal — is where Mughal artistry reached its zenith. Tiny mirror tiles reflect candlelight across marble walls.',
    longDescription: 'Built in 1631 under Emperor Shah Jahan within the Shahi Qila complex, the Sheesh Mahal served as the imperial harem\'s private quarters. Its walls are adorned with thousands of tiny mirror tiles (ayina kari) that transform a single candle into a galaxy of light. The marble filigree work, frescoes, and intricate pietra dura inlay represent the pinnacle of Mughal decorative arts. It remains one of the most exquisite examples of Mughal architecture in the world.',
    gradient: 'from-sky-900/80 via-indigo-700/40 to-sky-900/80',
    media: [
      // EXT: 1 — DRONE APPROACH — Elevated view of the Sheesh Mahal within the Shah Burj block
      { id: 's1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Sheesh_Mahal_in_Lahore_Fort.jpg', caption: 'The Mirror Palace Within the Fort', description: 'Sheesh Mahal sits at the north-western corner of Lahore Fort within the Shah Burj block — the private imperial quarter where only the emperor, princes, and select courtiers could tread.', zone: 'drone_approach' },
      // INT: 2 — The five cusped marble arches — the entrance to the palace
      { id: 's2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Sheesh_Mahal_Arches.jpg', caption: 'The Five Arches', description: 'Five cusped marble arches supported by coupled columns open into the courtyard — their engrailed spandrels inlaid with precious stones in pietra dura, greeting every visitor with Mughal grandeur.', zone: 'entrance' },
      // INT: 3 — The courtyard and water basin inside the palace complex
      { id: 's3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Sheesh_Mahal_at_Lahore_Fort.jpg', caption: 'Courtyard of the Palace', description: 'The paved courtyard spreads before the marble facade inside the palace complex, its central water basin with four fountains reflecting the sky in miniature.', zone: 'pathway' },
      // INT: 4 — The white marble facade in full from within the courtyard
      { id: 's4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Sheesh_Mahal_Arches.jpg', caption: 'Facade of the Palace of Mirrors', description: 'The semi-octagonal white marble pavilion rises with gilded cupolas, its five cusped arches framing the entrance to a hall roofed with thousands of convex mirrors.', zone: 'main_structure' },
      // INT: 5 — Inside the mirror hall
      { id: 's5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Palace_of_Mirrors.jpg', caption: 'Hall of Mirrors', description: 'Inside the central hall, every surface shimmers with ayina kari — convex mirror tiles set into stucco tracery, transforming candlelight into a thousand dancing stars.', zone: 'interior' },
      // INT: 6 — Close-up of the intricate mirror-work
      { id: 's6', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/The_Intricate_Mirror-Work_of_Sheesh_Mahal_%28Lahore_Fort%29.jpg', caption: 'Ayina Kari', description: 'Thousands of convex glass tiles in geometric and floral patterns cover the walls — each mirror painstakingly cut and set into stucco tracery that has gleamed for four centuries.', zone: 'details' },
      // INT: 7 — Departure from inside the palace complex
      { id: 's7', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Sheesh_Mahal_at_Lahore_Fort.jpg', caption: 'Departure from the Royal Quarter', description: 'As the visitor leaves the Palace of Mirrors, the courtyard water basin recedes — a farewell from within the most private corner of the Mughal fort.', zone: 'exit_transition' },
    ],
  },
  {
    id: 'library',
    slug: 'quaid-e-azam-library',
    title: 'Quaid-e-Azam Library',
    subtitle: 'Temple of Knowledge',
    label: '07 — Temple of Knowledge',
    description: 'Built during the British Raj as Montgomery Hall, the Quaid-e-Azam Library is a stunning Victorian structure set within the serene Bagh-e-Jinnah.',
    longDescription: 'Constructed in the mid-19th century, the Quaid-e-Azam Library is one of Lahore\'s most treasured colonial-era buildings. Originally the Montgomery and Lawrence Halls, it was renamed after Pakistan\'s founder, Quaid-e-Azam Muhammad Ali Jinnah. Housing over 125,000 books in English, Urdu, Arabic, and Persian, it stands as a symbol of learning and culture. Surrounded by the lush greenery of Bagh-e-Jinnah, the library\'s Victorian architecture with its grand halls and arched windows makes it a beloved landmark of Lahore.',
    gradient: 'from-blue-900/80 via-indigo-700/40 to-blue-900/80',
    media: [
      // EXT: 1 — DRONE APPROACH — Library rising from the gardens of Bagh-e-Jinnah
      { id: 'l1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Montgomery_Hall_(Quaid-e-Azam_Library)_on_a_pleasant_day.jpg', caption: 'Library from the Garden', description: 'The Quaid-e-Azam Library rises from the lush lawns of Bagh-e-Jinnah, its white neoclassical facade framed by Victorian-era trees and manicured hedges.', zone: 'drone_approach' },
      // INT: 2 — Entering through the colonnaded entrance
      { id: 'l2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Montgomery_Hall_Quaid-e-Azam_Library.jpg', caption: 'Montgomery Hall Facade', description: 'Passing through the grand entrance of Montgomery Hall, its colonnaded facade and Doric columns welcoming every reader into Lahore\'s great library.', zone: 'entrance' },
      // INT: 3 — The covered corridor linking the twin halls
      { id: 'l3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Montgomery_Hall_(Quaid-e-Azam_Library)_(3).JPG', caption: 'Connecting Corridor', description: 'Inside the library, the covered corridor links Lawrence and Montgomery Halls — designed by G. Stone to present a single unified whole between the twin Victorian halls.', zone: 'pathway' },
      // INT: 4 — The grand reading room interior
      { id: 'l4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/7/74/QUAID_E_AZAM_LIBRARY_LAHORE.jpg', caption: 'Temple of Knowledge', description: 'Inside the main hall — arched windows, ornate columns, and the stately symmetry of Lahore\'s grandest colonial library, housing 125,000 books within its walls.', zone: 'main_structure' },
      // INT: 5 — The grand stairway ascending through the library
      { id: 'l5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Qauid-e-Azam_Library_-_stairway,_Lahore.JPG', caption: 'Interior Stairway', description: 'Inside the library, a grand stairway ascends beneath vaulted ceilings — the quiet heartbeat of a building that has served as Gymkhana, academy, and sanctuary for 125,000 books.', zone: 'interior' },
      // INT: 6 — Fountain and facade viewed from inside the garden grounds
      { id: 'l6', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Quaid_e_azam_library_front_facade_and_fountain_with_rainbow.jpg', caption: 'Fountain and Facade', description: 'Inside the library grounds, the Victorian fountain catches a rainbow — water and light dancing before the colonnaded entrance of Lahore\'s great reading hall.', zone: 'details' },
      // INT: 7 — Departure from inside the library halls
      { id: 'l7', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/QUAID_E_AZAM_PUBLIC_LIBRARY_LAHORE.jpg', caption: 'Departure from the Halls', description: 'As the visitor departs from within the library halls, the eastern facade glows in the afternoon light — a farewell from the rooms named after Jinnah, Sir Syed, and Moulvi Abdul Haq.', zone: 'exit_transition' },
    ],
  },
  {
    id: 'lahore-museum',
    slug: 'lahore-museum',
    title: 'Lahore Museum',
    subtitle: 'Wonder House of History',
    label: '08 — Wonder House of History',
    description: 'Established in 1865, the Lahore Museum is Pakistan\'s largest museum, housing over 60,000 artefacts spanning the Indus Valley Civilization to the Mughal Empire.',
    longDescription: 'The Lahore Museum, known locally as Ajayb Ghar (Wonder House), was founded in 1865 and moved to its current Indo-Saracenic building on The Mall in 1894. Designed by architect Bhai Ram Singh and John Lockwood Kipling, the museum\'s red-brick facade is a masterpiece in itself. Its collection includes Gandhara sculptures, Mughal miniature paintings, rare manuscripts, ancient coins, and the famous Fasting Buddha. The museum also features a stunning ceiling mural by Sadequain spanning 96 feet.',
    gradient: 'from-amber-900/80 via-yellow-700/40 to-amber-900/80',
    media: [
      // EXT: 1 — DRONE APPROACH — The museum rising along The Mall
      { id: 'lm1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/The_Lahore_Museum.jpg', caption: 'Museum on The Mall', description: 'The Lahore Museum rises along The Mall Road, its red-brick Indo-Saracenic facade a landmark of colonial Lahore\'s grandest avenue.', zone: 'drone_approach' },
      // INT: 2 — Entering through the original marble entrance porch
      { id: 'lm2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Lahore_Museum_Front_View.jpg', caption: 'Grand Entrance', description: 'Passing through the clock tower entrance with its marble porch designed by Bhai Ram Singh — stepping into the Wonder House of 60,000 artefacts.', zone: 'entrance' },
      // INT: 3 — Walking through the forecourt into the museum
      { id: 'lm3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Front_View_of_Lahore_Museum.jpg', caption: 'Forecourt Approach', description: 'Inside the museum grounds, the forecourt leads past the Zamzama Gun toward the red-brick facade that has welcomed visitors through its doors since 1894.', zone: 'pathway' },
      // INT: 4 — The grand hall inside the museum
      { id: 'lm4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Lahore_Museum%2C_Lahore.jpg', caption: 'Indo-Saracenic Hall', description: 'Inside the museum — the architecture blends Mughal, Hindu, and Gothic elements in a masterpiece of Indo-Saracenic design housing 60,000 artefacts of South Asian history.', zone: 'main_structure' },
      // INT: 5 — Buddhist Gallery inside the museum
      { id: 'lm5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Buddhist_Gallery_of_Lahore_Museum.jpg', caption: 'Buddhist Gallery', description: 'Deep inside the museum, the Buddhist Gallery houses Gandhara sculptures spanning five centuries — serene Buddha figures in grey schist telling the story of Buddhism\'s journey.', zone: 'interior' },
      // INT: 6 — Ornate ceiling of the entrance hall
      { id: 'lm6', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Details_of_Lahore_Museum_entrance_ceiling.jpg', caption: 'Entrance Ceiling', description: 'Inside the entrance hall, the ornate wooden ceiling features intricate geometric patterns — a prelude to the artistic treasures within the museum\'s galleries.', zone: 'details' },
      // INT: 7 — Departure from within the galleries
      { id: 'lm7', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Inside_Lahore_Museum.jpg', caption: 'Departure from the Wonder House', description: 'As the visitor leaves the galleries behind, the Buddha statues of Gandhara stand in eternal contemplation within — a farewell from the Ajayb Ghar.', zone: 'exit_transition' },
    ],
  },
  {
    id: 'jahangir-tomb',
    slug: 'tomb-of-jahangir',
    title: 'Tomb of Jahangir',
    subtitle: 'Mughal Emperor\'s Rest',
    label: '09 — Mughal Emperor\'s Rest',
    description: 'Built in 1637, the Tomb of Jahangir in Shahdara is a magnificent Mughal mausoleum set within the serene Dilkusha Garden, a masterpiece of Mughal architecture.',
    longDescription: 'The Tomb of Emperor Jahangir, constructed by his son Shah Jahan, is located in Shahdara Bagh on the banks of the River Ravi. The mausoleum features stunning pietra dura inlay work, intricate marble filigree, and a vast char bagh garden. The interior is adorned with exquisite frescoes and the marble cenotaph is inscribed with the 99 names of Allah. It is the only surviving Mughal tomb in Pakistan and one of Lahore\'s most important historical landmarks.',
    gradient: 'from-stone-900/80 via-amber-700/40 to-stone-900/80',
    media: [
      // EXT: 1 — DRONE APPROACH — Dilkusha Garden approach to the tomb
      { id: 'jt1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Tomb_of_Jahangir_and_gardens.jpg', caption: 'Garden Approach', description: 'The mausoleum rises beyond the Dilkusha Garden, its sandstone bulk framed by the manicured char bagh that Jahangir himself once tended.', zone: 'drone_approach' },
      // INT: 2 — Passing through the main gate into the complex
      { id: 'jt2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Gate_leading_to_the_tomb_of_Jahangir_(7963481).jpg', caption: 'Main Gateway', description: 'Passing through the entrance gate into the imperial precinct, the garden pathway opens toward one of Lahore\'s greatest Mughal monuments.', zone: 'entrance' },
      // INT: 3 — Walking through the Dilkusha Garden inside the complex
      { id: 'jt3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Tomb_of_Jahangir_gardens_by_Damn_Cruze_2.jpg', caption: 'Walk Through Dilkusha', description: 'Inside the tomb complex, garden pathways lead through the Dilkusha — the "heart\'s delight" garden where Emperor Jahangir spent his final days.', zone: 'pathway' },
      // INT: 4 — The mausoleum from within the garden
      { id: 'jt4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Tomb_of_Emperor_Jahangir.jpg', caption: 'Mausoleum of the Emperor', description: 'From inside the complex, the red sandstone mausoleum rises against the sky — its four minarets and marble dome marking the final resting place of the fourth Mughal Emperor.', zone: 'main_structure' },
      // INT: 5 — The marble cenotaph inside the burial chamber
      { id: 'jt5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Burial_Chamber%2C_Jehangir%27s_Tomb.jpg', caption: 'Burial Chamber', description: 'Inside the burial chamber, the marble cenotaph is adorned with intricate pietra dura inlay — the 99 names of Allah inscribed in marble, surrounding the Emperor\'s eternal rest.', zone: 'interior' },
      // INT: 6 — White marble details inside the tomb
      { id: 'jt6', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/53/White_marble_cupolas_cap_minarets_at_the_Tomb_of_Jahangir.jpg', caption: 'Minaret and Cupolas', description: 'Inside the complex, white marble cupolas cap the four corner minarets — their lotus finials rising above the red sandstone in timeless Mughal symmetry.', zone: 'details' },
      // INT: 7 — Departure through the arcaded verandas
      { id: 'jt7', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Tomb_of_Jahangir_Lahore_Pakistan.jpg', caption: 'Departure from Shahdara', description: 'Departing through the arcaded verandas, the Mughal arches frame a farewell from within the tomb — the River Ravi flowing silently beyond the garden walls.', zone: 'exit_transition' },
    ],
  },
  {
    id: 'lahore-zoo',
    slug: 'lahore-zoo',
    title: 'Lahore Zoo',
    subtitle: 'Wild Heart of the City',
    label: '10 — Wild Heart of the City',
    description: 'Established in 1872, Lahore Zoo is one of the oldest zoos in the world, home to over 1,300 animals of 135 species in the heart of the city.',
    longDescription: 'Lahore Zoo was established in 1872 during the British Raj and spans 25 acres on The Mall Road. It is one of the oldest zoos in South Asia and the largest in Pakistan, attracting over 3 million visitors annually. The zoo houses a diverse collection including Bengal tigers, lions, elephants, giraffes, zebras, chimpanzees, and a large bird aviary. Recent renovations have transformed the enclosures while preserving the zoo\'s historic character, making it a beloved family destination.',
    gradient: 'from-green-900/80 via-emerald-700/40 to-green-900/80',
    media: [
      // EXT: 1 — DRONE APPROACH — Entrance to the zoo
      { id: 'z1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Lahore_Zoo1.jpg', caption: 'Zoo Entrance', description: 'The entrance to Pakistan\'s oldest zoo — 25 acres of wildlife on The Mall, home to over 1,300 animals since 1872.', zone: 'drone_approach' },
      // INT: 2 — Entering through the historic bird cage aviary
      { id: 'z2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Lahore_zoo_-_june_3_2004-%2816%29-Bird_Cage.JPG', caption: 'The Iconic Aviary', description: 'Entering through the historic bird-shaped aviary — one of the oldest zoo structures in South Asia, where parrots and peacocks greet visitors inside the massive cage.', zone: 'entrance' },
      // INT: 3 — Walking through tree-lined pathways inside the zoo
      { id: 'z3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Lahore_Zoo_7.jpg', caption: 'Zoo Pathways', description: 'Walking through the tree-lined pathways inside the zoo — shaded paths wind past animal enclosures through the zoo\'s historic 25-acre grounds.', zone: 'pathway' },
      // INT: 4 — Inside the Asian elephant enclosure
      { id: 'z4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Elephant%2C_Lahore_Zoo%2C_Pakistan.jpg', caption: 'Asian Elephant', description: 'The Asian elephant enclosure — one of the zoo\'s most beloved residents, an ambassador for wildlife conservation inside the heart of the city.', zone: 'main_structure' },
      // INT: 5 — Inside the aviary — white peacock
      { id: 'z5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/White_Indian_peafowl_(Lahore_Zoo)_by_Damn_Cruze.jpg', caption: 'White Peacock', description: 'Inside the aviary, a rare white peacock displays its plumage — its leucistic feathers a genetic marvel that draws visitors from across Pakistan to see it up close.', zone: 'interior' },
      // INT: 6 — Hippopotamus enclosure inside the zoo
      { id: 'z6', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Hippo%2C_Lahore_Zoo%2C_Pakistan.jpg', caption: 'Hippopotamus', description: 'Inside the hippopotamus enclosure — watching these massive creatures glide through water fascinates children and adults alike at one of the most popular exhibits.', zone: 'details' },
      // INT: 7 — Departure through the zoo
      { id: 'z7', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Lahore_zoo_-_june_3_2004-%2816%29-Bird_Cage.JPG', caption: 'Departure from the Wild', description: 'Departing through the zoo, the historic bird cage stands as a farewell — the wild heart of Lahore, seen through a century of visitors\' eyes from within its grounds.', zone: 'exit_transition' },
    ],
  },
  {
    id: 'shalimar',
    slug: 'shalimar-gardens',
    title: 'Shalimar Gardens',
    subtitle: 'Mughal Paradise Garden',
    label: '11 — Mughal Paradise Garden',
    description: 'Built by Emperor Shah Jahan in 1641, the Shalimar Gardens are a UNESCO World Heritage site and a masterpiece of Mughal garden design with 410 fountains.',
    longDescription: 'The Shalimar Gardens were constructed in 1641-42 by Mughal Emperor Shah Jahan, spanning 16 hectares across three terraced levels. Each terrace has its own name — Farah Baksh (Bestower of Pleasure), Faiz Baksh (Bestower of Goodness), and Hayat Baksh (Bestower of Life). The gardens feature 410 marble fountains, five water cascades, elegant pavilions, and meticulously planned orchards. Water was channeled from over 100 miles away through an engineering marvel that still inspires awe. A UNESCO World Heritage site, it represents the pinnacle of Mughal garden art.',
    gradient: 'from-teal-900/80 via-emerald-700/40 to-teal-900/80',
    media: [
      // EXT: 1 — DRONE APPROACH — Panoramic view from Farah Baksh terrace
      { id: 'sg1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Shalimar_Gardens_%28Lahore%29.jpg', caption: 'Panoramic View', description: 'The three terraced levels of Shalimar Gardens stretch out in perfect Mughal symmetry across 16 hectares — Farah Baksh, Faiz Baksh, and Hayat Baksh.', zone: 'drone_approach' },
      // INT: 2 — Entering through marble pavilions into the garden
      { id: 'sg2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Shalimar_Gardens_%28Lahore%29_1.jpg', caption: 'Pavilions & Pools', description: 'Inside the garden, elegant marble pavilions overlook reflecting pools connected by 410 fountains — the entrance through three levels of Mughal paradise.', zone: 'entrance' },
      // INT: 3 — Walking through the terraced garden levels
      { id: 'sg3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Shalimar_garden_lahore.jpg', caption: 'Garden Terraces', description: 'Walking through the interior of the garden — the three terraced levels descend in perfect symmetry, each named after the blessings they bestow: Pleasure, Goodness, and Life.', zone: 'pathway' },
      // INT: 4 — Inside the upper Farah Baksh terrace
      { id: 'sg4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shalimar_Gardens.jpg', caption: 'Farah Baksh Terrace', description: 'Inside the highest terrace — Farah Baksh (Bestower of Pleasure) — reserved for the Emperor and his harem, offering the finest view of the garden from within its walls.', zone: 'main_structure' },
      // INT: 5 — Chini Khanas — decorative tile niches inside the pavilion
      { id: 'sg5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Chini_Khanas%2C_Shalimar_Gardens%2C_Lahore%2C_Punjab%2C_Pakistan.jpg', caption: 'Chini Khanas', description: 'Deep inside the pavilion, decorative tile niches (Chini Khanas) line the walls — once holding flowers by day and oil lamps by night, a constellation within the garden.', zone: 'interior' },
      // INT: 6 — Water channels and fountains inside the garden
      { id: 'sg6', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Shalimar_Gardens_%28Lahore%29.jpg', caption: 'Mughal Symmetry', description: 'Inside the garden, fountains, waterways, and marble channels create a perfect grid of water and light — each of the 410 fountains fed by a canal from Kashmir.', zone: 'details' },
      // INT: 7 — Departure through the garden
      { id: 'sg7', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Shalimar_garden_lahore.jpg', caption: 'Departure from Paradise', description: 'Departing through the interior of the garden, the descending terraces offer a farewell from paradise — a garden where emperors once walked within its walls.', zone: 'exit_transition' },
    ],
  },
  {
    id: 'bagh-jinnah',
    slug: 'bagh-e-jinnah',
    title: 'Bagh-e-Jinnah',
    subtitle: 'Lawrence Gardens',
    label: '12 — Lawrence Gardens',
    description: 'Formerly Lawrence Gardens, Bagh-e-Jinnah is a 141-acre botanical garden and park on The Mall, home to the Quaid-e-Azam Library and a historic cricket ground.',
    longDescription: 'Bagh-e-Jinnah, originally Lawrence Gardens, was established in 1862 as a botanical garden modelled on Kew Gardens in London. Spanning 141 acres on The Mall, it is one of Lahore\'s most beloved green spaces. The park contains over 150 species of trees, 140 varieties of shrubs, a beautiful mosque (Masjid Dar-ul-Islam), the iconic Quaid-e-Azam Library, and the historic Gymkhana Cricket Ground which hosted Pakistan\'s first Test matches. It is a living museum of colonial-era horticulture and a serene escape in the heart of the city.',
    gradient: 'from-lime-900/80 via-green-700/40 to-lime-900/80',
    media: [
      // EXT: 1 — DRONE APPROACH — The garden from The Mall
      { id: 'bj1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Bagh-e-Jinnah_Lahore_Pakistan.jpg', caption: 'Greenery & Pathways', description: 'Lush green lawns and tree-lined pathways make Bagh-e-Jinnah a serene oasis on The Mall — 141 acres of Victorian botanical heritage in the heart of Lahore.', zone: 'drone_approach' },
      // INT: 2 — Entering the garden past the library
      { id: 'bj2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/7/74/QUAID_E_AZAM_LIBRARY_LAHORE.jpg', caption: 'Quaid-e-Azam Library', description: 'Inside the gardens, the Victorian-style library building rises as the architectural centerpiece — its white neoclassical facade visible from every corner of the 141-acre park.', zone: 'entrance' },
      // INT: 3 — Walking along the tree-lined trail inside the garden
      { id: 'bj3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Ali_Imran-Walking_Trail_in_Lawrence_Gardens_%28Bagh-e-Jinnah%29_June_4_2004.jpg', caption: 'Walking Trail', description: 'Walking through the interior of the garden — tree-lined trails wind through 150 species of trees and 140 varieties of shrubs, a living botanical museum inside the park.', zone: 'pathway' },
      // INT: 4 — Inside the Gymkhana Cricket Ground
      { id: 'bj4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Bagh-e-Jinnah_Lahore.jpg', caption: 'Gymkhana Cricket Ground', description: 'Inside the historic Gymkhana Cricket Ground — where Pakistan\'s first Test match was played beneath the shadow of Mughal-era trees within the garden.', zone: 'main_structure' },
      // INT: 5 — Deep inside the canopied garden
      { id: 'bj5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Bagh-e-Jinnah_Lahore_Pakistan.jpg', caption: 'Inside the Garden', description: 'Deep inside the 141-acre park, the canopy of 150 tree species creates a shaded sanctuary — a living interior of green tunnels, dappled light, and century-old botany.', zone: 'interior' },
      // INT: 6 — Fountain inside the garden grounds
      { id: 'bj6', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/A_fountain_in_Bagh-e-Jinnah.jpg', caption: 'Fountain Gardens', description: 'Inside the grounds, European-style fountains and manicured flowerbeds reflect the garden\'s Victorian heritage — watering 140 varieties of shrubs within the park.', zone: 'details' },
      // INT: 7 — Departure — looking back at the historic hall from inside
      { id: 'bj7', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Montgomery_Hall_1890s.jpg', caption: 'Historic Montgomery Hall', description: 'Departing from within the garden grounds, Montgomery Hall in the 1890s — a Victorian monument to learning whose halls have witnessed over a century of Lahore\'s intellectual life.', zone: 'exit_transition' },
    ],
  },
];

export const homeMedia: MediaItem[] = [
  // Day scenes — different Lahore landmarks
  { id: 'hm_day1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Top_Aerial_View_of_Minar_e_Pakistan.jpg', caption: '', description: '' },
  { id: 'hm_day2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Shahi_Qila_%28Lahore_Fort_Gate%29.JPG', caption: '', description: '' },
  { id: 'hm_day3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Montgomery_Hall_(Quaid-e-Azam_Library)_on_a_pleasant_day.jpg', caption: '', description: '' },
  { id: 'hm_day4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/The_Lahore_Museum.jpg', caption: '', description: '' },
  { id: 'hm_day5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Tomb_of_Jahangir_and_gardens.jpg', caption: '', description: '' },
  { id: 'hm_day6', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Lahore_Zoo1.jpg', caption: '', description: '' },
  { id: 'hm_day7', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Shalimar_Gardens_%28Lahore%29.jpg', caption: '', description: '' },
  { id: 'hm_day8', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Bagh-e-Jinnah_Lahore_Pakistan.jpg', caption: '', description: '' },
  { id: 'hm_day9', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Inside_of_the_main_gate_of_Lahore_Fort.jpg', caption: '', description: '' },
  // Dusk / sunset scenes
  { id: 'hm_dusk1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Badshahi_Mosque_Sunset.jpg', caption: '', description: '' },
  { id: 'hm_dusk2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Lahore_sunrise_seen_from_Wazir_Khan_Mosque.jpg', caption: '', description: '' },
  // Night scenes
  { id: 'hm_night1', type: 'image', src: pexelsImg(11784631), caption: '', description: '' },
  { id: 'hm_night2', type: 'image', src: unsplashImg('XkA0rziC9sc'), caption: '', description: '' },
  { id: 'hm_night3', type: 'image', src: pexelsImg(35735102), caption: '', description: '' },
  // Video (day drone)
  { id: 'hm_vid1', type: 'video', src: pexelsVid(12102419), caption: '', description: '' },
  { id: 'hm_vid2', type: 'video', src: pexelsVid(9003971), caption: '', description: '' },
  // Additional cinematic scenes
  { id: 'hm_ext1', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Wazir_Mosque%2C_Lahore.jpg', caption: '', description: '' },
  { id: 'hm_ext2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Sheesh_Mahal,_Shahi_Qila,_Lahore_(1).jpg', caption: '', description: '' },
  { id: 'hm_ext3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Badshahi_Mosque_Sunset.jpg', caption: '', description: '' },
  { id: 'hm_ext4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Buddhist_Gallery_of_Lahore_Museum.jpg', caption: '', description: '' },
  { id: 'hm_ext5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Chini_Khanas%2C_Shalimar_Gardens%2C_Lahore%2C_Punjab%2C_Pakistan.jpg', caption: '', description: '' },
  { id: 'hm_ext6', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Burial_Chamber%2C_Jehangir%27s_Tomb.jpg', caption: '', description: '' },
  { id: 'hm_ext7', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/The_Intricate_Mirror-Work_of_Sheesh_Mahal_%28Lahore_Fort%29.jpg', caption: '', description: '' },
  { id: 'hm_ext8', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Grave_of_Muhammad_Iqbal.jpg', caption: '', description: '' },
  { id: 'hm_ext9', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Interior_of_Wazir_Khan_Mosque.jpg', caption: '', description: '' },
  { id: 'hm_ext10', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/The_beautiful_%27baagh%27_where_%27mehfil%27_used_to_take_place_in_the_centre_of_the_King%27s_mosque.JPG', caption: '', description: '' },
];
