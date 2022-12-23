import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useStateParams<T>(
    initialState: T,
    paramsName: String,
    serialize: (state: T) => string,
    deserialize: (state: string) => T
): [T, (state: T) => void] {

    const navigate = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);

    const existingValue = search.get(String(paramsName));
    const [state, setState] = useState<T>(
        existingValue ? deserialize(existingValue) : initialState
    );

    useEffect(() => {
        if (existingValue && deserialize(existingValue) !== state) {
            setState(deserialize(existingValue));
        }
    }, [existingValue])

    const onChange = (s: T) => {
        setState(s);
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(String(paramsName), serialize(s));
        const pathName = location.pathname;
        navigate({
            pathname: pathName,
            search: searchParams.toString()
        });
    };

    return [state, onChange];
}

