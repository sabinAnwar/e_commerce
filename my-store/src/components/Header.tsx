function Header() {
  return (
    <header className="bg-blue-600 text-white px-6 py-4 justify-between items-center">
      <h1 className="text-2xl font-bold">My Store</h1>
      <nav className="flex gap-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/products" className="hover:underline">
          Products
        </a>
        <a href="/about" className="hover:underline">
          About
        </a>
      </nav>
    </header>
  );
}
export default Header;
