import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
	const navigate = useNavigate();
	// auth states
	const [user, setUser] = useState(null);
	const [loadingUser, setLoadingUser] = useState(true);

	// auth actions
	useEffect(() => {
		const checkSession = async () => {
			try {
				const { data } = await api.get("/api/auth/me");
				setUser(data.user);
				console.log(data);
			} catch (error) {
				setUser(null);
				console.log(error);
			} finally {
				// await new Promise((resolve) => setTimeout(resolve, 1000));
				setLoadingUser(false);
			}
		};

		checkSession();
	}, []);

	const login = async (email, password) => {
		try {
			const { data } = await api.post("/api/auth/login", { email, password });
			setUser(data.user);
			toast.success("Welcome back!");
			navigate("/");
		} catch (error) {
			console.log("login failed", error);
			const errorMessage = error?.response?.data?.error || "Invalid email or password";
			toast.error(errorMessage);
			throw new Error(errorMessage);
		}
	};

	const register = async (name, email, password) => {
		try {
			const { data } = await api.post("/api/auth/register", { name, email, password });
			setUser(data.user);
			toast.success("Account created successfully!");
			navigate("/");
		} catch (error) {
			console.log("Registration failed", error);
			const errorMessage = error?.response?.data?.error || "Registration failed";
			toast.error(errorMessage);
			throw new Error(errorMessage);
		}
	};

	return (
		<AppContext.Provider
			value={{
				user,
				loadingUser,
				login,
				register,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);

	if (context === undefined) {
		throw new Error("useAppContext must be used within an AppContextProvider");
	}

	return context;
};
