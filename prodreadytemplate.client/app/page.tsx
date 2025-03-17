import { BellRing, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface WeatherForecast {
    date: string;
    temperatureC: number;
    summary: string;
}

/**
 * Home component: Fetches weather data from the API and displays each forecast
 * inside a shadcn/ui Card with sample actions in the footer.
 */
export default async function Home() {
    // Fetch weather data with no-store cache to ensure fresh data
    const res = await fetch('http://localhost:3000/api/weatherforecast', { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Error fetching API.');
    }
    const weatherData: WeatherForecast[] = await res.json();

    return (
        <main className="bg-gray-200 min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-dark-700 mb-6">
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl gap-4">
                    {weatherData.map((item, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">{item.date}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    <p className="text-base">
                                        <span className="font-semibold">Temp:</span> {item.temperatureC} C
                                    </p>
                                    <p className="text-base">
                                        <span className="font-semibold">Summary:</span> {item.summary}
                                    </p>
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">
                                    <BellRing className="mr-2 h-4 w-4" />
                                    Alert
                                </Button>
                                <Button variant="default" size="sm">
                                    <Check className="mr-2 h-4 w-4" />
                                    Confirm
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
