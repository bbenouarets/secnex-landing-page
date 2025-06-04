import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import BlogPostClient from "../../../components/client";
import { GetBlogPost } from "@/components/server/blog";
import { redirect } from "next/navigation";

export type BlogPost = {
	id: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	author: string;
};

export default async function BlogPost({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const post = await GetBlogPost(id);

	if (!post) {
		return redirect("/blog");
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<BlogPostClient post={post} />
			<Footer />
		</div>
	);
}
