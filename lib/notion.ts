import {
	Client,
	PageObjectResponse,
	RichTextItemResponse,
	BlockObjectResponse,
	PartialBlockObjectResponse,
} from "@notionhq/client";

// Überprüfe Umgebungsvariablen nur im Server-Kontext
if (typeof window === "undefined") {
	if (!process.env.NOTION_API_KEY) {
		throw new Error("NOTION_API_KEY ist nicht definiert");
	}

	if (!process.env.NOTION_DATABASE_ID) {
		throw new Error("NOTION_DATABASE_ID ist nicht definiert");
	}
}

// Initialisiere den Client nur mit den notwendigen Berechtigungen
export const notion = new Client({
	auth: process.env.NOTION_API_KEY,
});

// Stelle sicher, dass databaseId immer definiert ist
export const databaseId = process.env.NOTION_DATABASE_ID || "";

type FileObject = {
	url: string;
	expiry_time: string;
};

export type BlogPost = PageObjectResponse & {
	cover?: {
		type: "file";
		file: FileObject;
	} | null;
	created_time: string;
	properties: {
		Name: {
			type: "title";
			title: RichTextItemResponse[];
			id: string;
		};
		Description: {
			type: "rich_text";
			rich_text: RichTextItemResponse[];
			id: string;
		};
		Author: {
			type: "people";
			people: Array<{
				id: string;
				name: string;
				avatar_url?: string;
			}>;
			id: string;
		};
		Tags: {
			type: "multi_select";
			multi_select: Array<{
				id: string;
				name: string;
				color: string;
			}>;
		};
		"Reading Time": {
			type: "number";
			number: number | null;
			id: string;
		};
	};
};

// Füge Rate-Limiting und Fehlerbehandlung hinzu
export async function getBlogPosts(startCursor?: string) {
	try {
		const response = await notion.databases.query({
			database_id: databaseId,
			start_cursor: startCursor,
		});

		console.log(
			(response.results[0] as BlogPost)?.properties.Tags.multi_select
		);
		console.log(response.results[0] as BlogPost);
		console.log((response.results[0] as BlogPost)?.cover);
		console.log((response.results[0] as BlogPost)?.properties);

		return response;
	} catch (error) {
		console.error("Fehler beim Abrufen der Blog-Posts:", error);
		return { results: [], has_more: false };
	}
}

export async function getBlogPostBySlug(slug: string): Promise<
	| (BlogPost & {
			blocks: (BlockObjectResponse | PartialBlockObjectResponse)[];
	  })
	| null
> {
	try {
		const response = (await notion.pages.retrieve({
			page_id: slug,
		})) as BlogPost;

		const blocks = await notion.blocks.children.list({
			block_id: slug,
		});

		return {
			...response,
			blocks: blocks.results,
		};
	} catch (error) {
		console.error("Error fetching blog post:", error);
		return null;
	}
}

export async function getDatabase() {
	try {
		const response = await notion.databases.query({
			database_id: databaseId,
			page_size: 100,
			sorts: [
				{
					property: "Date",
					direction: "descending",
				},
			],
		});

		return response.results.map((page) => {
			const post = page as BlogPost;
			const cover = post.cover?.type === "file" ? post.cover.file.url : null;

			return {
				id: post.id,
				title: post.properties.Name.title[0]?.plain_text || "Ohne Titel",
				author: post.properties.Author.people[0]?.name || "Anonym",
				slug: post.id,
				cover: cover,
			};
		});
	} catch (error) {
		console.error("Fehler beim Abrufen der Blog-Posts:", error);
		return [];
	}
}
