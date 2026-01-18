import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "PromptVerse",
  description: "Prompt search platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grid-bg" suppressHydrationWarning>
        <Providers>{children}</Providers>
        <div id="modal-root" />
      </body>
    </html>
  );
}
