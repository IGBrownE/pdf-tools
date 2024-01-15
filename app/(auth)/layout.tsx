import '@/app/styles/Auth.css'
const AuthLayout = ({
	children
}: {
	children: React.ReactNode
}) => {
	return (
		<div className='h-full flex items-center justify-center bg-cyan-600'>
			{children}
		</div>
	)
}

export default AuthLayout