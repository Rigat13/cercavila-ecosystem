
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className='p-4 border-2 border-gray-500'>
         {children}
      </div>
  );
}
