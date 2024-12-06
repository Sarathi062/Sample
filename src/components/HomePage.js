import { useState, useEffect } from "react";

function HomePage({ onQuickAccessClick }) {
	const [greeting, setGreeting] = useState("");

	useEffect(() => {
		const hour = new Date().getHours();
		if (hour < 12) setGreeting("Good morning");
		else if (hour < 18) setGreeting("Good afternoon");
		else setGreeting("Good evening");
	}, []);

	const categories = [
		{
			id: 1,
			title: "Your Vibe Mix",
			playlists: [
				{
					id: 1,
					title: "Chill Lounge",
					description: "Relax and unwind",
					image: "https://i.scdn.co/image/ab67706f000000025ae7aa0454c9eafdd6505fda",
					color: "#FFF3C7"
				},
				{
					id: 2,
					title: "Energy Boost",
					description: "Power through your day",
					image: "https://i.scdn.co/image/ab67706f00000002b4a6616e2d86a78145585192",
					color: "#FEC7B4"
				},
				{
					id: 3,
					title: "Focus Flow",
					description: "Stay in the zone",
					image: "https://i.scdn.co/image/ab67706f000000025d87659dcadef82dd0e73f56",
					color: "#FC819E"
				}
			]
		},
		{
			id: 2,
			title: "Genre Picks",
			playlists: [
				{
					id: 4,
					title: "Rock Classics",
					description: "Timeless rock hits",
					image: "https://i.scdn.co/image/ab67706f000000026de0b12949c5805fa5b88e67",
					color: "#F7418F"
				},
				{
					id: 5,
					title: "Jazz Moments",
					description: "Smooth jazz collection",
					image: "https://i.scdn.co/image/ab67706f00000002b4a6616e2d86a78145585192",
					color: "#FFF3C7"
				}
			]
		}
	];

	return (
		<div className="p-6 space-y-8">
			{/* Greeting Section with new styling */}
			<div className="bg-gradient-to-r from-[#FFF3C7] to-[#FEC7B4] rounded-2xl p-8">
				<h1 className="text-4xl font-bold text-gray-800 mb-4">{greeting}</h1>
				<p className="text-gray-700 text-lg">What would you like to listen to today?</p>
			</div>

			{/* Categories */}
			{categories.map((category) => (
				<section key={category.id} className="space-y-6">
					<h2 className="text-2xl font-bold text-white mb-6">{category.title}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{category.playlists.map((playlist) => (
							<div
								key={playlist.id}
								className="rounded-xl p-1"
								style={{ background: `linear-gradient(45deg, ${playlist.color}, ${playlist.color}88)` }}
							>
								<div className="bg-gray-900/90 rounded-lg p-4 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 cursor-pointer group">
									<div className="flex items-center space-x-4">
										<img
											src={playlist.image}
											alt={playlist.title}
											className="w-20 h-20 rounded-lg shadow-lg"
										/>
										<div className="flex-1">
											<h3 className="text-white font-semibold text-lg mb-1">{playlist.title}</h3>
											<p className="text-gray-300 text-sm">{playlist.description}</p>
										</div>
										<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<button className="w-12 h-12 rounded-full bg-[#F7418F] hover:bg-[#FC819E] transition-colors duration-300 flex items-center justify-center shadow-lg">
												<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
													<path d="M8 5v14l11-7z" />
												</svg>
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			))}

			{/* Quick Access Section */}
			<section className="mt-8">
				<h2 className="text-2xl font-bold text-white mb-6">Quick Access</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<QuickAccessCard
						title="Liked Songs"
						icon="❤️"
						color="#F7418F"
						onClick={() => onQuickAccessClick('liked')}
					/>
					<QuickAccessCard
						title="Recently Played"
						icon="🕒"
						color="#FC819E"
						onClick={() => onQuickAccessClick('recent')}
					/>
					<QuickAccessCard
						title="Your Playlists"
						icon="📑"
						color="#FEC7B4"
						onClick={() => onQuickAccessClick('playlists')}
					/>
					<QuickAccessCard
						title="Discover"
						icon="🔍"
						color="#FFF3C7"
						onClick={() => onQuickAccessClick('discover')}
					/>
				</div>
			</section>
		</div>
	);
}

// Quick Access Card Component
function QuickAccessCard({ title, icon, color, onClick }) {
	return (
		<div
			onClick={onClick}
			className="rounded-xl p-6 cursor-pointer transition-transform duration-300 hover:scale-105"
			style={{ 
				background: `linear-gradient(45deg, ${color}, ${color}88)`,
				boxShadow: `0 4px 20px ${color}44`
			}}
		>
			<div className="text-3xl mb-2">{icon}</div>
			<div className="text-gray-800 font-semibold">{title}</div>
		</div>
	);
}

export default HomePage;
