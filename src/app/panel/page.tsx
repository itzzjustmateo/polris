"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ExternalLink, Globe, Loader2, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RedirectPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);
    const [progress, setProgress] = useState(0);
    const targetUrl = "https://panel.devflare.de";

    useEffect(() => {
        // Start countdown
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Redirect when countdown reaches 0
                    window.location.href = targetUrl;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Animate progress bar
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 20;
            });
        }, 1000);

        // Cleanup function
        return () => {
            clearInterval(timer);
            clearInterval(progressInterval);
        };
    }, []); // Empty dependency array means this runs once on mount

    const handleManualRedirect = () => {
        window.location.href = targetUrl;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4 transition-colors duration-200">
            <div className="w-full max-w-md">
                <Card className="shadow-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                                <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            Redirecting to Devflare Panel
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                            You are being redirected to the Devflare management panel
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Redirecting in:</span>
                                <span className="font-semibold text-blue-600 dark:text-blue-400">{countdown} seconds</span>
                            </div>
                            <Progress
                                value={progress}
                                className="h-2 bg-gray-100 dark:bg-gray-800"
                            />
                        </div>

                        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-100 dark:border-blue-800/30">
                            <div className="flex items-start space-x-3">
                                <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Destination URL:</p>
                                    <p className="text-sm text-blue-600 dark:text-blue-400 break-all mt-1">{targetUrl}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Security Information:</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    <span>Secure HTTPS connection</span>
                                </li>
                                <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    <span>Official Devflare domain</span>
                                </li>
                                <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    <span>SSL/TLS encrypted</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-3">
                        <Button
                            onClick={handleManualRedirect}
                            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
                            size="lg"
                        >
                            {countdown === 0 ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Redirecting...
                                </>
                            ) : (
                                <>
                                    Redirect Now
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            className="w-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            Go Back
                        </Button>

                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center pt-4">
                            If you are not redirected automatically, click the button above.
                            <br />
                            Make sure you trust this destination before proceeding.
                        </p>
                    </CardFooter>
                </Card>

                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <Globe className="h-4 w-4" />
                        <p>This redirect is provided by Devflare services</p>
                    </div>
                </div>
            </div>
        </div>
    );
}