import { Button } from '@/components/ui/button'
import { LoginButton } from '@/components/auth/login-button'

const Home = () => {
	return (
		<main className='flex h-full flex-col items-center justify-center bg-cyan-500'>
			<LoginButton>
				<Button variant={'secondary'} size={'lg'}>
					Login
				</Button>
			</LoginButton>
		</main>
	)
}

export default Home