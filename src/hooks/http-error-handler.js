import { useState, useEffect } from "react";

const HttpErrorHandler = (axios) => {
    const [error, setError] = useState(null);
    const reqInterceptor = axios.interceptors.request.use(
        (request) => {
            setError(null);
            return request;
        },
        (err) => {
            setError(err);
            return err;
        }
    );
    const resInterceptor = axios.interceptors.response.use(
        (response) => response,
        (err) => {
            setError(err);
            return err;
        }
    );

    const errorConfirmedHandler = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        };
    }, [
        reqInterceptor,
        resInterceptor,
        axios.interceptors.request,
        axios.interceptors.response,
    ]);

    return [error, errorConfirmedHandler];
};

export default HttpErrorHandler;
