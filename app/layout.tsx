import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import {Toaster} from "@/components/ui/sonner";

const workSans = localFont({
    src: [
        {
            path :'./fonts/WorkSans-Black.ttf',
            weight: '900',
            style: 'normal',
        }, {
            path :'./fonts/WorkSans-ExtraBold.ttf',
            weight: '800',
            style: 'normal',
        }, {
            path :'./fonts/WorkSans-Bold.ttf',
            weight: '700',
            style: 'normal',
        }, {
            path :'./fonts/WorkSans-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        }, {
            path :'./fonts/WorkSans-Medium.ttf',
            weight: '500',
            style: 'normal',
        }, {
            path :'./fonts/WorkSans-Regular.ttf',
            weight: '400',
            style: 'normal',
        }, {
            path :'./fonts/WorkSans-Thin.ttf',
            weight: '300',
            style: 'normal',
        }, {
            path :'./fonts/WorkSans-ExtraLight.ttf',
            weight: '200',
            style: 'normal',
        },
    ],
    variable :'--font-work-sans',
});
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "YC Directory",
    description: "Pitch, Vote and Grow",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={workSans.variable}
        >
        {children}
        <Toaster/>
        </body>
        </html>
    );
}
