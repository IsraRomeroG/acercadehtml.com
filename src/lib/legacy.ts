export interface LegacyPage {
	title: string;
	description: string;
	path: string;
	bodyHtml: string;
}

export interface LegacyPost {
	title: string;
	href: string;
	section: string;
	sectionHref: string;
	previewHtml: string;
}

function decodeText(value: string): string {
	return value
		.replace(/<[^>]*>/g, "")
		.replace(/&nbsp;/gi, " ")
		.replace(/&amp;/gi, "&")
		.replace(/&quot;/gi, '"')
		.replace(/&#39;|&apos;/gi, "'")
		.replace(/&lt;/gi, "<")
		.replace(/&gt;/gi, ">");
}

export function createLegacyPage(source: string, path: string): LegacyPage {
	const contentStart = source.indexOf('<div id="contenido">');
	const asideStart = source.indexOf('<aside id="aside"', contentStart);
	const contentEnd = source.lastIndexOf("</div>", asideStart);

	if (contentStart === -1 || asideStart === -1 || contentEnd === -1) {
		throw new Error(`No se pudo extraer el contenido de la página ${path}`);
	}

	let bodyHtml = source.slice(contentStart + '<div id="contenido">'.length, contentEnd);
	const breadcrumbEnd = bodyHtml.indexOf("</div>");
	if (breadcrumbEnd !== -1) bodyHtml = bodyHtml.slice(breadcrumbEnd + "</div>".length);
	bodyHtml = bodyHtml.trim();

	const heading = bodyHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
	const documentTitle = source.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "Acerca de HTML";
	const title = decodeText(heading ?? documentTitle.replace(/\s+-\s+Acerca de HTML\s*$/i, "")).trim();
	const description = source.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1]
		?? "Aprende HTML con explicaciones claras, ejemplos y ejercicios paso a paso.";

	return { title, description, path, bodyHtml };
}

export function getLegacyPosts(source: string): LegacyPost[] {
	const posts: LegacyPost[] = [];
	const matches = source.matchAll(/<article\s+itemprop=["']blogPost["'][\s\S]*?<\/article>/gi);

	for (const match of matches) {
		const html = match[0];
		const link = html.match(/<a\s+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
		if (!link) continue;

		const contentAfterHeading = html.slice(html.indexOf("</h1>") + "</h1>".length);
		const preview = contentAfterHeading.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1];
		const href = link[1];
		const isManual = href.startsWith("/manual-html/");

		posts.push({
			title: decodeText(link[2]).trim(),
			href,
			section: isManual ? "Manual HTML" : "Etiquetas HTML",
			sectionHref: isManual ? "/manual-html.html" : "/etiquetas-html.html",
			previewHtml: preview ?? "Explora este tema con ejemplos prácticos de HTML.",
		});
	}

	return posts;
}
