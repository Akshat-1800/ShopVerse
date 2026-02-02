"use client";

import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch products");
        }

        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete product");
      }

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  /* ---------- RENDER STATES ---------- */

  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="p-6">No products found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products List</h1>

      {products.map((product) => (
        <div
          key={product._id}
          className="border p-3 rounded flex justify-between items-center mb-2"
        >
          <span>{product.name}</span>

          <button
            onClick={() => handleDelete(product._id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
