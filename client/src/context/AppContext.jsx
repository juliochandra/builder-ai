import { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loadingUser, setLoadingUser] = useState(true);

	return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	const context = useContext(AppContext);

	if (context === undefined) {
		throw new Error("useAppContext must be used within an AppContextProvider");
	}

	return context;
};
