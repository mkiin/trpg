import { atomWithStorage } from "jotai/utils";
import {
	CharacterAbilities,
	CharacterBasicInfoForm,
	CharacterSkills,
} from "../types/character-sheet-types";

// î{îńđüÍatom
export const basicInfoAtom = atomWithStorage<CharacterBasicInfoForm>(
	"character-basic-info",
	{} as CharacterBasicInfoForm,
);

export const abilitiesAtom = atomWithStorage<CharacterAbilities>(
	"character-ability",
	{} as CharacterAbilities,
);

export const skillsAtom = atomWithStorage<CharacterSkills>("character-skill", {
	combat: {
		dodge: 0,
		kick: 25,
		grapple: 25,
		punch: 50,
		headbutt: 10,
		throw: 25,
		martialArts: 1,
		handgun: 20,
		submachineGun: 15,
		shotgun: 30,
		machineGun: 15,
		rifle: 25,
	},
	investigation: {
		firstAid: 30,
		locksmith: 1,
		hide: 15,
		conceal: 10,
		listen: 25,
		sneak: 10,
		photography: 10,
		psychoanalysis: 1,
		track: 10,
		climb: 40,
		library: 25,
		spot: 25,
	},
	action: {
		drive: {
			label: "",
			value: 20,
		},
		mechanicalRepair: 20,
		operateHeavyMachinery: 1,
		ride: 5,
		swim: 25,
		craft: {
			label: "",
			value: 5,
		},
		pilot: {
			label: "",
			value: 1,
		},
		jump: 25,
		electricalRepair: 10,
		navigate: 10,
		disguise: 1,
	},
	negotiation: {
		fastTalk: 5,
		credit: 15,
		persuade: 15,
		bargain: 5,
		nativeLanguage: 0,
		otherLanguage: {
			label: "",
			value: 1,
		},
	},
	knowledge: {
		medicine: 5,
		occult: 5,
		chemistry: 1,
		cthulhuMythos: 0,
		art: {
			label: "",
			value: 5,
		},
		accounting: 10,
		archaeology: 1,
		computer: 1,
		psychology: 5,
		anthropology: 1,
		biology: 1,
		geology: 1,
		electronics: 1,
		astronomy: 1,
		naturalHistory: 10,
		physics: 1,
		law: 5,
		pharmacy: 1,
		history: 20,
	},
});
