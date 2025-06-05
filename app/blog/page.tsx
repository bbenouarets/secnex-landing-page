"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";

type BlogPost = {
	id: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	author: string;
};

const examplePosts: BlogPost[] = [];

export default function Blog() {
	const [currentPage, setCurrentPage] = useState(1);
	const router = useRouter();
	const postsPerPage = 4;
	const totalPages = Math.ceil(examplePosts.length / postsPerPage);

	const currentPosts = examplePosts.slice(
		(currentPage - 1) * postsPerPage,
		currentPage * postsPerPage
	);

	const handlePostClick = (postId: string) => {
		router.push(`/blog/${postId}`);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<div className="flex flex-col max-w-5xl mx-auto w-full space-y-6 px-4 sm:px-6 lg:px-8 pt-30">
				<h1 className="">
					<span className="block text-white text-2xl sm:text-2xl md:text-4xl font-extrabold">
						Blog
					</span>
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
					{currentPosts.map((post) => (
						<div
							key={post.id}
							className="flex flex-col border border-zinc-800 rounded-lg p-4 w-full cursor-pointer hover:bg-zinc-900/50 transition-colors space-y-4"
							onClick={() => handlePostClick(post.id)}
						>
							<h2 className="text-lg font-bold text-white mb-2 w-full">
								{post.title}
							</h2>
							<p className="text-white mb-4 text-sm">{post.excerpt}</p>
							<div className="flex justify-between items-center text-sm text-zinc-500">
								<span>{post.author}</span>
								<span>{new Date(post.date).toLocaleDateString("de-DE")}</span>
							</div>
						</div>
					))}
				</div>
				{totalPages > 1 && (
					<Pagination>
						<PaginationContent>
							<PaginationItem className="">
								<PaginationPrevious
									href="#"
									size="default"
									className="text-white hover:bg-zinc-900/90 hover:text-white transition-colors border border-zinc-800"
									onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
								/>
							</PaginationItem>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
								(page) => (
									<PaginationItem key={page}>
										<PaginationLink
											href="#"
											isActive={currentPage === page}
											onClick={() => setCurrentPage(page)}
											size="default"
											className="text-white hover:bg-zinc-900/90 hover:text-white transition-colors border border-zinc-800 data-[active=true]:bg-zinc-50 data-[active=true]:text-zinc-900"
										>
											{page}
										</PaginationLink>
									</PaginationItem>
								)
							)}
							<PaginationItem>
								<PaginationNext
									href="#"
									size="default"
									className="text-white hover:bg-zinc-900/90 hover:text-white transition-colors border border-zinc-800"
									onClick={() =>
										setCurrentPage((p) => Math.min(totalPages, p + 1))
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				)}
				{examplePosts.length === 0 && (
					<div className="flex flex-col items-center justify-center h-full">
						<div className="flex border border-zinc-800 rounded-lg p-4 w-full">
							<p className="text-zinc-400 text-center font-mono">
								We are working on it. Stay tuned!
							</p>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}
