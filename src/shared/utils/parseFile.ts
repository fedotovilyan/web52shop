export enum ParseFileAsEnum {
	DataURL = "DataURL",
	Blob = "Blob",
}

type ReturnType<T> = T extends ParseFileAsEnum.DataURL
	? string
	: T extends ParseFileAsEnum.Blob
	? Blob
	: never;

export async function parseFile<T extends ParseFileAsEnum>(
	file: File,
	parseAs: T
): Promise<ReturnType<T>> {
	const reader = new FileReader();

	return await new Promise((resolve, reject) => {
		if (parseAs === ParseFileAsEnum.DataURL) reader.readAsDataURL(file);
		if (parseAs === ParseFileAsEnum.Blob) reader.readAsArrayBuffer(file);

		reader.onload = (e) => {
			const result = e.target?.result;
			if (typeof result === "string") {
				resolve(result as ReturnType<T>);
				return;
			}

			if (result instanceof ArrayBuffer) {
				resolve(
					new Blob([new Uint8Array(result)], {
						type: "video/mp4",
					}) as ReturnType<T>
				);
				return;
			}
		};

		reader.onerror = (e) => {
			reject(e.target?.error);
		};
	});
}
