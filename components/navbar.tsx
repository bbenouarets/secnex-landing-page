"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 10) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`fixed w-full z-50 transition-all duration-300 ${
				isScrolled ? "bg-black/70 backdrop-blur-sm shadow-lg" : "bg-transparent"
			}`}
		>
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center h-16">
					<div className="flex items-center justify-between w-full">
						<div className="flex-shrink-0">
							<Link
								href="/"
								className="flex items-center"
							>
								<Shield className="h-8 w-8 text-purple-500" />
								<span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
									SecNex
								</span>
							</Link>
						</div>

						<Button
							size="lg"
							className="relative inline-flex items-center justify-center overflow-hidden font-medium group p-[1px] rounded-md bg-gradient-to-br from-purple-600 to-cyan-500 border-none focus:ring-4 focus:outline-none focus:ring-cyan-800"
							asChild
						>
							<Link href="https://discord.gg/BXkY4Yt5TW">
								<span className="flex items-center justify-center w-full h-full bg-zinc-900 text-white px-6 py-2 rounded-md">
									Join Discord
								</span>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
};
