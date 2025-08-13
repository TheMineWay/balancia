import { ENV } from "@constants/env/env.constant";
import { SignInButton } from "@core/auth/session/components/actions/sign-in-button";
import { useTranslation } from "@i18n/use-translation";
import { Card, Container } from "@mantine/core";

export const Auth: FC = () => {
	const { t } = useTranslation("auth");

	const logoUrl = ENV.auth.ui.logo;

	return (
		<Container className="flex flex-col items-center justify-center h-full">
			<Card className="w-full max-w-xl flex flex-col gap-8 items-center justify-center">
				<img src={logoUrl} alt={t().components.auth.logo.Alt} />
				<SignInButton />
			</Card>
		</Container>
	);
};
