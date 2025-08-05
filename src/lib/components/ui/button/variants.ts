import type { WithElementRef } from "bits-ui";
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
import { type VariantProps, tv } from "tailwind-variants";

export const buttonVariants = tv({
	base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
	variants: {
		variant: {
			default: "bg-primary-500 text-white shadow-md hover:bg-primary-600 hover:shadow-lg focus-visible:ring-primary-500/50",
			destructive: "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg focus-visible:ring-red-600/50",
			outline:
				"border-2 border-gray-300 bg-transparent hover:bg-gray-50 hover:border-gray-400 focus-visible:ring-gray-400/50",
			secondary: "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 hover:shadow-md focus-visible:ring-gray-400/50",
			ghost: "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400/50",
			link: "text-primary-500 underline-offset-4 hover:underline hover:text-primary-600 focus-visible:ring-primary-500/50",
			// Neue kreative Varianten
			premium: "bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-md hover:shadow-lg hover:from-primary-600 hover:to-primary-800 focus-visible:ring-primary-500/50",
			soft: "bg-primary-500/10 text-primary-500 hover:bg-primary-500/20 focus-visible:ring-primary-500/50",
		},
		size: {
			default: "h-10 px-5 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-12 rounded-lg px-8 text-base",
			xl: "h-14 rounded-lg px-10 text-lg",
			icon: "h-10 w-10",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
	WithElementRef<HTMLAnchorAttributes> & {
		variant?: ButtonVariant;
		size?: ButtonSize;
	};