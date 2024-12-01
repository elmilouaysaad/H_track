import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Smart Logistics Platform</h1>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/inventory">Inventory</Link></li>
            <li><Link href="/routes">Routes</Link></li>
            <li><Link href="/forecast">Forecast</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
