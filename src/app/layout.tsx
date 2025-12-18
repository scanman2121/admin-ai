import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Inter, Roboto } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { siteConfig } from "./siteConfig"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://yoururl.com"),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [],
  authors: [
    {
      name: "yourname",
      url: "",
    },
  ],
  creator: "yourname",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
}

// Simple toast component
function ToastContainer() {
  return (
    <div id="toast-container" className="fixed bottom-4 left-4 z-50">
      {/* Toast messages will be dynamically added here */}
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Remove dark class if present and prevent system preference detection
                if (document.documentElement.classList.contains('dark')) {
                  document.documentElement.classList.remove('dark');
                }
                // Ensure light mode is always applied
                document.documentElement.setAttribute('data-theme', 'light');
              })();
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen font-sans text-gray-900 antialiased bg-[#F6F7F8]",
          inter.variable,
          roboto.variable,
        )}
      >
        <ThemeProvider defaultTheme="light" forcedTheme="light" attribute="class" enableSystem={false}>
          {children}
          <ToastContainer />
        </ThemeProvider>
        {/* Initialize toast system */}
        <Script id="toast-init">
          {`
            // Clear any existing error toasts on page load
            window.addEventListener('load', () => {
              const container = document.getElementById('toast-container');
              if (container) {
                container.innerHTML = '';
              }
            });
          `}
        </Script>

        {/* UserGuiding integration */}
        <Script
          id="userguiding"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(g,u,i,d,e,s){g[e]=g[e]||[];var f=u.getElementsByTagName(i)[0];var k=u.createElement(i);k.async=true;k.src='https://static.userguiding.com/media/user-guiding-'+s+'-embedded.js';f.parentNode.insertBefore(k,f);if(g[d])return;var ug=g[d]={q:[]};ug.c=function(n){return function(){ug.q.push([n,arguments])};};var m=['previewGuide','finishPreview','track','identify','hideChecklist','launchChecklist'];for(var j=0;j<m.length;j+=1){ug[m[j]]=ug.c(m[j]);}})(window,document,'script','userGuiding','userGuidingLayer','IQU108350M0ZID');
            `,
          }}
        />
      </body>
    </html>
  )
}
