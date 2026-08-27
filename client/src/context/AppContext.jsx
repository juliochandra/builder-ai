import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
	// auth states
	const [user, setUser] = useState(null);
	const [loadingUser, setLoadingUser] = useState(true);

	// auth actions

	useEffect(() => {
		const checkSession = async () => {
			try {
				const { data } = await api.get("/api/auth/me");
				setUser(data.user);
			} catch (error) {
				setUser(null);
				console.log(error);
			} finally {
				setLoadingUser(false);
			}
		};

		checkSession();
	}, []);

	return (
		<AppContext.Provider
			value={{
				user,
				loadingUser,
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
