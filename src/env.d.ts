type ThemeChoice = "auto" | string | { a: string; b: string };

interface Window {
	siteTheme: {
		ids: { light: string; dark: string };
		readonly choice: ThemeChoice;
		choose(next: ThemeChoice, options?: { save?: boolean }): void;
		hexToHsl(hex: string): [number, number, number];
		hslToHex(hsl: [number, number, number]): string;
		isHex(value: string): boolean;
	};
}
