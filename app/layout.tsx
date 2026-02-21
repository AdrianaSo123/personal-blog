import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
    title: "Adriana's Blog",
    description: 'Personal blog by Adriana.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <header className="site-header">
                    <nav className="nav-inner">
                        <Link href="/" className="nav-logo">
                            adriana<span className="logo-dot">.</span>
                        </Link>
                        <div className="nav-links">
                            <Link href="/" className="nav-link">Home</Link>
                            <Link href="/blog" className="nav-link">Blog</Link>
                        </div>
                    </nav>
                </header>

                <main className="main-content">{children}</main>

                <footer className="site-footer">
                    <p>© {new Date().getFullYear()} Adriana — Built with Next.js &amp; Markdown</p>
                </footer>
            </body>
        </html>
    );
}
