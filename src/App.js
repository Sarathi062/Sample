import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer";
import SongList from "./components/SongList";
import HomePage from "./components/HomePage";

function App() {
	const [currentSong, setCurrentSong] = useState(null);
	const [likedSongs, setLikedSongs] = useState([]);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [currentPage, setCurrentPage] = useState("home");
	const [isChangingSong, setIsChangingSong] = useState(false);

	const handlePrevSong = () => {
		if (isChangingSong || !likedSongs.length) return;

		setIsChangingSong(true);
		if (currentSongIndex > 0) {
			const newIndex = currentSongIndex - 1;
			setCurrentSongIndex(newIndex);
			setCurrentSong(likedSongs[newIndex]);
		} else {
			const lastIndex = likedSongs.length - 1;
			setCurrentSongIndex(lastIndex);
			setCurrentSong(likedSongs[lastIndex]);
		}

		// Reset the changing flag after a short delay
		setTimeout(() => setIsChangingSong(false), 500);
	};

	const handleNextSong = () => {
		if (isChangingSong || !likedSongs.length) return;

		setIsChangingSong(true);
		if (currentSongIndex < likedSongs.length - 1) {
			const newIndex = currentSongIndex + 1;
			setCurrentSongIndex(newIndex);
			setCurrentSong(likedSongs[newIndex]);
		} else {
			setCurrentSongIndex(0);
			setCurrentSong(likedSongs[0]);
		}

		// Reset the changing flag after a short delay
		setTimeout(() => setIsChangingSong(false), 500);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const renderMainContent = () => {
		switch (currentPage) {
			case "home":
				return <HomePage onQuickAccessClick={handlePageChange} />;
			case "liked":
				return (
					<div className="p-6">
						<h1 className="text-3xl font-bold mb-6 text-white">Liked Songs</h1>
						<SongList
							onSongSelect={(song, index) => {
								setCurrentSong(song);
								setCurrentSongIndex(index);
							}}
							likedSongs={likedSongs}
						/>
					</div>
				);
			default:
				return <HomePage onQuickAccessClick={handlePageChange} />;
		}
	};

	return (
		<div className="App bg-gray-900 min-h-screen flex text-white">
			<Sidebar onPageChange={handlePageChange} currentPage={currentPage} />
			<div className="flex-1 ml-20 flex flex-col">
				<Navbar setLikedSongs={setLikedSongs} />
				<div className="flex-1 overflow-y-auto pb-24">
					{renderMainContent()}
				</div>
				<MusicPlayer
					song={currentSong}
					onPrev={handlePrevSong}
					onNext={handleNextSong}
				/>
			</div>
		</div>
	);
}

export default App;
