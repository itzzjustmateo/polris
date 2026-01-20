"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ExternalLink, Globe, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function RedirectPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);
    const [progress, setProgress] = useState(0);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const targetUrl = "https://panel.devflare.de";
    const hasRedirected = useRef(false);

    // Separate effect for countdown timer
    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setTimeout(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown]);

    // Separate effect for handling redirect when countdown reaches 0
    useEffect(() => {
        if (countdown === 0 && !hasRedirected.current) {
            hasRedirected.current = true;
            window.location.replace(targetUrl);
        }
    }, [countdown]);

    // Progress bar animation
    useEffect(() => {
        const totalDuration = 5000;
        const steps = 100;
        const stepDuration = totalDuration / steps;

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + (100 / steps);
            });
        }, stepDuration);

        return () => clearInterval(progressInterval);
    }, []);

    const handleManualRedirect = () => {
        if (hasRedirected.current) return;
        hasRedirected.current = true;
        setIsRedirecting(true);
        window.location.replace(targetUrl);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <Card className="shadow-2xl border-border/50 backdrop-blur-sm">
                    <CardHeader className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="p-3 rounded-full bg-accent/20 ring-1 ring-accent/30">
                                <div className="relative w-14 h-14">
                                    <Image
                                        src="https://panel.devflare.de/attachments/696e3380370a1_DevFlare_Logo__PNG_.png"
                                        alt="DevFlare Logo"
                                        fill
                                        className="object-contain"
                                        unoptimized
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-foreground">
                            {isRedirecting ? "Redirecting..." : "Redirecting to Devflare Panel"}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            {isRedirecting
                                ? "Please wait while we take you to the Devflare management panel"
                                : "You are being redirected to the Devflare management panel"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Redirecting in:</span>
                                <span className="font-semibold text-primary font-mono">
                                    {isRedirecting ? "Now" : `${countdown} second${countdown !== 1 ? 's' : ''}`}
                                </span>
                            </div>
                            <Progress
                                value={progress}
                                className="h-2 bg-muted"
                                aria-label="Redirect progress"
                            />
                        </div>

                        <div className="rounded-lg bg-accent/10 p-4 border border-accent/20 ring-1 ring-accent/10">
                            <div className="flex items-start gap-3">
                                <ExternalLink className="h-5 w-5 text-accent-foreground mt-0.5 shrink-0" />
                                <div className="flex-1 min-w-0 space-y-1">
                                    <p className="text-sm font-medium text-foreground">Destination URL:</p>
                                    <p className="text-sm text-muted-foreground break-all font-mono">
                                        {targetUrl}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-foreground">Security Information:</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <div className="h-2 w-2 rounded-full bg-chart-2 shrink-0"></div>
                                    <span>Secure HTTPS connection</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <div className="h-2 w-2 rounded-full bg-chart-2 shrink-0"></div>
                                    <span>Official Devflare domain</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <div className="h-2 w-2 rounded-full bg-chart-2 shrink-0"></div>
                                    <span>SSL/TLS encrypted</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <Button
                            onClick={handleManualRedirect}
                            disabled={isRedirecting}
                            className="w-full"
                            size="lg"
                        >
                            {isRedirecting ? (
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
                            disabled={isRedirecting}
                            className="w-full"
                        >
                            Go Back
                        </Button>

                        <p className="text-xs text-muted-foreground text-center pt-4">
                            {isRedirecting
                                ? "You are being redirected. Please do not close this window."
                                : "If you are not redirected automatically, click the button above."}
                            <br />
                            Make sure you trust this destination before proceeding.
                        </p>
                    </CardFooter>
                </Card>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                        <Globe className="h-4 w-4 shrink-0" />
                        <p>This redirect is provided by Devflare services</p>
                    </div>
                </div>
            </div>
        </div>
    );
}