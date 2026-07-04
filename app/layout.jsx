import Script from "next/script";
import { Providers } from "./providers";
import { DEFAULT_COLOR } from "@/lib/constants";
import "@/styles/index.scss";
import "@/styles/App.scss";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  metadataBase: new URL("https://zijemevzidech.cz"),
  title: "Žijeme v Židech",
  description: "Spolek pro rozvoj Židovské čtvrti v Třebíči",
  openGraph: {
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <head>
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </head>
      <body>
        <noscript>
          <h1>✡︎ Žijeme v Židech</h1>
          <p>Spolek pro rozvoj Židovské čtvrti v Třebíči</p>
        </noscript>
        <Providers>{children}</Providers>
        <Script id="theme-vars" strategy="beforeInteractive">
          {`
            window.defaultColor = "${DEFAULT_COLOR}";
            window.apiKey = "${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyATJtmaYHWXJ3zXaYCexj4mfn_sjVIuJtk"}";
            (function(name, rules) {
              var style = document.createElement('style');
              style.type = 'text/css';
              document.getElementsByTagName('head')[0].appendChild(style);
              if (!(style.sheet || {}).insertRule)
                (style.styleSheet || style.sheet).addRule(name, rules);
              else
                style.sheet.insertRule(name + "{" + rules + "}", 0);
            })('a', "color: " + window.defaultColor + ";");
            (function(name, rules) {
              var style = document.createElement('style');
              style.type = 'text/css';
              document.getElementsByTagName('head')[0].appendChild(style);
              if (!(style.sheet || {}).insertRule)
                (style.styleSheet || style.sheet).addRule(name, rules);
              else
                style.sheet.insertRule(name + "{" + rules + "}", 0);
            })('footer', "background-color: " + window.defaultColor + ";");
            (function(name, rules) {
              var style = document.createElement('style');
              style.type = 'text/css';
              document.getElementsByTagName('head')[0].appendChild(style);
              if (!(style.sheet || {}).insertRule)
                (style.styleSheet || style.sheet).addRule(name, rules);
              else
                style.sheet.insertRule(name + "{" + rules + "}", 0);
            })(".App .nav-bar .nav-link", "border-bottom: 1px dashed " + window.defaultColor + ";color: " + window.defaultColor + ";");
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-STPE6N1MJQ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-STPE6N1MJQ');
          `}
        </Script>
        <Script src="/fslightbox.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
