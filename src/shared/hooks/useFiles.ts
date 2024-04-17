"use client";

import { useEffect, useState } from "react";
import { ParseFileAsEnum, parseFile } from "../utils/parseFile";

export type IFile =
	| {
			type: "unknown";
			file: File;
		}
	| {
			type: "img";
			dataUrl: string;
			file: File;
    }
	| { type: "video"; blob: Blob; file: File };

export const useFiles = (fileList?: FileList) => {
	const [files, setFiles] = useState<IFile[]>([]);

	useEffect(() => {
		if (fileList && fileList.length) {
			for (let i = 0; i < fileList.length; i++) {
				const file = fileList.item(i);
				if (file) {
					let fileType: IFile["type"] = "unknown";

					if (file.type.includes("image")) fileType = "img";
					if (file.type.includes("video")) fileType = "video";

					if (fileType === "img") {
						parseFile(file as File, ParseFileAsEnum.DataURL).then((dataUrl) => {
							setFiles((prev) =>
								prev.concat({ type: fileType, dataUrl, file })
							);
						});
					}

					if (fileType === "video") {
						parseFile(file as File, ParseFileAsEnum.Blob).then((blob) => {
							setFiles((prev) =>
								prev.concat({ type: fileType, blob, file })
							);
						});
					}
				}
			}
		} else {
			setFiles([]);
		}
	}, [fileList]);

	return { files, setFiles };
};
