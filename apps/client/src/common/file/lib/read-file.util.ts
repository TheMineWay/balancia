export const readFile = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				resolve(reader.result);
			} else {
				reject(new Error("File reading error: result is not a string"));
			}
		};
		reader.onerror = () => {
			reject(new Error("File reading error"));
		};
		reader.readAsText(file);
	});
};
