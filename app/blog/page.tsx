import { getBlogPosts } from "@/lib/notion";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/notion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogTags, getTagColor } from "@/components/blog/tags";

export const metadata: Metadata = {
	title: "Blog | SecNex",
	description: "Read our latest articles about cybersecurity and technology.",
};

// Statische Generierung mit Revalidierung alle 24 Stunden
export const revalidate = 86400;

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
								className="group flex flex-col w-full cursor-pointer space-y-4 relative overflow-hidden"
							>
								<div className="flex flex-col w-full relative rounded-lg overflow-hidden border border-zinc-800">
									<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
									<div className="absolute top-4 right-4 z-10">
										<div className="*:data-[slot=avatar]:ring-zinc-500 flex -space-x-2 *:data-[slot=avatar]:ring *:data-[slot=avatar]:grayscale">
											{blogPost.properties.Author.people.map((author) => (
												<Avatar key={author.id}>
													<AvatarImage src={author.avatar_url} />
													<AvatarFallback>{author.name}</AvatarFallback>
												</Avatar>
											))}
										</div>
									</div>
									<div className="w-full rounded-lg overflow-hidden">
										<Image
											src={blogPost.cover?.file?.url || ""}
											alt={blogPost.properties.Name.title[0]?.plain_text}
											width={890}
											height={500}
											className="object-cover"
										/>
									</div>
								</div>

								<div className="flex flex-row gap-2 z-10">
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
