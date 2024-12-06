import { clientId } from "../config/spotify";
import { redirectUri } from "../config/spotify";

export const generateRandomString = (length) => {
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const values = crypto.getRandomValues(new Uint8Array(length));
	return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
	const encoder = new TextEncoder();
	const data = encoder.encode(plain);
	return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
	return btoa(String.fromCharCode(...new Uint8Array(input)))
		.replace(/=/g, "")
		.replace(/\+/g, "-")
		.replace(/\//g, "_");
};

export const initiateSpotifyLogin = async () => {
	const codeVerifier = generateRandomString(64);
	const hashed = await sha256(codeVerifier);
	const codeChallenge = base64encode(hashed);
	const scope = "user-read-private user-read-email user-library-read";

	window.localStorage.setItem("code_verifier", codeVerifier);

	const params = {
		response_type: "code",
		client_id: clientId,
		scope,
		code_challenge_method: "S256",
		code_challenge: codeChallenge,
		redirect_uri: redirectUri,
	};

	const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams(
		params
	).toString()}`;
	window.location.href = authUrl;
};

export const handleSpotifyCallback = async (code) => {
	const codeVerifier = localStorage.getItem("code_verifier");

	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			client_id: clientId,
			grant_type: "authorization_code",
			code,
			redirect_uri: redirectUri,
			code_verifier: codeVerifier,
		}),
	});

	const data = await response.json();
	if (data.access_token) {
		localStorage.setItem("access_token", data.access_token);
		localStorage.setItem("refresh_token", data.refresh_token);
		localStorage.setItem("token_expires", Date.now() + data.expires_in * 1000);
		return data.access_token;
	}
	throw new Error("Failed to get access token");
};

export const refreshAccessToken = async () => {
	const refreshToken = localStorage.getItem("refresh_token");
	if (!refreshToken) throw new Error("No refresh token available");

	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			client_id: clientId,
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		}),
	});

	const data = await response.json();
	if (data.access_token) {
		localStorage.setItem("access_token", data.access_token);
		localStorage.setItem("token_expires", Date.now() + data.expires_in * 1000);
		return data.access_token;
	}
	throw new Error("Failed to refresh token");
};

export const logout = () => {
	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
	localStorage.removeItem("token_expires");
};
