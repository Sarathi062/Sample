import { useState } from "react";
import {
	RiDashboardLine,
	RiHeartLine,
	RiPlayListLine,
	RiAlbumLine,
	RiMicLine,
	RiUserLine,
	RiCompassDiscoverLine,
} from "react-icons/ri";

function Sidebar({ onPageChange, currentPage }) {
	const menuItems = [
		{ id: "home", label: "Home", icon: <RiDashboardLine size={24} /> },
		{ id: "liked", label: "Liked", icon: <RiHeartLine size={24} /> },
		{ id: "playlists", label: "Playlists", icon: <RiPlayListLine size={24} /> },
		{ id: "albums", label: "Albums", icon: <RiAlbumLine size={24} /> },
		{ id: "artists", label: "Artists", icon: <RiMicLine size={24} /> },
		{ id: "profile", label: "Profile", icon: <RiUserLine size={24} /> },
		{
			id: "explore",
			label: "Explore",
			icon: <RiCompassDiscoverLine size={24} />,
		},
	];

	return (
		<div
			className="fixed top-0 left-0 h-screen w-20 
      shadow-2xl flex flex-col items-center py-4"
		>
			{/* Logo */}
			<div className="mb-8 text-white font-bold">
				<span className="text-2xl">🎵</span>
			</div>

			{/* Navigation */}
			<nav className="flex-1">
				<ul className="flex flex-col items-center space-y-6">
					{menuItems.map((item) => (
						<li key={item.id} className="w-full flex flex-col items-center">
							<button
								onClick={() => onPageChange(item.id)}
								className={`flex flex-col items-center w-full px-2 py-2 transition-all duration-200
                  group hover:bg-[#F7418F]/20 rounded-xl
                  ${
										currentPage === item.id
											? "text-white bg-[#F7418F]"
											: "text-purple-200"
									}`}
							>
								<span
									className={`transition-transform duration-200 group-hover:scale-110 group-hover:text-[#F7418F] mb-1
                  ${
										currentPage === item.id
											? "text-purple-100"
											: "text-[#F7418F]"
									}`}
								>
									{item.icon}
								</span>
								<span className="text-xs font-medium">{item.label}</span>
							</button>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}

export default Sidebar;
