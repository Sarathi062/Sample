export const fetchUserProfile = async (token) => {
    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

export const fetchLikedSongs = async (token) => {
    const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

export const searchArtist = async (token, artistName) => {
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    const data = await response.json();
    return data.artists.items[0];
}; 