import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginLeft from "../components/LoginLeft";
import { useAppContext } from "../context/AppContext";

const AuthPage = ({ mode }) => {
	const { login, register } = useAppContext();
	const navigate = useNavigate();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const isLogin = mode === "login";

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			if (mode === "login") {
				await login(email, password);
			} else {
				await register(name, email, password);
			}
			navigate("/");
		} catch (error) {
			setError(error.message || (mode === "login" ? "Invalid email or password" : "Registration failed"));
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="flex min-h-screen bg-white font-sans text-zinc-900">
			{/* left panel - branding */}
			<LoginLeft />

			{/* right panel - form */}
			<div className="flex flex-1 items-center justify-center p-8">
				<div className="w-full max-w-sm">
					<div className="mb-10">
						<h1 className="mb-1.5 font-medium font-sans text-3xl text-zinc-900 tracking-tight">
							{isLogin ? "Sign in" : "Create an account"}
						</h1>
						<p className="text-sm text-zinc-400">
							{isLogin
								? "Enter your credentials to access your website builder"
								: "Get started by entering your registration details"}
						</p>
					</div>

					{error && <div className="mb-6 rounded border border-red-200 bg-red-50 p-3 text-red-700 text-xs">{error}</div>}

					<form className="space-y-6" onSubmit={handleSubmit}>
						{!isLogin && (
							<div>
								<label
									htmlFor="name"
									className="mb-2 block font-semibold text-[11px] text-zinc-400 uppercase tracking-widest"
								>
									Full Name
								</label>
								<input
									id="name"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className="w-full border-zinc-200 border-b bg-transparent py-2 pl-2 text-sm text-zinc-900 placeholder-zinc-300 transition-colors focus:border-zinc-950 focus:outline-none"
									placeholder="Your Name"
								/>
							</div>
						)}

						<div>
							<label
								htmlFor="email"
								className="mb-2 block font-semibold text-[11px] text-zinc-400 uppercase tracking-widest"
							>
								Email Address
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full border-zinc-200 border-b bg-transparent py-2 pl-2 text-sm text-zinc-900 placeholder-zinc-300 transition-colors focus:border-zinc-950 focus:outline-none"
								placeholder="Your Email"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="mb-2 block font-semibold text-[11px] text-zinc-400 uppercase tracking-widest"
							>
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="w-full border-zinc-200 border-b bg-transparent py-2 pl-2 text-sm text-zinc-900 placeholder-zinc-300 transition-colors focus:border-zinc-950 focus:outline-none"
									placeholder="Your Password"
								/>
								<button
									className="-translate-y-1/2 absolute top-1/2 right-2 flex cursor-pointer items-center justify-center text-zinc-300 transition-colors hover:text-zinc-600"
									type="button"
									onClick={() => setShowPassword((previous) => !previous)}
								>
									{showPassword ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
								</button>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg bg-linear-to-br from-red-600 to-amber-600 py-2.5 font-semibold text-white transition-all hover:scale-102 disabled:opacity-40"
						>
							{loading && <Loader2Icon className="mr-2 h-3.5 w-3.5 animate-spin" />}
							{isLogin ? "Sign in" : "Sign up"}
						</button>
					</form>

					<p className="mt-8 border-zinc-100 border-t pt-6 font-sans text-sm text-zinc-400">
						{isLogin ? (
							<>
								New to BuilderAI?{" "}
								<Link className="font-medium text-zinc-900 hover:underline" to={"/register"}>
									Create an account
								</Link>
							</>
						) : (
							<>
								Already have an account?{" "}
								<Link className="font-medium text-zinc-900 hover:underline" to={"/login"}>
									Sign in here{" "}
								</Link>
							</>
						)}
					</p>
				</div>
			</div>
		</div>
	);
};
export default AuthPage;
