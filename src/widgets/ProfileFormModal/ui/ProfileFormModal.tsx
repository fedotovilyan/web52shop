"use client";

import { Alert, Divider, Loader, Modal, ModalProps } from "@/shared/ui";
import { FC, useState } from "react";
import cls from "./ProfileFormModal.module.scss";
import classNames from "classnames";
import { ProfileForm, ProfileFormInputs } from "@/features/ProfileForm";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectProfile, updateProfile } from "@/entities/User";
import { AlertType } from "@/shared/types/AlertType";

interface ProfileFormModalProps extends ModalProps {
	className?: string;
}

export const ProfileFormModal: FC<ProfileFormModalProps> = (props) => {
	const { className, ...rest } = props;
	const { error, profileData, loading} = useAppSelector(selectProfile);
	const [isSuccess, setIsSuccess] = useState(false);
	const dispatch = useAppDispatch();

	const onFormSubmit = (user: ProfileFormInputs) => {
		console.log(user);
		dispatch(updateProfile(user))
			.unwrap()
			.then(() => {
				setIsSuccess(true);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<Modal className={classNames(cls.profile_modal, className)} {...rest}>
			<h3 className={cls.title}>Профиль</h3>
			<Divider />
			{error && (
				<Alert type={AlertType.Error} className={cls.alert} closable>
					{error}
				</Alert>
			)}
			{isSuccess && (
				<Alert type={AlertType.Success} className={cls.alert} closable>
					Профиль успешно обновлён
				</Alert>
			)}
			<Loader spinning={loading}>
				<ProfileForm initialValues={profileData} onFormSubmit={onFormSubmit} />
			</Loader>
		</Modal>
	);
};
