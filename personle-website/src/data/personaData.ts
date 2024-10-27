import { PersonaData, Arcana, DamageType, FusionMethod, Stat } from "@lib/server/model";

export const personaData: Record<string, PersonaData> = {
	Abaddon: {
		name: "Abaddon",
		level: 75,
		arcana: Arcana.Judgement,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Bless],
		weaknesses: []
	},
	Agathion: {
		name: "Agathion",
		level: 3,
		arcana: Arcana.Chariot,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Gun, DamageType.Electric],
		weaknesses: [DamageType.Wind]
	},
	Alice: {
		name: "Alice",
		level: 83,
		arcana: Arcana.Death,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Psychokinesis, DamageType.Nuclear],
		weaknesses: [DamageType.Bless]
	},
	Alilat: {
		name: "Alilat",
		level: 81,
		arcana: Arcana.Empress,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [],
		weaknesses: [DamageType.Curse, DamageType.Fire]
	},
	"Ame-no-Uzume": {
		name: "Ame-no-Uzume",
		level: 13,
		arcana: Arcana.Lovers,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Psychokinesis]
	},
	Ananta: {
		name: "Ananta",
		level: 44,
		arcana: Arcana.Councillor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [],
		weaknesses: [DamageType.Electric]
	},
	Andras: {
		name: "Andras",
		level: 27,
		arcana: Arcana.Devil,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Psychokinesis, DamageType.Ice],
		weaknesses: [DamageType.Fire, DamageType.Bless]
	},
	Angel: {
		name: "Angel",
		level: 9,
		arcana: Arcana.Justice,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic, Stat.Agility],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Gun, DamageType.Curse]
	},
	Anubis: {
		name: "Anubis",
		level: 34,
		arcana: Arcana.Judgement,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Psychokinesis, DamageType.Gun],
		weaknesses: []
	},
	Anzu: {
		name: "Anzu",
		level: 25,
		arcana: Arcana.Hierophant,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Gun, DamageType.Nuclear]
	},
	Apsaras: {
		name: "Apsaras",
		level: 11,
		arcana: Arcana.Priestess,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Ice],
		weaknesses: [DamageType.Fire, DamageType.Electric]
	},
	"Ara Mitama": {
		name: "Ara Mitama",
		level: 30,
		arcana: Arcana.Chariot,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength, Stat.Endurance, Stat.Agility],
		resistances: [DamageType.Phys],
		weaknesses: [DamageType.Ice]
	},
	Arahabaki: {
		name: "Arahabaki",
		level: 35,
		arcana: Arcana.Hermit,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Bless, DamageType.Curse],
		weaknesses: [DamageType.Nuclear, DamageType.Psychokinesis]
	},
	Archangel: {
		name: "Archangel",
		level: 14,
		arcana: Arcana.Justice,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Electric, DamageType.Curse]
	},
	Ardha: {
		name: "Ardha",
		level: 84,
		arcana: Arcana.Temperance,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Phys],
		weaknesses: []
	},
	Arsene: {
		name: "Arsene",
		level: 1,
		arcana: Arcana.Fool,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Curse],
		weaknesses: [DamageType.Bless, DamageType.Ice]
	},
	Asura: {
		name: "Asura",
		level: 76,
		arcana: Arcana.Sun,
		fusionMethod: FusionMethod.Special,
		highestStats: [Stat.Strength],
		resistances: [],
		weaknesses: [DamageType.Psychokinesis]
	},
	Atavaka: {
		name: "Atavaka",
		level: 65,
		arcana: Arcana.Faith,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Curse, DamageType.Phys],
		weaknesses: []
	},
	Atropos: {
		name: "Atropos",
		level: 39,
		arcana: Arcana.Fortune,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Fire]
	},
	Attis: {
		name: "Attis",
		level: 82,
		arcana: Arcana.Hanged,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Curse]
	},
	Baal: {
		name: "Baal",
		level: 82,
		arcana: Arcana.Emperor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Bless, DamageType.Fire],
		weaknesses: []
	},
	Baphomet: {
		name: "Baphomet",
		level: 58,
		arcana: Arcana.Devil,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Fire],
		weaknesses: [DamageType.Bless]
	},
	Barong: {
		name: "Barong",
		level: 52,
		arcana: Arcana.Emperor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Electric, DamageType.Gun],
		weaknesses: [DamageType.Wind, DamageType.Curse]
	},
	Beelzebub: {
		name: "Beelzebub",
		level: 87,
		arcana: Arcana.Devil,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Bless]
	},
	Belial: {
		name: "Belial",
		level: 82,
		arcana: Arcana.Devil,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Ice],
		weaknesses: []
	},
	Belphegor: {
		name: "Belphegor",
		level: 37,
		arcana: Arcana.Tower,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Ice, DamageType.Nuclear, DamageType.Electric],
		weaknesses: [DamageType.Fire]
	},
	Berith: {
		name: "Berith",
		level: 9,
		arcana: Arcana.Hierophant,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Fire],
		weaknesses: [DamageType.Ice]
	},
	Bicorn: {
		name: "Bicorn",
		level: 4,
		arcana: Arcana.Hermit,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength, Stat.Agility],
		resistances: [DamageType.Curse],
		weaknesses: [DamageType.Electric]
	},
	Bishamonten: {
		name: "Bishamonten",
		level: 67,
		arcana: Arcana.Hierophant,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Bless, DamageType.Curse],
		weaknesses: [DamageType.Ice]
	},
	"Black Frost": {
		name: "Black Frost",
		level: 67,
		arcana: Arcana.Fool,
		fusionMethod: FusionMethod.Triad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: []
	},
	"Black Ooze": {
		name: "Black Ooze",
		level: 18,
		arcana: Arcana.Moon,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Ice, DamageType.Phys, DamageType.Gun],
		weaknesses: [DamageType.Psychokinesis, DamageType.Bless, DamageType.Electric]
	},
	"Black Rider": {
		name: "Black Rider",
		level: 59,
		arcana: Arcana.Tower,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic, Stat.Agility],
		resistances: [DamageType.Curse, DamageType.Bless],
		weaknesses: [DamageType.Fire]
	},
	Bugs: {
		name: "Bugs",
		level: 49,
		arcana: Arcana.Fool,
		fusionMethod: FusionMethod.Triad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Psychokinesis],
		weaknesses: [DamageType.Nuclear]
	},
	Byakhee: {
		name: "Byakhee",
		level: 70,
		arcana: Arcana.Moon,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Nuclear, DamageType.Ice]
	},
	Byakko: {
		name: "Byakko",
		level: 45,
		arcana: Arcana.Temperance,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Curse],
		weaknesses: [DamageType.Fire, DamageType.Nuclear]
	},
	"Cait Sith": {
		name: "Cait Sith",
		level: 5,
		arcana: Arcana.Magician,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Wind]
	},
	Cerberus: {
		name: "Cerberus",
		level: 55,
		arcana: Arcana.Chariot,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength, Stat.Agility],
		resistances: [DamageType.Nuclear],
		weaknesses: [DamageType.Ice]
	},
	Chernobog: {
		name: "Chernobog",
		level: 62,
		arcana: Arcana.Death,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Gun],
		weaknesses: [DamageType.Fire, DamageType.Bless]
	},
	"Chi You": {
		name: "Chi You",
		level: 88,
		arcana: Arcana.Chariot,
		fusionMethod: FusionMethod.Special,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Phys, DamageType.Gun],
		weaknesses: [DamageType.Nuclear]
	},
	Chimera: {
		name: "Chimera",
		level: 74,
		arcana: Arcana.Strength,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [],
		weaknesses: [DamageType.Wind, DamageType.Curse]
	},
	Choronzon: {
		name: "Choronzon",
		level: 28,
		arcana: Arcana.Magician,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic, Stat.Endurance, Stat.Luck],
		resistances: [DamageType.Phys],
		weaknesses: [DamageType.Bless]
	},
	Clotho: {
		name: "Clotho",
		level: 27,
		arcana: Arcana.Fortune,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Ice, DamageType.Nuclear]
	},
	"Crystal Skull": {
		name: "Crystal Skull",
		level: 50,
		arcana: Arcana.Fool,
		fusionMethod: FusionMethod.Unfusable,
		highestStats: [Stat.Strength, Stat.Magic, Stat.Endurance, Stat.Agility, Stat.Luck],
		resistances: [DamageType.Gun, DamageType.Phys],
		weaknesses: [DamageType.Wind]
	},
	"Cu Chulainn": {
		name: "Cu Chulainn",
		level: 76,
		arcana: Arcana.Faith,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Gun, DamageType.Phys],
		weaknesses: [DamageType.Electric]
	},
	Cybele: {
		name: "Cybele",
		level: 83,
		arcana: Arcana.Priestess,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Fire],
		weaknesses: [DamageType.Electric]
	},
	Daisoujou: {
		name: "Daisoujou",
		level: 40,
		arcana: Arcana.Hierophant,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Phys],
		weaknesses: [DamageType.Curse]
	},
	Dakini: {
		name: "Dakini",
		level: 50,
		arcana: Arcana.Empress,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength, Stat.Endurance],
		resistances: [DamageType.Fire],
		weaknesses: []
	},
	Decarabia: {
		name: "Decarabia",
		level: 32,
		arcana: Arcana.Councillor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Curse, DamageType.Nuclear],
		weaknesses: [DamageType.Phys]
	},
	Dionysus: {
		name: "Dionysus",
		level: 71,
		arcana: Arcana.Councillor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: []
	},
	Dominion: {
		name: "Dominion",
		level: 68,
		arcana: Arcana.Justice,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Curse],
		weaknesses: [DamageType.Electric]
	},
	Eligor: {
		name: "Eligor",
		level: 16,
		arcana: Arcana.Emperor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Fire, DamageType.Curse],
		weaknesses: [DamageType.Electric]
	},
	"Emperor's Amulet": {
		name: "Emperor's Amulet",
		level: 35,
		arcana: Arcana.Hanged,
		fusionMethod: FusionMethod.Unfusable,
		highestStats: [Stat.Strength, Stat.Magic, Stat.Endurance, Stat.Agility, Stat.Luck],
		resistances: [DamageType.Phys, DamageType.Gun],
		weaknesses: [DamageType.Electric]
	},
	Fafnir: {
		name: "Fafnir",
		level: 86,
		arcana: Arcana.Hermit,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Electric],
		weaknesses: []
	},
	Flauros: {
		name: "Flauros",
		level: 19,
		arcana: Arcana.Devil,
		fusionMethod: FusionMethod.Triad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Nuclear, DamageType.Wind],
		weaknesses: [DamageType.Ice]
	},
	Forneus: {
		name: "Forneus",
		level: 63,
		arcana: Arcana.Magician,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Electric]
	},
	Fortuna: {
		name: "Fortuna",
		level: 46,
		arcana: Arcana.Fortune,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Electric]
	},
	Futsunushi: {
		name: "Futsunushi",
		level: 86,
		arcana: Arcana.Magician,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Phys],
		weaknesses: [DamageType.Nuclear]
	},
	"Fuu-Ki": {
		name: "Fuu-Ki",
		level: 23,
		arcana: Arcana.Star,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Gun],
		weaknesses: [DamageType.Electric]
	},
	Gabriel: {
		name: "Gabriel",
		level: 77,
		arcana: Arcana.Temperance,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: []
	},
	Ganesha: {
		name: "Ganesha",
		level: 53,
		arcana: Arcana.Sun,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Gun, DamageType.Phys],
		weaknesses: [DamageType.Psychokinesis]
	},
	Garuda: {
		name: "Garuda",
		level: 52,
		arcana: Arcana.Star,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Wind],
		weaknesses: []
	},
	Genbu: {
		name: "Genbu",
		level: 7,
		arcana: Arcana.Temperance,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Psychokinesis],
		weaknesses: [DamageType.Electric]
	},
	Girimehkala: {
		name: "Girimehkala",
		level: 43,
		arcana: Arcana.Moon,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength, Stat.Endurance],
		resistances: [DamageType.Fire],
		weaknesses: [DamageType.Bless]
	},
	Hanuman: {
		name: "Hanuman",
		level: 64,
		arcana: Arcana.Strength,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Gun, DamageType.Bless, DamageType.Psychokinesis],
		weaknesses: [DamageType.Ice]
	},
	Hariti: {
		name: "Hariti",
		level: 40,
		arcana: Arcana.Empress,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Bless, DamageType.Psychokinesis],
		weaknesses: [DamageType.Wind]
	},
	Hastur: {
		name: "Hastur",
		level: 84,
		arcana: Arcana.Star,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Fire],
		weaknesses: []
	},
	Hecatoncheires: {
		name: "Hecatoncheires",
		level: 42,
		arcana: Arcana.Hanged,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Gun],
		weaknesses: [DamageType.Bless]
	},
	"Hell Biker": {
		name: "Hell Biker",
		level: 37,
		arcana: Arcana.Death,
		fusionMethod: FusionMethod.Triad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Wind],
		weaknesses: [DamageType.Bless]
	},
	"High Pixie": {
		name: "High Pixie",
		level: 16,
		arcana: Arcana.Fool,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Electric, DamageType.Wind],
		weaknesses: [DamageType.Gun, DamageType.Nuclear]
	},
	"Hope Diamond": {
		name: "Hope Diamond",
		level: 40,
		arcana: Arcana.Death,
		fusionMethod: FusionMethod.Unfusable,
		highestStats: [Stat.Strength, Stat.Magic, Stat.Endurance, Stat.Agility, Stat.Luck],
		resistances: [DamageType.Phys, DamageType.Gun],
		weaknesses: [DamageType.Ice]
	},
	Horus: {
		name: "Horus",
		level: 47,
		arcana: Arcana.Sun,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Fire]
	},
	"Hua Po": {
		name: "Hua Po",
		level: 9,
		arcana: Arcana.Hanged,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Ice, DamageType.Gun]
	},
	Incubus: {
		name: "Incubus",
		level: 5,
		arcana: Arcana.Devil,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Bless, DamageType.Fire]
	},
	Inugami: {
		name: "Inugami",
		level: 14,
		arcana: Arcana.Hanged,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Wind]
	},
	"Ippon-Datara": {
		name: "Ippon-Datara",
		level: 13,
		arcana: Arcana.Hermit,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Gun, DamageType.Curse, DamageType.Fire, DamageType.Bless],
		weaknesses: [DamageType.Ice]
	},
	Ishtar: {
		name: "Ishtar",
		level: 85,
		arcana: Arcana.Lovers,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Wind]
	},
	Isis: {
		name: "Isis",
		level: 26,
		arcana: Arcana.Priestess,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Psychokinesis]
	},
	"Jack Frost": {
		name: "Jack Frost",
		level: 11,
		arcana: Arcana.Magician,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic, Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Fire]
	},
	"Jack-o'-Lantern": {
		name: "Jack-o'-Lantern",
		level: 2,
		arcana: Arcana.Magician,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic, Stat.Endurance, Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Ice, DamageType.Wind]
	},
	Jatayu: {
		name: "Jatayu",
		level: 51,
		arcana: Arcana.Hanged,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Bless, DamageType.Ice],
		weaknesses: [DamageType.Nuclear]
	},
	Jikokuten: {
		name: "Jikokuten",
		level: 22,
		arcana: Arcana.Temperance,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Phys, DamageType.Bless],
		weaknesses: [DamageType.Curse]
	},
	Kaiwan: {
		name: "Kaiwan",
		level: 36,
		arcana: Arcana.Star,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Nuclear]
	},
	Kali: {
		name: "Kali",
		level: 63,
		arcana: Arcana.Empress,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Curse],
		weaknesses: []
	},
	Kelpie: {
		name: "Kelpie",
		level: 6,
		arcana: Arcana.Strength,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Ice],
		weaknesses: [DamageType.Electric]
	},
	"Kikuri-Hime": {
		name: "Kikuri-Hime",
		level: 40,
		arcana: Arcana.Priestess,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Bless],
		weaknesses: [DamageType.Fire]
	},
	"Kin-Ki": {
		name: "Kin-Ki",
		level: 25,
		arcana: Arcana.Chariot,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength, Stat.Endurance],
		resistances: [DamageType.Phys],
		weaknesses: []
	},
	"King Frost": {
		name: "King Frost",
		level: 61,
		arcana: Arcana.Emperor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: []
	},
	Kodama: {
		name: "Kodama",
		level: 11,
		arcana: Arcana.Star,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Ice],
		weaknesses: [DamageType.Fire]
	},
	"Koh-i-Noor": {
		name: "Koh-i-Noor",
		level: 25,
		arcana: Arcana.Priestess,
		fusionMethod: FusionMethod.Unfusable,
		highestStats: [Stat.Strength, Stat.Magic, Stat.Endurance, Stat.Agility, Stat.Luck],
		resistances: [DamageType.Phys],
		weaknesses: [DamageType.Gun]
	},
	Kohryu: {
		name: "Kohryu",
		level: 76,
		arcana: Arcana.Hierophant,
		fusionMethod: FusionMethod.Special,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Nuclear]
	},
	"Koppa Tengu": {
		name: "Koppa Tengu",
		level: 11,
		arcana: Arcana.Temperance,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Wind],
		weaknesses: [DamageType.Bless, DamageType.Ice]
	},
	Koropokkuru: {
		name: "Koropokkuru",
		level: 9,
		arcana: Arcana.Hermit,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Wind, DamageType.Ice],
		weaknesses: [DamageType.Fire]
	},
	Koumokuten: {
		name: "Koumokuten",
		level: 49,
		arcana: Arcana.Hermit,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Phys, DamageType.Bless],
		weaknesses: [DamageType.Ice]
	},
	Kumbhanda: {
		name: "Kumbhanda",
		level: 42,
		arcana: Arcana.Hermit,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Curse],
		weaknesses: [DamageType.Psychokinesis]
	},
	"Kurama Tengu": {
		name: "Kurama Tengu",
		level: 31,
		arcana: Arcana.Hermit,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Curse, DamageType.Bless],
		weaknesses: []
	},
	Kushinada: {
		name: "Kushinada",
		level: 42,
		arcana: Arcana.Lovers,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Ice, DamageType.Nuclear]
	},
	"Kusi Mitama": {
		name: "Kusi Mitama",
		level: 12,
		arcana: Arcana.Councillor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Wind],
		weaknesses: [DamageType.Fire]
	},
	Lachesis: {
		name: "Lachesis",
		level: 35,
		arcana: Arcana.Fortune,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Wind],
		weaknesses: [DamageType.Electric]
	},
	Lakshmi: {
		name: "Lakshmi",
		level: 69,
		arcana: Arcana.Fortune,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Ice, DamageType.Bless],
		weaknesses: [DamageType.Fire]
	},
	Lamia: {
		name: "Lamia",
		level: 26,
		arcana: Arcana.Empress,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Ice, DamageType.Nuclear]
	},
	"Leanan Sidhe": {
		name: "Leanan Sidhe",
		level: 19,
		arcana: Arcana.Lovers,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Wind, DamageType.Psychokinesis],
		weaknesses: [DamageType.Fire]
	},
	Legion: {
		name: "Legion",
		level: 38,
		arcana: Arcana.Fool,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Psychokinesis, DamageType.Fire, DamageType.Phys],
		weaknesses: [DamageType.Bless]
	},
	Lilim: {
		name: "Lilim",
		level: 32,
		arcana: Arcana.Devil,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Ice],
		weaknesses: [DamageType.Wind, DamageType.Bless]
	},
	Lilith: {
		name: "Lilith",
		level: 60,
		arcana: Arcana.Moon,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Fire]
	},
	Loa: {
		name: "Loa",
		level: 70,
		arcana: Arcana.Hermit,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Fire, DamageType.Nuclear],
		weaknesses: [DamageType.Psychokinesis, DamageType.Bless]
	},
	Lucifer: {
		name: "Lucifer",
		level: 93,
		arcana: Arcana.Star,
		fusionMethod: FusionMethod.Special,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Wind, DamageType.Fire, DamageType.Ice, DamageType.Electric],
		weaknesses: [DamageType.Bless]
	},
	Macabre: {
		name: "Macabre",
		level: 73,
		arcana: Arcana.Hanged,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Bless]
	},
	Mada: {
		name: "Mada",
		level: 90,
		arcana: Arcana.Tower,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Psychokinesis],
		weaknesses: [DamageType.Ice]
	},
	Makami: {
		name: "Makami",
		level: 15,
		arcana: Arcana.Temperance,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Nuclear, DamageType.Wind],
		weaknesses: [DamageType.Electric]
	},
	Mandrake: {
		name: "Mandrake",
		level: 3,
		arcana: Arcana.Death,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility, Stat.Luck],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Fire]
	},
	Mara: {
		name: "Mara",
		level: 73,
		arcana: Arcana.Tower,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Bless],
		weaknesses: []
	},
	Maria: {
		name: "Maria",
		level: 93,
		arcana: Arcana.Faith,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Fire]
	},
	Matador: {
		name: "Matador",
		level: 17,
		arcana: Arcana.Death,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Electric]
	},
	Melchizedek: {
		name: "Melchizedek",
		level: 58,
		arcana: Arcana.Justice,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Psychokinesis],
		weaknesses: [DamageType.Wind]
	},
	Metatron: {
		name: "Metatron",
		level: 89,
		arcana: Arcana.Justice,
		fusionMethod: FusionMethod.Special,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Electric, DamageType.Curse]
	},
	Michael: {
		name: "Michael",
		level: 87,
		arcana: Arcana.Judgement,
		fusionMethod: FusionMethod.Triad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Gun],
		weaknesses: []
	},
	Mishaguji: {
		name: "Mishaguji",
		level: 52,
		arcana: Arcana.Hierophant,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Luck],
		resistances: [DamageType.Phys],
		weaknesses: [DamageType.Ice]
	},
	Mithra: {
		name: "Mithra",
		level: 33,
		arcana: Arcana.Temperance,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Electric]
	},
	Mithras: {
		name: "Mithras",
		level: 39,
		arcana: Arcana.Sun,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength, Stat.Endurance],
		resistances: [DamageType.Phys, DamageType.Gun],
		weaknesses: [DamageType.Psychokinesis]
	},
	Mokoi: {
		name: "Mokoi",
		level: 9,
		arcana: Arcana.Death,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Wind]
	},
	Moloch: {
		name: "Moloch",
		level: 60,
		arcana: Arcana.Hanged,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Electric, DamageType.Wind],
		weaknesses: [DamageType.Ice]
	},
	Mot: {
		name: "Mot",
		level: 72,
		arcana: Arcana.Death,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Gun],
		weaknesses: [DamageType.Wind]
	},
	"Mother Harlot": {
		name: "Mother Harlot",
		level: 85,
		arcana: Arcana.Empress,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength, Stat.Luck],
		resistances: [],
		weaknesses: [DamageType.Bless]
	},
	Mothman: {
		name: "Mothman",
		level: 33,
		arcana: Arcana.Moon,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic, Stat.Agility],
		resistances: [DamageType.Psychokinesis],
		weaknesses: [DamageType.Gun]
	},
	Naga: {
		name: "Naga",
		level: 24,
		arcana: Arcana.Hermit,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic, Stat.Agility],
		resistances: [DamageType.Gun],
		weaknesses: [DamageType.Wind]
	},
	Narcissus: {
		name: "Narcissus",
		level: 48,
		arcana: Arcana.Lovers,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Wind, DamageType.Bless],
		weaknesses: [DamageType.Fire]
	},
	Nebiros: {
		name: "Nebiros",
		level: 74,
		arcana: Arcana.Devil,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Curse],
		weaknesses: [DamageType.Bless]
	},
	"Neko Shogun": {
		name: "Neko Shogun",
		level: 30,
		arcana: Arcana.Star,
		fusionMethod: FusionMethod.Triad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Phys, DamageType.Curse, DamageType.Electric],
		weaknesses: [DamageType.Wind]
	},
	Nekomata: {
		name: "Nekomata",
		level: 17,
		arcana: Arcana.Magician,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Psychokinesis],
		weaknesses: [DamageType.Electric]
	},
	"Nigi Mitama": {
		name: "Nigi Mitama",
		level: 22,
		arcana: Arcana.Councillor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Curse, DamageType.Bless],
		weaknesses: [DamageType.Electric]
	},
	Norn: {
		name: "Norn",
		level: 52,
		arcana: Arcana.Fortune,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Bless],
		weaknesses: []
	},
	Nue: {
		name: "Nue",
		level: 20,
		arcana: Arcana.Death,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Ice],
		weaknesses: [DamageType.Fire]
	},
	Obariyon: {
		name: "Obariyon",
		level: 8,
		arcana: Arcana.Fool,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Phys],
		weaknesses: [DamageType.Electric]
	},
	Oberon: {
		name: "Oberon",
		level: 66,
		arcana: Arcana.Emperor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Nuclear]
	},
	Odin: {
		name: "Odin",
		level: 84,
		arcana: Arcana.Emperor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: []
	},
	Okuninushi: {
		name: "Okuninushi",
		level: 54,
		arcana: Arcana.Faith,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [],
		weaknesses: [DamageType.Nuclear, DamageType.Wind]
	},
	"Ongyo-Ki": {
		name: "Ongyo-Ki",
		level: 89,
		arcana: Arcana.Hermit,
		fusionMethod: FusionMethod.Triad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Phys],
		weaknesses: []
	},
	Oni: {
		name: "Oni",
		level: 20,
		arcana: Arcana.Strength,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Gun, DamageType.Phys],
		weaknesses: []
	},
	Onmoraki: {
		name: "Onmoraki",
		level: 12,
		arcana: Arcana.Moon,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Fire],
		weaknesses: [DamageType.Ice, DamageType.Bless]
	},
	Orichalcum: {
		name: "Orichalcum",
		level: 60,
		arcana: Arcana.Faith,
		fusionMethod: FusionMethod.Unfusable,
		highestStats: [Stat.Strength, Stat.Magic, Stat.Endurance, Stat.Agility, Stat.Luck],
		resistances: [DamageType.Gun, DamageType.Phys],
		weaknesses: [DamageType.Bless]
	},
	Orlov: {
		name: "Orlov",
		level: 30,
		arcana: Arcana.Strength,
		fusionMethod: FusionMethod.Unfusable,
		highestStats: [Stat.Strength, Stat.Magic, Stat.Endurance, Stat.Agility, Stat.Luck],
		resistances: [DamageType.Phys, DamageType.Gun],
		weaknesses: [DamageType.Curse]
	},
	Orobas: {
		name: "Orobas",
		level: 17,
		arcana: Arcana.Hierophant,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Wind, DamageType.Curse],
		weaknesses: [DamageType.Ice]
	},
	Orthrus: {
		name: "Orthrus",
		level: 21,
		arcana: Arcana.Hanged,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Nuclear],
		weaknesses: [DamageType.Ice]
	},
	Ose: {
		name: "Ose",
		level: 42,
		arcana: Arcana.Fool,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Fire],
		weaknesses: [DamageType.Bless]
	},
	"Pale Rider": {
		name: "Pale Rider",
		level: 54,
		arcana: Arcana.Death,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Wind],
		weaknesses: [DamageType.Bless]
	},
	Parvati: {
		name: "Parvati",
		level: 56,
		arcana: Arcana.Lovers,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic, Stat.Agility],
		resistances: [DamageType.Bless, DamageType.Psychokinesis],
		weaknesses: [DamageType.Curse]
	},
	Pazuzu: {
		name: "Pazuzu",
		level: 45,
		arcana: Arcana.Devil,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Wind],
		weaknesses: [DamageType.Bless]
	},
	Phoenix: {
		name: "Phoenix",
		level: 21,
		arcana: Arcana.Faith,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Ice],
		weaknesses: [DamageType.Electric]
	},
	Pisaca: {
		name: "Pisaca",
		level: 28,
		arcana: Arcana.Death,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic, Stat.Endurance],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Bless, DamageType.Fire]
	},
	Pixie: {
		name: "Pixie",
		level: 2,
		arcana: Arcana.Lovers,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Electric, DamageType.Bless],
		weaknesses: [DamageType.Ice, DamageType.Curse, DamageType.Gun]
	},
	Power: {
		name: "Power",
		level: 41,
		arcana: Arcana.Justice,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Wind],
		weaknesses: [DamageType.Curse]
	},
	Principality: {
		name: "Principality",
		level: 29,
		arcana: Arcana.Justice,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Fire],
		weaknesses: [DamageType.Curse]
	},
	"Queen Mab": {
		name: "Queen Mab",
		level: 43,
		arcana: Arcana.Magician,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Wind]
	},
	"Queen's Necklace": {
		name: "Queen's Necklace",
		level: 15,
		arcana: Arcana.Empress,
		fusionMethod: FusionMethod.Unfusable,
		highestStats: [Stat.Strength, Stat.Magic, Stat.Endurance, Stat.Agility, Stat.Luck],
		resistances: [DamageType.Phys, DamageType.Gun],
		weaknesses: [DamageType.Psychokinesis]
	},
	Quetzalcoatl: {
		name: "Quetzalcoatl",
		level: 66,
		arcana: Arcana.Sun,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Wind],
		weaknesses: [DamageType.Psychokinesis]
	},
	"Raja Naga": {
		name: "Raja Naga",
		level: 55,
		arcana: Arcana.Temperance,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: []
	},
	Rakshasa: {
		name: "Rakshasa",
		level: 24,
		arcana: Arcana.Strength,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Curse, DamageType.Phys, DamageType.Fire],
		weaknesses: [DamageType.Wind, DamageType.Bless]
	},
	Rangda: {
		name: "Rangda",
		level: 48,
		arcana: Arcana.Magician,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Bless, DamageType.Electric]
	},
	Raphael: {
		name: "Raphael",
		level: 78,
		arcana: Arcana.Lovers,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [],
		weaknesses: []
	},
	"Red Rider": {
		name: "Red Rider",
		level: 41,
		arcana: Arcana.Tower,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Bless]
	},
	Regent: {
		name: "Regent",
		level: 10,
		arcana: Arcana.Emperor,
		fusionMethod: FusionMethod.Unfusable,
		highestStats: [Stat.Strength, Stat.Magic, Stat.Endurance, Stat.Agility, Stat.Luck],
		resistances: [DamageType.Gun, DamageType.Phys],
		weaknesses: [DamageType.Nuclear]
	},
	"Saki Mitama": {
		name: "Saki Mitama",
		level: 6,
		arcana: Arcana.Lovers,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic, Stat.Agility],
		resistances: [DamageType.Ice],
		weaknesses: [DamageType.Wind]
	},
	Sandalphon: {
		name: "Sandalphon",
		level: 75,
		arcana: Arcana.Moon,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Phys, DamageType.Gun],
		weaknesses: []
	},
	Sandman: {
		name: "Sandman",
		level: 23,
		arcana: Arcana.Magician,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Luck],
		resistances: [DamageType.Wind],
		weaknesses: [DamageType.Electric, DamageType.Fire]
	},
	Sarasvati: {
		name: "Sarasvati",
		level: 50,
		arcana: Arcana.Priestess,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Nuclear]
	},
	Satan: {
		name: "Satan",
		level: 92,
		arcana: Arcana.Judgement,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Gun],
		weaknesses: []
	},
	Satanael: {
		name: "Satanael",
		level: 95,
		arcana: Arcana.Fool,
		fusionMethod: FusionMethod.Special,
		highestStats: [Stat.Strength],
		resistances: [
			DamageType.Psychokinesis,
			DamageType.Phys,
			DamageType.Fire,
			DamageType.Ice,
			DamageType.Electric,
			DamageType.Gun,
			DamageType.Wind,
			DamageType.Nuclear
		],
		weaknesses: []
	},
	Scathach: {
		name: "Scathach",
		level: 77,
		arcana: Arcana.Priestess,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: []
	},
	Seiryu: {
		name: "Seiryu",
		level: 62,
		arcana: Arcana.Councillor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Ice],
		weaknesses: [DamageType.Nuclear]
	},
	Setanta: {
		name: "Setanta",
		level: 25,
		arcana: Arcana.Emperor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Gun, DamageType.Nuclear],
		weaknesses: [DamageType.Psychokinesis]
	},
	Seth: {
		name: "Seth",
		level: 51,
		arcana: Arcana.Tower,
		fusionMethod: FusionMethod.Special,
		highestStats: [Stat.Magic, Stat.Agility],
		resistances: [DamageType.Curse],
		weaknesses: [DamageType.Bless]
	},
	Shiisaa: {
		name: "Shiisaa",
		level: 15,
		arcana: Arcana.Strength,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic, Stat.Endurance, Stat.Agility],
		resistances: [DamageType.Phys],
		weaknesses: [DamageType.Curse, DamageType.Psychokinesis]
	},
	"Shiki-Ouji": {
		name: "Shiki-Ouji",
		level: 18,
		arcana: Arcana.Chariot,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [],
		weaknesses: [DamageType.Nuclear]
	},
	Shiva: {
		name: "Shiva",
		level: 82,
		arcana: Arcana.Judgement,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [],
		weaknesses: [DamageType.Nuclear]
	},
	Siegfried: {
		name: "Siegfried",
		level: 84,
		arcana: Arcana.Faith,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Gun, DamageType.Ice],
		weaknesses: [DamageType.Nuclear]
	},
	Silky: {
		name: "Silky",
		level: 6,
		arcana: Arcana.Priestess,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Ice],
		weaknesses: [DamageType.Fire, DamageType.Electric]
	},
	Skadi: {
		name: "Skadi",
		level: 53,
		arcana: Arcana.Priestess,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: []
	},
	Slime: {
		name: "Slime",
		level: 10,
		arcana: Arcana.Chariot,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Gun, DamageType.Phys],
		weaknesses: [DamageType.Fire, DamageType.Wind]
	},
	Sraosha: {
		name: "Sraosha",
		level: 80,
		arcana: Arcana.Star,
		fusionMethod: FusionMethod.Special,
		highestStats: [Stat.Magic, Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Curse]
	},
	"Stone of Scone": {
		name: "Stone of Scone",
		level: 20,
		arcana: Arcana.Fortune,
		fusionMethod: FusionMethod.Unfusable,
		highestStats: [Stat.Strength, Stat.Magic, Stat.Endurance, Stat.Agility, Stat.Luck],
		resistances: [DamageType.Phys, DamageType.Gun],
		weaknesses: [DamageType.Fire]
	},
	Succubus: {
		name: "Succubus",
		level: 7,
		arcana: Arcana.Moon,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Fire],
		weaknesses: [DamageType.Wind, DamageType.Bless]
	},
	Sudama: {
		name: "Sudama",
		level: 17,
		arcana: Arcana.Hermit,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Nuclear, DamageType.Ice]
	},
	"Sui-Ki": {
		name: "Sui-Ki",
		level: 24,
		arcana: Arcana.Moon,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Electric, DamageType.Gun],
		weaknesses: [DamageType.Nuclear]
	},
	Surt: {
		name: "Surt",
		level: 83,
		arcana: Arcana.Magician,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Nuclear, DamageType.Gun],
		weaknesses: [DamageType.Ice]
	},
	Suzaku: {
		name: "Suzaku",
		level: 16,
		arcana: Arcana.Sun,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Nuclear],
		weaknesses: [DamageType.Ice]
	},
	"Take-Minakata": {
		name: "Take-Minakata",
		level: 26,
		arcana: Arcana.Hanged,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Electric, DamageType.Curse],
		weaknesses: [DamageType.Psychokinesis]
	},
	"Tam Lin": {
		name: "Tam Lin",
		level: 27,
		arcana: Arcana.Faith,
		fusionMethod: FusionMethod.Triad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Wind, DamageType.Phys],
		weaknesses: [DamageType.Curse]
	},
	Thor: {
		name: "Thor",
		level: 64,
		arcana: Arcana.Chariot,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Bless, DamageType.Curse, DamageType.Phys],
		weaknesses: []
	},
	Thoth: {
		name: "Thoth",
		level: 36,
		arcana: Arcana.Emperor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Curse],
		weaknesses: [DamageType.Psychokinesis]
	},
	Throne: {
		name: "Throne",
		level: 72,
		arcana: Arcana.Justice,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Nuclear]
	},
	Thunderbird: {
		name: "Thunderbird",
		level: 34,
		arcana: Arcana.Sun,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Psychokinesis, DamageType.Curse]
	},
	Titania: {
		name: "Titania",
		level: 56,
		arcana: Arcana.Empress,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Bless, DamageType.Curse, DamageType.Nuclear],
		weaknesses: [DamageType.Psychokinesis]
	},
	Trumpeter: {
		name: "Trumpeter",
		level: 59,
		arcana: Arcana.Judgement,
		fusionMethod: FusionMethod.Special,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: []
	},
	Unicorn: {
		name: "Unicorn",
		level: 39,
		arcana: Arcana.Faith,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Psychokinesis],
		weaknesses: [DamageType.Curse]
	},
	Uriel: {
		name: "Uriel",
		level: 81,
		arcana: Arcana.Justice,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: []
	},
	Valkyrie: {
		name: "Valkyrie",
		level: 44,
		arcana: Arcana.Strength,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Gun],
		weaknesses: [DamageType.Fire]
	},
	Vasuki: {
		name: "Vasuki",
		level: 68,
		arcana: Arcana.Star,
		fusionMethod: FusionMethod.Triad,
		highestStats: [Stat.Magic],
		resistances: [],
		weaknesses: [DamageType.Curse]
	},
	Vishnu: {
		name: "Vishnu",
		level: 83,
		arcana: Arcana.Fool,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Fire]
	},
	"Vohu Manah": {
		name: "Vohu Manah",
		level: 80,
		arcana: Arcana.Councillor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Electric],
		weaknesses: [DamageType.Wind]
	},
	"White Rider": {
		name: "White Rider",
		level: 38,
		arcana: Arcana.Chariot,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [],
		weaknesses: [DamageType.Ice]
	},
	Yaksini: {
		name: "Yaksini",
		level: 20,
		arcana: Arcana.Empress,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Agility],
		resistances: [DamageType.Ice],
		weaknesses: [DamageType.Nuclear]
	},
	"Yamata-no-Orochi": {
		name: "Yamata-no-Orochi",
		level: 64,
		arcana: Arcana.Judgement,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Wind, DamageType.Curse, DamageType.Phys],
		weaknesses: []
	},
	Yatagarasu: {
		name: "Yatagarasu",
		level: 57,
		arcana: Arcana.Councillor,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Magic],
		resistances: [DamageType.Wind],
		weaknesses: [DamageType.Curse]
	},
	Yoshitsune: {
		name: "Yoshitsune",
		level: 87,
		arcana: Arcana.Tower,
		fusionMethod: FusionMethod.Special,
		highestStats: [Stat.Strength],
		resistances: [DamageType.Fire],
		weaknesses: []
	},
	Yurlungur: {
		name: "Yurlungur",
		level: 43,
		arcana: Arcana.Sun,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Bless],
		weaknesses: [DamageType.Psychokinesis]
	},
	"Zaou-Gongen": {
		name: "Zaou-Gongen",
		level: 80,
		arcana: Arcana.Strength,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Strength],
		resistances: [],
		weaknesses: [DamageType.Electric]
	},
	Zouchouten: {
		name: "Zouchouten",
		level: 31,
		arcana: Arcana.Strength,
		fusionMethod: FusionMethod.Dyad,
		highestStats: [Stat.Endurance],
		resistances: [DamageType.Phys],
		weaknesses: [DamageType.Wind]
	}
};
