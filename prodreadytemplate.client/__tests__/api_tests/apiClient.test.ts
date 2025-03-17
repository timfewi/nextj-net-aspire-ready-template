// __tests__/apiClient.test.ts
import { buildExternalApiUrl } from '@/lib/apiClient';

// Beispiel: Test, wenn APIEndpoint bereits "api" enthält
describe('buildExternalApiUrl', () => {
    it('should return correct URL when APIEndpoint includes "api"', () => {

        const originalEndpoint = "https://localhost:5001/api";
        const path = 'weatherforecast';
        const expected = 'https://localhost:5001/api/weatherforecast';

        const url = buildExternalApiUrl(path);
        expect(url).toEqual(expected);
    });
});
