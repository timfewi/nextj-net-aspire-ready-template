// lib/apiClient.ts

import { APIEndpoint } from '@/lib/constants';

export function buildExternalApiUrl(path: string): string {
    if (!path.startsWith('/')) {
        path = '/' + path;
    }

    if (!APIEndpoint.includes('/api')) {
        const endpoint = APIEndpoint.endsWith('/') ? APIEndpoint.slice(0, -1) : APIEndpoint;
        return `${endpoint}/api${path}`;
    }

    return `${APIEndpoint}${path}`;
}