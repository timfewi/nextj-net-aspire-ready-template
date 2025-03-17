// __tests__/api_tests/weatherforecast.test.ts

import { GET } from '../../app/api/weatherforecast/route';
import { NextResponse } from 'next/server';

describe('WeatherForecast API Route', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    it('should return weatherforecast data, if the external API is called successfully', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => [{ date: '2025-03-16', temperatureC: 20, summary: 'Warm' }],
        });

        const request = new Request('http://localhost:3000/api/weatherforecast');
        const response = await GET(request);

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toEqual([{ date: '2025-03-16', temperatureC: 20, summary: 'Warm' }]);
    });

    it('should return error if API call fails', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 500,
        });

        const request = new Request('http://localhost:3000/api/weatherforecast');
        const response = await GET(request);

        expect(response.status).toBe(500);
        const data = await response.json();
        expect(data.error).toContain('External API responded with status');
    });
});
