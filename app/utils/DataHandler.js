import AsyncStorage from "@react-native-async-storage/async-storage";

export async function readData(key) {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value != null) {
			return value;
		} else {
			console.log("Key", key, "doesn't exist in AsyncStorage, returning null.");
			return null;
		}
	} catch (err) {
		console.log("readData() Error for key: ", key, "\n", err);
	}
}

/**
 * Stores data using ASyncStorage
 *
 * @param {object} data
 * @param {string} key
 */
export async function storeData(key, data) {
	try {
		// If data is a string, skip stringify; else, stringify it
		if (typeof data == "string") {
			await AsyncStorage.setItem(key, data);
		} else {
			await AsyncStorage.setItem(key, JSON.stringify(data));
		}
	} catch (err) {
		console.log("storeData() Error for key: ", key, "\n", err);
	}
}

// export default DataHandler = {
// 	readData,
// 	storeData,
// };
