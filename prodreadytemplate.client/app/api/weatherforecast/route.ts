// app/api/weatherforecast/route.ts
import { NextResponse } from 'next/server';
import { buildExternalApiUrl } from '@/lib/apiClient'

export async function GET(request: Request): Promise<Response> {
    try {

        const externalApiUrl = buildExternalApiUrl('weatherforecast');

        const apiResponse = await fetch(externalApiUrl);
        if (!apiResponse.ok) {
            throw new Error(`External API responded with status ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching weather data:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
