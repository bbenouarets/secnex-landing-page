import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import BlogPostClient from "../../../components/client";
import { redirect } from "next/navigation";

type BlogPost = {
	id: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	author: string;
};

const examplePosts: BlogPost[] = [];

export default function BlogPost({ params }: { params: { id: string } }) {
	const post = examplePosts.find((p) => p.id === params.id);

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
