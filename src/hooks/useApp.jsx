import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const useApp = () => {
    console.log('useApp called');
    const value = useContext(AppContext);

    if (!value) {
        throw new Error('useApp hook used without AppContext');
    };

    return value;
};

export default useApp;