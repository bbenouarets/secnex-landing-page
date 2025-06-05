import { getBlogPosts } from "@/lib/notion";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/notion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogTags, getTagColor } from "@/components/blog/tags";

export const metadata: Metadata = {
	title: "Blog | SecNex",
	description:
		"Lesen Sie unsere neuesten Artikel über Cybersicherheit und Technologie.",
};

export const revalidate = 3600; // Revalidiere jede Stunde

export default async function BlogPage() {
	const response = await getBlogPosts();

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<div className="flex flex-col max-w-5xl mx-auto w-full space-y-6 px-4 sm:px-6 lg:px-8 pt-30">
				<h1 className="text-white text-2xl sm:text-2xl md:text-4xl font-extrabold">
					Blog
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
					{response.results.map((post) => {
						const blogPost = post as BlogPost;
						return (
							<Link
								href={`/blog/${post.id}`}
								key={post.id}
								className="group flex flex-col p-4 w-full cursor-pointer hover:bg-zinc-900/50 transition-colors space-y-4 relative overflow-hidden border border-zinc-800 rounded-lg"
							>
								<div className="flex flex-col w-full relative rounded-lg overflow-hidden">
									<div className="absolute top-1 right-1 z-10">
										<div className="*:data-[slot=avatar]:ring-zinc-500 flex -space-x-2 *:data-[slot=avatar]:ring *:data-[slot=avatar]:grayscale">
											{blogPost.properties.Author.people.map((author) => (
												<Avatar key={author.id}>
													<AvatarImage src={author.avatar_url} />
													<AvatarFallback>{author.name}</AvatarFallback>
												</Avatar>
											))}
										</div>
									</div>
									<div className="flex flex-row gap-2 absolute bottom-0 left-0 z-10">
										{blogPost.properties.Tags.multi_select.map((tag) => {
											const colors = getTagColor(tag.color);
											return (
												<BlogTags
													key={tag.id}
													tag={tag.name}
													colors={colors}
												/>
											);
										})}
									</div>
									<div className="w-full rounded-lg overflow-hidden">
										<Image
											src={blogPost.cover?.file?.url || ""}
											alt={blogPost.properties.Name.title[0]?.plain_text}
											width={1000}
											height={1000}
											className="object-cover"
										/>
									</div>
								</div>
								<h2 className="text-lg font-bold text-white mb-2 w-full">
									{blogPost.properties.Name.title[0]?.plain_text}
								</h2>
								<div className="flex flex-row items-center gap-4 text-zinc-500 text-sm">
									<p>
										{blogPost.properties.Description.rich_text[0]?.plain_text}
									</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
			<Footer />
		</div>
	);
}
