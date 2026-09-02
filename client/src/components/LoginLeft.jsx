const LoginLeft = () => {
	return (
		<div className="hidden shrink-0 select-none flex-col justify-between bg-[url('/bg-img.png')] bg-center bg-cover bg-no-repeat p-12 lg:flex lg:w-2/5">
			<div className="flex items-center gap-3">
				<img src="/logo.svg" alt="logo" className="size-9.5" />
				<span className="font-medium text-4xl text-white">Builder AI</span>
			</div>
			<div>
				<h2 className="mb-3 font-medium text-3xl text-white leading-snug tracking-tight">Build your presence on web</h2>
				<p className="text-zinc-300">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo exercitationem officiis ad doloremque temporibus
					deserunt?
				</p>
				<p className="mt-12 text-sm text-zinc-300">Copyright {new Date().getFullYear()} Builder AI</p>
			</div>
		</div>
	);
};
export default LoginLeft;
