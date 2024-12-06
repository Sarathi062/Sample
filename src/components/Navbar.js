import React, { useEffect, useState } from "react";
import { initiateSpotifyLogin, handleSpotifyCallback, refreshAccessToken, logout } from "../services/authService";
import { fetchUserProfile, fetchLikedSongs } from "../services/spotifyService";
import { RiSearchLine, RiNotification3Line } from "react-icons/ri";

function Navbar({ setLikedSongs }) {
	const [userData, setUserData] = useState(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [searchFocused, setSearchFocused] = useState(false);

	useEffect(() => {
		const initializeAuth = async () => {
			const urlParams = new URLSearchParams(window.location.search);
			const code = urlParams.get("code");
			const storedAccessToken = localStorage.getItem("access_token");

			try {
				let token = storedAccessToken;
				
				if (code) {
					token = await handleSpotifyCallback(code);
					window.history.pushState({}, document.title, window.location.pathname);
				} else if (storedAccessToken) {
					const tokenExpires = localStorage.getItem("token_expires");
					if (Date.now() >= tokenExpires) {
						token = await refreshAccessToken();
					}
				}

				if (token) {
					const userData = await fetchUserProfile(token);
					setUserData(userData);
					
					const likedSongsData = await fetchLikedSongs(token);
					setLikedSongs(likedSongsData.items);
				}
			} catch (error) {
				console.error("Authentication error:", error);
			}
		};

		initializeAuth();
	}, [setLikedSongs]);

	const handleLogout = () => {
		logout();
		setUserData(null);
		setLikedSongs([]);
		setIsDropdownOpen(false);
	};

	return (
		<div className="bg-gray-900/60 backdrop-blur-md p-4 flex justify-between items-center border-b border-gray-800">
			{/* Left section */}
			<div className="flex items-center gap-8">
				<h1 className="text-2xl font-bold bg-gradient-to-r from-[#F7418F] to-[#FEC7B4] text-transparent bg-clip-text">
					Streamusic
				</h1>
				
				{/* Search bar */}
				<div className="relative">
					<div className={`flex items-center bg-gray-800/50 rounded-full px-4 py-2 
						${searchFocused ? 'ring-2 ring-[#F7418F]' : 'hover:bg-gray-800'} transition-all duration-300`}>
						<RiSearchLine className="text-gray-400 mr-2" size={20} />
						<input
							type="text"
							placeholder="Search songs, artists, or albums..."
							className="bg-transparent outline-none w-64 text-white placeholder-gray-400"
							onFocus={() => setSearchFocused(true)}
							onBlur={() => setSearchFocused(false)}
						/>
					</div>
				</div>
			</div>

			{/* Right section */}
			<div className="flex items-center gap-6">
				{userData && (
					<button className="text-gray-400 hover:text-white transition-colors">
						<RiNotification3Line size={24} />
					</button>
				)}
				
				{!userData ? (
					<button
						onClick={initiateSpotifyLogin}
						className="bg-[#F7418F] hover:bg-[#FC819E] text-white px-6 py-2 rounded-full 
							font-medium transition-all duration-300 hover:scale-105"
					>
						Login with Spotify
					</button>
				) : (
					<div className="relative">
						<div
							className="flex items-center gap-3 cursor-pointer bg-gray-800/50 
								hover:bg-gray-800 rounded-full py-1 pl-1 pr-4 transition-all duration-300"
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						>
							<img
								src={userData.images?.[0]?.url || '/default-avatar.png'}
								alt="Profile"
								className="w-8 h-8 rounded-full border-2 border-[#F7418F]"
							/>
							<span className="text-white font-medium">{userData.display_name}</span>
						</div>
						
						{isDropdownOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl 
								border border-gray-700 overflow-hidden animate-fadeIn">
								<div className="py-2">
									<button
										onClick={handleLogout}
										className="w-full text-left px-4 py-2 text-gray-300 hover:text-white 
											hover:bg-[#F7418F] transition-colors duration-200"
									>
										Logout
									</button>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default Navbar;
