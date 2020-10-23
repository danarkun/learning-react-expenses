export const getData = (key) => {
	if (!localStorage) return null;

	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (err) {
		console.error(`Error getting item ${key} from localStorage`, err);
		return null;
	}
};

export const storeData = (key, item) => {
	if (!localStorage) return;

	console.log("Saving storage");
	try {
		return localStorage.setItem(key, JSON.stringify(item));
	} catch (err) {
		console.error(`Error storing item ${key} to localStorage`, err);
	}
};
