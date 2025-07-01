import type { PageServerData } from './$types';

export interface TimelineItem {
	year: string;
	title: string;
	description: string;
	image?: string;
	details?: string;
	quote?: string;
	link?: string;
	linkText?: string;
	currentStats?: string[];
	expanded: boolean;
}

export interface PrincipleCard {
	icon: string;
	title: string;
	text: string;
	link: string;
}

export interface BewegungStats {
	practitioners: number;
	centers: number;
	yearsSince: number;
	dailyMeals: number;
}

export interface BewegungPage {
	title: string;
	subtitle: string;
	description: string;
}

export interface BewegungPageData extends PageServerData {
	page: BewegungPage;
	stats: BewegungStats;
	timeline: TimelineItem[];
	principles: PrincipleCard[];
}

export type PageData = BewegungPageData;