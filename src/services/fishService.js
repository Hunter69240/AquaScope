import api from "../api/api";

export const getFish =  (fish)=>{
    console.log("Getting fish data...",fish);
    const data={
        
    "scientificName": "Allothunnus fallai Serventy, 1948",
    "genus": "Allothunnus",
    "species": "fallai",
    "taxonomy": {
        "Kingdom": "Animalia",
        "Phylum": "Chordata",
        "Class": "Teleostei",
        "Order": "Scombriformes",
        "Family": "Scombridae",
        "Genus": "Allothunnus",
        "ScientificName": "Allothunnus fallai"
    },
    "commonNames": {
        "en": ["Falla's tuna", "Slender tuna", "Tuna"],
        "pt": ["Atum elegante", "Atum-foguete"],
        "de": ["Schlankthun"],
        "fr": ["Thon élégant"],
        "es": ["Atún lanzón"],
        "ja": ["Hosokatsuo"],
        "ru": ["Тунец южный"],
        "pl": ["Tuńczyk smukły"],
        "af": ["Slank tuna", "Tuna"],
        "da": ["Slank tun"],
        "et": ["Lõunatuun"]
    },
    "images": [
        {
        "type": "adult",
        "actual": "http://www.fishbase.org/images/species/Alfal_u0.gif",
        "thumbnail": "http://www.fishbase.org/images/thumbnails/gif/tn_Alfal_u0.gif",
        "author": "FAO"
        },
        {
        "type": "adult",
        "actual": "http://www.fishbase.org/images/species/Gafal_u0.gif",
        "thumbnail": "http://www.fishbase.org/images/thumbnails/gif/tn_Gafal_u0.gif",
        "author": "Cada, L.A."
        },
        {
        "type": "larvae",
        "actual": "http://www.fishbase.org/images/species/Alfal_l0.gif",
        "thumbnail": "http://www.fishbase.org/images/thumbnails/gif/tn_Alfal_l0.gif",
        "author": "American Society of Ichthyologists and Herpetologists"
        },
        {
        "type": "larvae",
        "actual": "http://www.fishbase.org/images/species/Alfal_l1.gif",
        "thumbnail": "http://www.fishbase.org/images/thumbnails/gif/tn_Alfal_l1.gif",
        "author": "American Society of Ichthyologists and Herpetologists"
        }
    ],
    "generalDesc": "An occasionally schooling species which feeds mainly on krill (euphausiids), and also on squids and small fishes. Juveniles are found between 20 and 35°S at surface temperatures ranging from 19 to 24°C. Its flesh is paler than that of most true tunas and is very oily, but the cooked meat has fine eating qualities. Mainly marketed fresh.",
    "diagnosticDesc": "Interpelvic process small and bifid. Body naked ventrally behind the long anterior corselet. Dorsal half of body to lateral line covered with scales. Swim bladder absent. The back is bluish, turning to deep purple or almost black on the head; the belly is white, without stripes or spots; the pectoral and pelvic fins purple, their inner sides black.",
    "distribution": [
        "Southern Ocean: circumglobal",
        "One individual taken in Los Angeles Harbor"
    ],
    "habitat": [
        "Pelagic-oceanic",
        "Oceanodromous",
        "Marine",
        "Depth range 0 – 20 m"
    ],
    "migration": "Oceanodromous. Migrating within oceans typically between spawning and different feeding areas, as tunas do. Migrations should be cyclical and predictable and cover more than 100 km.",
    "morphology": {
        "Dorsal spines (total)": "15 – 18",
        "Dorsal soft rays (total)": "12 – 13",
        "Anal spines": "0",
        "Anal soft rays": "13 – 14",
        "Vertebrae": "40"
    },
    "size": {
        "Max. Length": "105 cm FL (male/unsexed)",
        "Max. Published Weight": "13.7 kg"
    },
    "trophicStrategy": "Juveniles are principally encountered between 20 and 35°S at surface temperatures ranging from 19 to 24°C. With increasing size they gradually move into higher latitudes where water temperatures are lower.",
    "uses": {
        "Fisheries": "Minor commercial",
        "Gamefish": "Yes",
        "Price category": "Very high",
        "Price reliability": "Very questionable"
    },
    "threats": "Least Concern (LC) — IUCN Grouper and Wrasse Specialist Group"

        }
    
    return data
}