export const monthYear = (d: Date) =>
	d.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

export const fullDate = (d: Date) =>
	d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
