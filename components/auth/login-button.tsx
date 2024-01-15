'use client';

import { useRouter } from "next/navigation";

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: 'modal' | 'redirect',
	isChild?: boolean;
}

export const LoginButton = ({
	children,
	mode = 'redirect',
	isChild
}: LoginButtonProps) => {
	const router = useRouter();

	function onClick() {
		router.push('/login');
	}

	if (mode === 'modal') {
		return (
			<span>
				TODO: need to implement modal
			</span>
		)
	}

	return (
		<span onClick={onClick}>
			{children}
		</span>
	)
}