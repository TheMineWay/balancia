import { SignInButton } from "@common/core/auth/session/components/actions/sign-in-button";
import { Card } from "@mantine/core";
import clsx from "clsx";
import styles from "./auth.module.pcss";

export default function Auth() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<div
				className={clsx(
					styles.container,
					"flex flex-col lg:flex-row items-center lg:justify-between gap-2",
				)}
			>
				<div className="w-full lg:w-1/2 mx-auto">
					<Card className="w-full">
						<SignInButton />
					</Card>
				</div>
			</div>
		</div>
	);
}
