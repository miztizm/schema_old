export interface PlatformData {
	// Represents the current game day (or null if not set)
	currentGameDay: number | null;
	// Represents the current mission (can be an object or any type, adjust as needed)
	currentMission: any | null;
	// Represents the current wave (or null if not set)
	currentWave: number | null;
}
