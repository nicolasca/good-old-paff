// const Firestore = require("@google-cloud/firestore");

// const db = new Firestore({
//   projectId: "paff-v77",
//   keyFilename: "./src/account.config.json",
// });

// const batch = db.batch();

const factionsData = [
  {
    id: 0,
    name: "Paoli",
    slug: "paoli",
  },

  {
    id: 1,
    name: "Mors",
    slug: "mors",
  },
  {
    id: 2,
    name: "Elfes",
    slug: "elfes",
  },
  {
    id: 3,
    name: "Gaeli",
    slug: "gaeli",
  },
  {
    id: 4,
    name: "Orcs",
    slug: "orcs",
  },
  {
    id: 5,
    name: "Liches",
    slug: "liches",
  },
  {
    id: 6,
    name: "Priana",
    slug: "priana",
  },
];

const unitsData = [
  {
    name: "Gupaanh",
    slug: "gupaanh",
    faction_id: 0,
  },
  {
    name: "Navires du Vizir de Paoli",
    slug: "navires-du-vizir-de-paoli",
    faction_id: 0,
  },
  {
    name: "Garde Mauve",
    slug: "garde-mauve",
    faction_id: 0,
  },
  {
    name: "Éléphants sombres",
    slug: "elephants-sombres",
    faction_id: 0,
  },
  {
    name: "Volrenish",
    slug: "volrenish",
    faction_id: 0,
  },
  {
    name: "Cavalerie paolienne",
    slug: "cavalerie-paolienne",
    faction_id: 0,
  },
  {
    name: "Éléphants de tir paoliens",
    slug: "elephants-tir-paoliens",
    faction_id: 0,
  },
  {
    name: "Éléphants de combat paoliens",
    slug: "elephants-combat-paoliens",
    faction_id: 0,
  },
  {
    name: "Navires volnats paoliens",
    slug: "navires-volants-paoliens",
    faction_id: 0,
  },
  {
    name: "Archers paoliens",
    slug: "archers-paoliens",
    faction_id: 0,
  },
  {
    name: "Volsahan",
    slug: "volsahan",
    faction_id: 0,
  },
  {
    name: "Infanterie paolienne",
    slug: "infanterie-paolienne",
    faction_id: 0,
  },
  {
    name: "Banranesh",
    slug: "banranesh",
    faction_id: 0,
  },
  {
    name: "Cyprane noire",
    slug: "cyprane-noire",
    faction_id: 0,
  },
  {
    name: "Sacrifice pour la Paoli",
    slug: "sacrifice-paoli",
    faction_id: 0,
  },
  {
    name: "Débarquement expert",
    slug: "debarquement-expert",
    faction_id: 0,
  },
  {
    name: "Un paolien ne fuit pas !",
    slug: "paolien-fuit-pas",
    faction_id: 0,
  },
  {
    name: "Fureur des Banranesh",
    slug: "fureur-banranesh",
    faction_id: 0,
  },
  {
    name: "Pour la gloire de la Paoli !",
    slug: "gloire-paoli",
    faction_id: 0,
  },
  {
    name: "Agissements du Roi-Mors Lorwn",
    slug: "agissements-roi-mors-lorwn",
    faction_id: 1,
  },
  {
    name: "Ang senh",
    slug: "ang-senh",
    faction_id: 1,
  },
  {
    name: "Aspiration des âmes - Chevaliers Mors",
    slug: "aspiration-ames-chevaliers-mors",
    faction_id: 1,
  },
  {
    name: "Aspiration des âmes - Guerriers Mors",
    slug: "aspiration-ames-guerriers-mors",
    faction_id: 1,
  },
  {
    name: "Aspiration des âmes - Légion Noire",
    slug: "aspiration-ames-legion-noire",
    faction_id: 1,
  },
  {
    name: "Chevaliers Mors",
    slug: "chevaliers-mors",
    faction_id: 1,
  },
  {
    name: "Chevaucheurs d'Helnor",
    slug: "chevaucheurs-helnor",
    faction_id: 1,
  },
  {
    name: "Esclaves de la Citadelle de Senh",
    slug: "esclaves-citadelle-senh",
    faction_id: 1,
  },
  {
    name: "Esclaves des Mors",
    slug: "esclaves-mors",
    faction_id: 1,
  },
  {
    name: "Faiseurs de pluie de feu",
    slug: "faiseurs-pluie-feu",
    faction_id: 1,
  },
  {
    name: "Goll sham",
    slug: "goll-sham",
    faction_id: 1,
  },
  {
    name: "Guerriers Mors",
    slug: "guerriers-mors",
    faction_id: 1,
  },
  {
    name: "Horde de Lhienh",
    slug: "horde-lhienh",
    faction_id: 1,
  },
  {
    name: "Incantations démoniaques protectrices",
    slug: "incantations-demoniaques-protectrices",
    faction_id: 1,
  },
  {
    name: "Légion Noire",
    slug: "legion-noire",
    faction_id: 1,
  },
  {
    name: "Semeurs de terreur",
    slug: "semeurs-terreur",
    faction_id: 1,
  },
  {
    name: "Sharoks Mors",
    slug: "sharoks-mors",
    faction_id: 1,
  },
  {
    name: "Sorciers Mors",
    slug: "sorciers-mors",
    faction_id: 1,
  },
  {
    name: "Succubes Mors",
    slug: "succubes-mors",
    faction_id: 1,
  },
  {
    name: "Défense des Gardiens",
    slug: "defense-gardiens",
    faction_id: 2,
  },
  {
    name: "Portée par le vent",
    slug: "portee-par-vent",
    faction_id: 2,
  },
  {
    name: "Héritiers des Eldars",
    slug: "heritiers-eldars",
    faction_id: 2,
  },
  {
    name: "Maîtres de la Terre",
    slug: "maitres-terre",
    faction_id: 2,
  },
  {
    name: "Sable poison",
    slug: "sable-poison",
    faction_id: 2,
  },
  {
    name: "Maîtres du Feu",
    slug: "maitres-feu",
    faction_id: 2,
  },
  {
    name: "Souffle tueur",
    slug: "souffle-tueur",
    faction_id: 2,
  },
  {
    name: "Gardiens des Sources",
    slug: "gardiens-sources",
    faction_id: 2,
  },
  {
    name: "Maîtres du Vent",
    slug: "maitres-vent",
    faction_id: 2,
  },
  {
    name: "Le ciel s'obscurcit",
    slug: "ciel-obscurcit",
    faction_id: 2,
  },
  {
    name: "Pluie larmes",
    slug: "pluie-larmes",
    faction_id: 2,
  },
  {
    name: "Vent glacial",
    slug: "vent-glacial",
    faction_id: 2,
  },
  {
    name: "Essaim de Moundrel",
    slug: "essaim-moundrel",
    faction_id: 2,
  },
  {
    name: "Chevaucheurs de Dragons",
    slug: "chevaucheurs-dragons",
    faction_id: 2,
  },
  {
    name: "Maîtres des Éléments",
    slug: "maitres-elements",
    faction_id: 2,
  },
  {
    name: "Rois des Cieux",
    slug: "rois-cieux",
    faction_id: 2,
  },
  {
    name: "Régiment d'Eldarhun",
    slug: "regiment-eldarhun",
    faction_id: 2,
  },
  {
    name: "Au nom des Ancêtres",
    slug: "nom-ancetres",
    faction_id: 3,
  },
  {
    name: "Pour la Gaeli !",
    slug: "pour-gaeli",
    faction_id: 3,
  },
  {
    name: "Sorl Ensaeh",
    slug: "sorl-ensaeh",
    faction_id: 3,
  },
  {
    name: "Que vibre le coeur de la Gaeli !",
    slug: "vibre-coeur-gaeli",
    faction_id: 3,
  },
  {
    name: "Course héroique",
    slug: "course-heroique",
    faction_id: 3,
  },
  {
    name: "Communion avec les vents",
    slug: "communion-vents",
    faction_id: 3,
  },
  {
    name: "Sorl caleit",
    slug: "sorl-caleit",
    faction_id: 3,
  },
  {
    name: "Longues lames Gaeliennes",
    slug: "longues-lames-gaeliennes",
    faction_id: 3,
  },
  {
    name: "Combattants des Vlands",
    slug: "combattants-vlands",
    faction_id: 3,
  },
  {
    name: "Gardiens des Cen'",
    slug: "gardiens-cen",
    faction_id: 3,
  },
  {
    name: "Druides",
    slug: "druides",
    faction_id: 3,
  },
  {
    name: "Archers longs de Gaeli",
    slug: "archers-longs-gaeli",
    faction_id: 3,
  },
  {
    name: "Éclaireurs des Vlands",
    slug: "eclaireurs-vlands",
    faction_id: 3,
  },
  {
    name: "Berlloreks",
    slug: "berlloreks",
    faction_id: 3,
  },
  {
    name: "Sevlanders",
    slug: "sevlanders",
    faction_id: 3,
  },
  {
    name: "Seigneurs et Chefs de Gaeli",
    slug: "seigneurs-chefs-gaeli",
    faction_id: 3,
  },
  {
    name: "Shamans invokateurs Orcs",
    slug: "shamans-invokateurs-orcs",
    faction_id: 4,
  },
  {
    name: "Archers Orcs",
    slug: "archers-orcs",
    faction_id: 4,
  },
  {
    name: "Guerriers Orcs",
    slug: "guerriers-orcs",
    faction_id: 4,
  },
  {
    name: "Orcs Sombres",
    slug: "orcs-sombres",
    faction_id: 4,
  },
  {
    name: "Bande Orcs",
    slug: "bande-orcs",
    faction_id: 4,
  },
  {
    name: "Chevaucheurs de Skrans",
    slug: "chevaucheurs-skrans",
    faction_id: 4,
  },
  {
    name: "Katapul'ts Orcs",
    slug: "katapults-orcs",
    faction_id: 4,
  },
  {
    name: "Shamans Shawag Orcs",
    slug: "shamans-shawag-orcs",
    faction_id: 4,
  },
  {
    name: "Orcs noirs",
    slug: "orcs-noirs",
    faction_id: 4,
  },
  {
    name: "Boss Band",
    slug: "boss-band",
    faction_id: 4,
  },
  {
    name: "La Grossinvokation",
    slug: "la-grossinvokation",
    faction_id: 4,
  },
  {
    name: "Appel du combat !",
    slug: "appel-combat",
    faction_id: 4,
  },
  {
    name: "Vague verte",
    slug: "vague-verte",
    faction_id: 4,
  },
  {
    name: "Enragement des Skrans",
    slug: "enragement-skrans",
    faction_id: 4,
  },
  {
    name: "Rage verte !",
    slug: "rage-verte",
    faction_id: 4,
  },
  {
    name: "Soif de combat",
    slug: "soif-combat",
    faction_id: 4,
  },
  {
    name: "Concentration du Shawag",
    slug: "concentration-shawag",
    faction_id: 4,
  },
  {
    name: "Bouclier gobelin",
    slug: "bouclier-gobelin",
    faction_id: 4,
  },
  {
    name: "Guerriers squelettes",
    slug: "guerriers-squelettes",
    faction_id: 5,
  },
  {
    name: "Goules",
    slug: "goules",
    faction_id: 5,
  },
  {
    name: "Archers squelettes",
    slug: "archers-squelettes",
    faction_id: 5,
  },
  {
    name: "Liches invocatrices",
    slug: "liches-invocatrices",
    faction_id: 5,
  },
  {
    name: "Liches lanceuses de sorts",
    slug: "liches-lanceuses-sorts",
    faction_id: 5,
  },
  {
    name: "Cavalerie squelette",
    slug: "cavalerie-squelette",
    faction_id: 5,
  },
  {
    name: "Trébuchets squelettes",
    slug: "trebuchets-squelettes",
    faction_id: 5,
  },
  {
    name: "Gardiens des Nécropoles",
    slug: "gardiens-necropoles",
    faction_id: 5,
  },
  {
    name: "Seigneurs liches",
    slug: "seigneurs-liches",
    faction_id: 5,
  },
  {
    name: "Âmes captives",
    slug: "ames-captives",
    faction_id: 5,
  },
  {
    name: "Roi liche Yl-Elzir",
    slug: "roi-liche-yl-elzir",
    faction_id: 5,
  },
  {
    name: "Projectiles ençorcelés",
    slug: "projectiles-encorceles",
    faction_id: 5,
  },
  {
    name: "Ralliement aux morts",
    slug: "ralliement-morts",
    faction_id: 5,
  },
  {
    name: "Grande invocation",
    slug: "grande-invocation",
    faction_id: 5,
  },
  {
    name: "Garde des Seigneurs",
    slug: "garde-seigneurs",
    faction_id: 5,
  },
  {
    name: "Goulument",
    slug: "goulument",
    faction_id: 5,
  },
  {
    name: "Invocation des Gardiens",
    slug: "invocation-gardiens",
    faction_id: 5,
  },
  {
    name: "Templiers - Bénis des Dieux",
    slug: "templiers-benis-dieux",
    faction_id: 6,
  },
  {
    name: "Templiers - Protégés des Dieux",
    slug: "templiers-proteges-dieux",
    faction_id: 6,
  },
  {
    name: "Templiers - Soldats des Dieux",
    slug: "templiers-soldats-dieux",
    faction_id: 6,
  },
  {
    name: "Pour l'Empire !",
    slug: "pour-empire",
    faction_id: 6,
  },
  {
    name: "Don de soi !",
    slug: "don-soi",
    faction_id: 6,
  },
  {
    name: "Appel des Anges",
    slug: "appel-anges",
    faction_id: 6,
  },
  {
    name: "Chassez les hérétiques !",
    slug: "chassez-heretiques",
    faction_id: 6,
  },
  {
    name: "Maître de l'Empire",
    slug: "maitre-empire",
    faction_id: 6,
  },
  {
    name: "L'Empereur sait",
    slug: "empereur-sait",
    faction_id: 6,
  },
  {
    name: "Troupes impériales levées en masse",
    slug: "troupes-imperiales-levees-masse",
    faction_id: 6,
  },
  {
    name: "Templiers - Guerriers",
    slug: "templiers-guerriers",
    faction_id: 6,
  },
  {
    name: "Prêtres du culte de Zarn",
    slug: "pretres-culte-zarn",
    faction_id: 6,
  },
  {
    name: "Archers prianiens",
    slug: "archers-prianiens",
    faction_id: 6,
  },
  {
    name: "Templiers - Missionnaires",
    slug: "templiers-missionnaires",
    faction_id: 6,
  },
  {
    name: "Templiers - Cavalerie",
    slug: "templiers-cavalerie",
    faction_id: 6,
  },
  {
    name: "Anges inférieurs prianiens",
    slug: "anges-inferieurs-prianiens",
    faction_id: 6,
  },
  {
    name: "Balistes prianiennes",
    slug: "balistes-prianiennes",
    faction_id: 6,
  },
  {
    name: "Prêcheurs impériaux",
    slug: "precheurs-imperiaux",
    faction_id: 6,
  },
  {
    name: "Templiers - Paladins impériaux",
    slug: "templiers-paladins-imperiaux",
    faction_id: 6,
  },
  {
    name: "Anges majeurs prianiens",
    slug: "anges-majeurs-prianiens",
    faction_id: 6,
  },
  {
    name: "Chevaucheurs de Griffons de l'Empire",
    slug: "chevaucheurs-griffons-empire",
    faction_id: 6,
  },
  {
    name: "Pape du culte de Zarn",
    slug: "pape-culte-zarn",
    faction_id: 6,
  },
  {
    name: "Archanges prianiens",
    slug: "archanges-prianiens",
    faction_id: 6,
  },
];

// factionsData.forEach((faction) => {
//   const docRef = db.collection("factions").doc();
//   batch.set(docRef, faction);
// });

// unitsData.forEach((unit) => {
//   const docRef = db.collection("units").doc();
//   batch.set(docRef, unit);
// });

// batch.commit();
