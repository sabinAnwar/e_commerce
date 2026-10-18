import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}
interface MainProps {
  products: Product[];
}
function Main({ products }: MainProps) {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            category={product.category}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
