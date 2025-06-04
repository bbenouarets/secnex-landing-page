"use server";

import React from "react";

import { type BlogPost } from "@/app/blog/[id]/page";

const examplePosts: BlogPost[] = [];

export const GetBlogPost = async (id: string) => {
	const post = examplePosts.find((p) => p.id === id);
	return post;
};
