import { IFile } from "@/shared/hooks/useFiles";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import cls from "./MediaPreview.module.scss";
import Image from "next/image";
import ReactPlayer from "react-player";
import CrossSvg from "@/shared/assets/icons/cross.svg";
import classNames from "classnames";
import { Button, ButtonTheme } from "@/shared/ui";

interface MediaPreviewProps {
	className?: string;
	files: IFile[];
	setFiles: Dispatch<SetStateAction<IFile[]>>;
}

export const MediaPreview: FC<MediaPreviewProps> = (props) => {
	const { files, className, setFiles } = props;

	const [mainFile, setMainFile] = useState<IFile | null>(null);

	const onRemoveMedia = (index: number) => {
		return () => {
			if (!files.length) return;
			setFiles((prev) => prev.toSpliced(index, 1));
		};
	};

	useEffect(() => {
		setMainFile(files[0]);
	}, [files]);

	return (
		<div className={classNames(cls.files_preview, className)}>
			{!!mainFile &&
				(mainFile.type === "img" ? (
					<Image src={mainFile.dataUrl} width={400} height={300} alt="" />
				) : mainFile.type === "video" ? (
					<ReactPlayer
						width={400}
						height={300}
						controls
						url={URL.createObjectURL(mainFile.blob)}
					/>
				) : null)}
			<div className={cls.files}>
				{files.map((file, i) => {
					if (file.type === "img") {
						return (
							<div key={file.dataUrl} className={cls.media_wrapper}>
								<Image
									src={file.dataUrl}
									width={50}
									className={classNames({
										[cls.selectedFile]: file === mainFile,
									})}
									height={50}
									alt=""
									onClick={() => setMainFile(file)}
								/>
								<Button
									theme={ButtonTheme.Transparent}
									className={cls.close_btn}
									onClick={onRemoveMedia(i)}
									type="button"
								>
									<CrossSvg
										alt=""
										width={20}
										height={20}
										className={cls.cross_icon}
									/>
								</Button>
							</div>
						);
					}
					if (file.type === "video") {
						const url = URL.createObjectURL(file.blob);
						return (
							<div key={url} className={cls.media_wrapper}>
								<ReactPlayer
									width={50}
									height={50}
									className={classNames({
										[cls.selectedFile]: file === mainFile,
									})}
									onClick={() => setMainFile(file)}
									url={url}
								/>
								<Button
									theme={ButtonTheme.Transparent}
									type="button"
									className={cls.close_btn}
									onClick={onRemoveMedia(i)}
								>
									<CrossSvg
										alt=""
										width={20}
										height={20}
										className={cls.cross_icon}
									/>
								</Button>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};
