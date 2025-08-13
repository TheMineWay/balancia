import { Text } from "@mantine/core";
import type { ReactNode } from "react";

type StatusProps = {
	title: string;
	description?: string;
	actions?: ReactNode;
	src: string;
};

export const Status: FC<StatusProps> = ({
	title,
	description,
	actions,
	src,
}) => {
	return (
		<div className="flex flex-col gap-6">
			<StatusImage src={src} alt={title} />
			<div className="flex flex-col items-center gap-1">
				<Text size="xl" className="text-center">
					<b>{title}</b>
				</Text>
				{description && (
					<Text size="sm" className="text-center">
						{description}
					</Text>
				)}
				{actions}
			</div>
		</div>
	);
};

/* Internal */

type StatusImageProps = {
	src: string;
	alt: string;
};

const StatusImage: FC<StatusImageProps> = ({ src, alt }) => {
	return <img className="h-64 object-cover rounded-lg" src={src} alt={alt} />;
};
