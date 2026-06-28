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
  objectPosition?: string;
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
  heroImage?: string;
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
      { id: 'm_vid', type: 'video', src: 'https://videos.pexels.com/video-files/12102419/12102419-hd_1080_1920_60fps.mp4', caption: 'Approaching Minar-e-Pakistan', description: 'A sweeping aerial approach over Greater Iqbal Park reveals the 70-metre tower rising from its five-pointed star base — the monument where Pakistan\'s founding resolution was passed on 23 March 1940.', zone: 'drone_approach' },
      { id: 'm4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Top_Aerial_View_of_Minar_e_Pakistan.jpg', caption: 'The Flower Star', description: 'From directly above, the monument\'s base blossoms like a five-pointed flower — each petal a platform clad in Taxila stone, the central spire rising from its heart like a stem reaching for the sky.', zone: 'entrance' },
      { id: 'm2', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Minar-e-Pakistan_%28Iqbal_Park%29.jpg', caption: 'Minar in the Park', description: 'The Minar-e-Pakistan stands majestically within Greater Iqbal Park — 141 acres of green lawns surround the monument where the Pakistan Resolution was passed in 1940, now a gathering place for millions.', zone: 'pathway' },
      { id: 'm1', type: 'image', src: 'https://miro.medium.com/1*YrCGKVyMvgu2dKURZeaBEw.jpeg', caption: 'Tower of Freedom', description: 'The 70-metre spire rises in four distinct tiers — each level representing a stage of Pakistan\'s freedom movement, from the 1940 Resolution to independence in 1947.', zone: 'main_structure' },
      { id: 'm9', type: 'image', src: 'https://letstravel.pk/wp-content/uploads/2022/11/minar-e-pakistan-architecture.jpeg', caption: 'Inside View of Minar', description: 'Looking up from within the monument — the soaring interior walls and intricate architectural details reveal the craftsmanship of Nasreddin Murat-Khan\'s design, where Islamic geometry meets modern minimalism.', zone: 'interior' },
      { id: 'm5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Minar-e-Pakistan_%2C_Lahore_%2C_Punjab.jpg', caption: 'Stone & Scripture', description: 'The tower\'s facade blends carved stone, marble inlay, and inscribed calligraphy — Quranic verses and commemorative text adorn the walls of architect Nasreddin Murat-Khan\'s masterpiece.', zone: 'details' },
      { id: 'm3', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Minar-E-Pakistan_Lights.jpg', caption: 'Night Over Lahore', description: 'As night falls, the Minar-e-Pakistan is dramatically illuminated — its glowing silhouette visible for miles across Lahore, a timeless beacon of freedom watching over Iqbal Park.', zone: 'exit_transition' },
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
      { id: 'b_vid', type: 'video', src: 'https://videos.pexels.com/video-files/9003971/9003971-hd_1920_1080_25fps.mp4', caption: 'Panoramic View', description: 'A sweeping cinematic pan across the Badshahi Mosque against a perfect blue Lahore sky, revealing its full grandeur.', zone: 'drone_approach' },
      { id: 'b2', type: 'image', src: 'https://nust.edu.pk/wp-content/uploads/2023/04/Badshahi-Mosque-scaled.jpg', caption: 'The Emperor\'s Mosque', description: 'Built in 1673 by Emperor Aurangzeb, the Badshahi Mosque stands as a masterpiece of Mughal architecture — its red sandstone facade glowing under the sun.', zone: 'main_structure' },
      { id: 'b4', type: 'image', src: 'https://c8.alamy.com/comp/BNBB4H/entrance-to-the-badshahi-mosque-lahore-punjab-pakistan-BNBB4H.jpg', caption: 'Main Entrance', description: 'Passing through the towering entrance gateway of the Badshahi Mosque — a monumental threshold built in 1673 that has welcomed millions through its arched passage.', zone: 'entrance' },
      { id: 'b3', type: 'image', src: 'https://www.traveladventures.org/countries/pakistan/images/badshahi-mosque09.jpg', caption: 'Courtyard View', description: 'Inside the vast courtyard, the prayer hall\'s facade stretches across the horizon — 276,000 square feet of marble paving leading to the imperial prayer chambers.', zone: 'pathway' },
      { id: 'b5', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/9/98/The_prayer_hall_of_Badshahi_Mosque.jpg', caption: 'Prayer Hall', description: 'Inside the prayer hall — massive arched bays rise to the ceiling, red sandstone and white marble creating a rhythmic forest of columns beneath three domes.', zone: 'main_structure' },
      { id: 'b7', type: 'image', src: 'https://kasgraphy.com/wp-content/uploads/2025/08/Interior-and-Exit-View-of-Badshahi-Masjid-Lahore-1024x576.jpg', caption: 'Interior Corridor', description: 'Within the mosque\'s interior corridors, arched passageways connect the vast prayer halls — the interplay of light and shadow across red sandstone creating a meditative atmosphere.', zone: 'interior' },
      { id: 'b6', type: 'image', src: 'https://media.istockphoto.com/id/623198144/photo/prayer-hall-of-badshahi-or-imperial-mosque-lahore-pakistan.jpg?s=612x612&w=0&k=20&c=Pxzq24F1kfv0UDONgkDJlsmIEeyIP26U9O92G9vGSvM=', caption: 'Inside the Prayer Hall', description: 'Deep inside the imperial prayer hall — the mihrab marks the direction of Mecca, where 100,000 worshippers have knelt in prayer over three centuries.', zone: 'interior' },
      { id: 'b8', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Courtyard_of_Badshahi_Mosque.jpg', caption: 'Courtyard Details', description: 'The courtyard\'s marble paving and arched cloisters surround the central fountain — where worshippers perform ablution before entering the prayer hall.', zone: 'details' },
      { id: 'b10', type: 'image', src: 'https://img.fotocommunity.com/badshahi-masjid-at-night-1ac578c3-1dd2-4e61-91a4-ff2bb36878fd.jpg?width=1000', caption: 'Badshahi Mosque at Night', description: 'As night falls, the Badshahi Mosque transforms — its red sandstone walls bathed in golden light, the silhouette of domes and minarets reflected in the courtyard pools.', zone: 'exit_transition' },
      { id: 'b11', type: 'image', src: 'https://images.pexels.com/photos/30511059/pexels-photo-30511059.jpeg?auto=compress&cs=tinysrgb&w=1600', caption: 'Night Over Lahore', description: 'The illuminated mosque stands as a beacon over Lahore — three centuries of history captured in the glow of its marble domes and towering minarets.', zone: 'exit_transition' },
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
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Muhammad_Allama_Iqbal%E2%80%99s_Tomb.JPG',
    media: [
      { id: 'i1', type: 'image', src: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/e280ae68831235.5b6aef8fc70cd.jpg', caption: 'Mazar-e-Iqbal', description: 'The Tomb of Allama Iqbal stands in Hazuri Bagh — red sandstone walls blending Afghan and Moorish styles, a serene resting place for the Poet of the East.', zone: 'drone_approach' },
      { id: 'i2', type: 'image', src: 'https://tzmedia.b-cdn.net/media/images/pk/place/gallery/medium/47aa95155b8bc27b8dfb4c87116680ed.jpg', caption: 'Approaching the Tomb', description: 'Aerial view of the mausoleum set between the Badshahi Mosque and Lahore Fort — the most regal resting place in all of Lahore, visited by thousands daily.', zone: 'entrance', objectPosition: '30% center' },
      { id: 'i3', type: 'image', src: 'https://live.staticflickr.com/293/18429458503_d9081a0acc_b.jpg', caption: 'The Royal Resting Place', description: 'The red sandstone mausoleum with its white marble dome rises within the lush Hazuri Bagh — stone from Jaipur, marble from Makrana, crafted into a monument of national reverence.', zone: 'pathway' },
      { id: 'i4', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Grave_of_Allama_iqbal.jpg/960px-Grave_of_Allama_iqbal.jpg', caption: 'The Poet\'s Grave', description: 'Inside the mausoleum, the white marble cenotaph is adorned with a lapis lazuli tombstone from Afghanistan — Quranic verses carved into the deep blue stone mark Iqbal\'s eternal rest.', zone: 'main_structure' },
      { id: 'i5', type: 'image', src: 'https://infopediapk.weebly.com/uploads/5/8/7/9/5879298/4241712_orig.jpg', caption: 'Verses in Stone', description: 'Inside the tomb chamber, six couplets from Zabur-e-Ajam are carved into the walls — the poet\'s own Persian verses echoing through the sanctuary he designed with his words.', zone: 'interior' },
      { id: 'i6', type: 'image', src: 'https://media.gettyimages.com/id/1176152611/photo/allama-iqbal-tomb-lahore.jpg?s=1024x1024&w=gi&k=20&c=rF-6aQtdZn-ELI2abUzT_bzze0zHVzf04WXCSPfpvFM=', caption: 'The Mausoleum Facade', description: 'The tomb\'s facade displays intricate marble inlay and calligraphy — verses from the poet who gave Pakistan its vision, inscribed in stone for eternity.', zone: 'details' },
      { id: 'i7', type: 'image', src: 'https://d2kihw5e8drjh5.cloudfront.net/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nL2UzY2JhNDBmYjg2NDRiNmZiZjgzYWNlODBkYTA0OTcyIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo2NDAsImhlaWdodCI6NjQwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJ0b0Zvcm1hdCI6ICJ3ZWJwIn19', caption: 'Hazuri Bagh Surroundings', description: 'The tomb is framed by the gardens of Hazuri Bagh and the towering Badshahi Mosque — a dialogue between Lahore\'s greatest Mughal and modern monuments.', zone: 'details' },
      { id: 'i8', type: 'image', src: 'https://api.salampakistan.gov.pk/photo-1631084365776.jpeg', caption: 'Departure from Mazar-e-Iqbal', description: 'As the visitor departs, the mausoleum recedes into the garden — a farewell from the thinker whose poetry continues to inspire a nation, resting in eternal peace.', zone: 'exit_transition' },
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
    heroImage: 'https://www.shutterstock.com/shutterstock/videos/3717677539/thumb/1.jpg?ip=x480',
    media: [
      { id: 'fi2', type: 'image', src: 'https://www.prideofpakistan.com/header_images/header_large_40.jpg', caption: 'The Fortress Walls', description: 'The fort\'s formidable sandstone walls rise above Hazuri Bagh — a testament to over a thousand years of continuous habitation and power.', zone: 'entrance' },
      { id: 'fi3', type: 'image', src: 'https://archnet-3-prod-iiif-cloud-c0fe51f0b9ac.herokuapp.com/public/resources/a59b1400-ece2-4151-91f4-e9db03eb24c7/iiif', caption: 'Architectural Grandeur', description: 'The intricate masonry and arched niches of the fort reveal the craftsmanship of Mughal master builders — every detail carved with precision and purpose.', zone: 'pathway' },
      { id: 'fi4', type: 'image', src: 'https://www.prideofpakistan.com/header_images/1588521518---LahoreFort2.jpg', caption: 'Inside the Fort', description: 'Beyond the Alamgiri Gate lies a world of Mughal opulence — courtyards, pavilions, and gardens that once hosted emperors, now open to the footsteps of history.', zone: 'pathway' },
      { id: 'fi5', type: 'image', src: 'https://the.akdn/_next/image?url=https%3A%2F%2Fstatic.the.akdn%2F53832%2F1642523820-aktc-pakistan-dscf9715_r.jpg%3Fw%3D1800%26auto%3Dformat&w=3840&q=75', caption: 'The Picture Wall', description: 'The famous Picture Wall of Lahore Fort — a masterpiece of mosaic tile work (kashi kari) depicting elephants, hunters, angels, and polo players in vibrant blues and greens.', zone: 'main_structure' },
      { id: 'fi6', type: 'image', src: 'https://www.lahorebiennale.org/wp-content/uploads/2019/12/IMG_0418e-copy-2.jpg', caption: 'Courtyard Within', description: 'Inside the fort\'s courtyards, the Mughal aesthetic of symmetry and water features creates a sense of paradise on earth — gardens and pavilions designed for both ceremony and respite.', zone: 'main_structure' },
      { id: 'fi7', type: 'image', src: 'https://www.nation.com.pk/print_images/large/2016-03-24/the-best-kept-secret-of-lahore-fort-1458766616-9016.jpg', caption: 'The Best Kept Secret', description: 'Hidden within the fort walls are chambers and corridors that few visitors see — quiet spaces where the everyday life of the Mughal court once unfolded.', zone: 'interior' },
      { id: 'fi8', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Shahi_Qila_Bath_Tub.jpg', caption: 'Shahi Qila Royal Bath', description: 'A Mughal-era royal bath (hamam) carved from a single sandstone block within the fort — once used by emperors and nobles for ritual purification, now a silent relic of palace luxury.', zone: 'interior' },
      { id: 'fi9', type: 'image', src: 'https://l13.alamy.com/360/PN87DN/naulakha-pavilion-shahi-quila-lahore-fort-PN87DN.jpg', caption: 'Naulakha Pavilion', description: 'The Naulakha Pavilion, built by Shah Jahan — its distinctive curved roof and marble inlay make it one of the most photographed structures within the fort complex.', zone: 'interior' },
      { id: 'fi10', type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/2._Alamgiri_gate_inside_shahi_qila_in_the_background_minarets_of_shai_masjid_visible.jpg', caption: 'Alamgiri Gate from Within', description: 'Looking back at the Alamgiri Gate from inside the fort, the minarets of Badshahi Mosque rise beyond — the eternal dialogue between Lahore\'s two greatest Mughal monuments.', zone: 'interior' },
      { id: 'fi11', type: 'image', src: 'https://i.tribune.com.pk/media/images/2208479-image-1588013919/2208479-image-1588013919.jpg', caption: 'Restoration in Progress', description: 'The ongoing restoration of Shahi Qila reveals layers of history — conservation work unearthing Mughal frescoes beneath centuries of plaster and paint.', zone: 'details' },
      { id: 'fi12', type: 'image', src: 'https://i.tribune.com.pk/media/images/65fc1bb2-8488-4442-a_1738133406/65fc1bb2-8488-4442-a_1738133406.jpg', caption: 'Excavated Relics', description: 'Archaeological excavations within the fort continue to reveal treasures of the Mughal era — ceramics, coins, and architectural fragments telling stories of daily court life.', zone: 'details' },
      { id: 'fi13', type: 'image', src: 'https://vepakistan.com/wp-content/uploads/2024/05/Naulakha_Pavilion_in_Lahore_Fort.jpg', caption: 'Naulakha Pavilion View', description: 'The Naulakha Pavilion viewed from the courtyard — its white marble curved roof glistening against the fort\'s sandstone walls, a masterpiece of Shah Jahan\'s imperial vision.', zone: 'details' },
      { id: 'fi14', type: 'image', src: 'https://kasgraphy.com/wp-content/uploads/2025/08/Lahore-Fort-Entrance-and-Badshahi-Masjid-View.jpg', caption: 'Departure from Shahi Qila', description: 'As the visitor exits through the Alamgiri Gate, the Badshahi Mosque stands across the garden — a parting view of Lahore\'s inseparable Mughal twins.', zone: 'exit_transition' },
      { id: 'fi15', type: 'image', src: 'https://amuslimtraveller.wordpress.com/wp-content/uploads/2015/08/11899906_10153535997301405_8725181860988118476_n.jpg', caption: 'Farewell to the Fort', description: 'The Shahi Qila recedes into the twilight as the visitor departs — centuries of Mughal, Sikh, and British rule echoing in its silent walls, a farewell from the heart of Lahore.', zone: 'exit_transition' },
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
