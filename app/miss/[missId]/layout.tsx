
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`flex flex-col items-center min-h-screen pb-20 gap-6 sm:p-20`}
      >
        {children}
      </body>
    </html>
  );
}
