import Link from "next/link";
import Image from "next/image";

import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Milestones, type Milestone } from "@/components/milestones";

const milestones: Milestone[] = [
	{
		title: "Requirements Gathering & Research",
		description:
			"Define the project’s goals, use cases, target users, and compliance needs (e.g., GDPR, OpenID Connect, SAML, OAuth 2.0). Evaluate existing IdPs for inspiration and gather architectural best practices.",
		duedate: new Date("2025-06-01"),
		status: "in-progress",
	},
	{
		title: "Design & Architecture",
		description:
			"Design a modular and scalable architecture. Define system components like authentication, authorization, token management, user store, API gateway, and admin interface. Choose technology stack and integration points.",
		duedate: new Date("2025-06-01"),
		status: "not-started",
	},
	{
		title: "Data Modeling & Database Design",
		description:
			"Design the user schema, roles/permissions model, token store, audit logs, and other required data structures. Select a database system (e.g., PostgreSQL, MongoDB) and define data access patterns.",
		duedate: new Date("2025-06-01"),
		status: "not-started",
	},
	{
		title: "Core Authentication & Authorization Engine",
		description:
			"Implement the core logic for user login, registration, password hashing, session management, and permission checks. Ensure support for OAuth 2.0 and OpenID Connect flows.",
		duedate: new Date("2025-06-01"),
		status: "not-started",
	},
	{
		title: "Token Issuance & Validation",
		description:
			"Develop secure token generation (JWT or similar), signing, validation, and token expiration/refresh logic. Include scopes and claims support.",
		duedate: new Date("2025-06-01"),
		status: "not-started",
	},
	{
		title: "Admin Portal & User Management",
		description:
			"Build a secure web interface for managing users, roles, client applications, and access policies. Implement role-based access control (RBAC) for administrators.",
		duedate: new Date("2025-06-01"),
		status: "not-started",
	},
];

export default function Home() {
	return (
		<div className="bg-black text-white min-h-screen w-full">
			<Navbar />
			<main className="w-full">
				<HeroSection />
				<div className="flex flex-col p-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-20">
					<Milestones milestones={milestones} />
					<div className="flex flex-col gap-4">
						<h1 className="">
							<span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent text-2xl sm:text-2xl md:text-4xl font-extrabold">
								Solutions
							</span>
						</h1>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							<div className="flex flex-col space-y-4">
								<div className="flex flex-col space-y-2">
									<div className="flex flex-col w-full items-center">
										<div className="relative w-full flex items-center justify-center">
											<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-90 z-0 rounded-lg" />
											<Image
												src="/notion_backup.png"
												alt="Notion Backup Solution"
												className="rounded-lg border-5 border-zinc-900 relative z-10"
												width={1000}
												height={300}
												style={{ width: "auto", height: "auto" }}
											/>
										</div>
									</div>
									<h2 className="text-lg font-bold">Notion Backup Solution</h2>
									<div className="text-sm">
										<p>Backup and restore your Notion workspace</p>
									</div>
								</div>
								<Button
									asChild
									size="lg"
									className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
								>
									<Link href="https://github.com/secnex/notion-backup">
										Check out
									</Link>
								</Button>
							</div>
							<div className="flex flex-col space-y-4">
								<div className="flex flex-col space-y-2">
									<div className="flex flex-col w-full items-center">
										<div className="relative w-full flex items-center justify-center">
											<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-90 z-0 rounded-lg" />
											<Image
												src="/teams_webhook_finder.png"
												alt="Teams Webhook Finder"
												className="rounded-lg border-5 border-zinc-900 relative z-10"
												width={1000}
												height={300}
												style={{ width: "auto", height: "auto" }}
											/>
										</div>
									</div>
									<h2 className="text-lg font-bold">Teams Webhook Finder</h2>
									<div className="text-sm">
										<p>Identify teams which use the webhook feature</p>
									</div>
								</div>
								<Button
									asChild
									size="lg"
									className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
								>
									<Link href="https://github.com/secnex/teams-webhook-finder">
										Check out
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
