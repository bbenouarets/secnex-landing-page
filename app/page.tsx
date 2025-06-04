import Link from "next/link";
import Image from "next/image";

import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="bg-black text-white min-h-screen w-full">
			<Navbar />
			<main className="w-full">
				<HeroSection />
				<div className="flex flex-col p-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-5">
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
			</main>
			<Footer />
		</div>
	);
}
