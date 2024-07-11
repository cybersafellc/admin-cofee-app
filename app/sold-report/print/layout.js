export const metadata = {
  title: "Cofee App",
  description: "Panel Private Cofee App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </head>
      <body className="hidden sm:block">{children}</body>
    </html>
  );
}
