import { AxiosError } from 'axios';

import InternalServerErrorPage from './InternalServerErrorPage';
import NotFoundPage from './NotFoundPage';

interface ErrorInfo {
    error: Error;
    resetErrorBoundary: () => void;
}

export function isAxiosError(object: any): object is AxiosError {
    return 'response' in object;
}

function ErrorFallback(errorInfo: ErrorInfo) {
    if (isAxiosError(errorInfo.error) && errorInfo.error.response?.status === 404) {
        return <NotFoundPage />;
    }
    return <InternalServerErrorPage />;
}

export default ErrorFallback;
