import React, { useEffect, useState, useCallback } from 'react';
import { fetchProducts } from '../api/productsApi';
import { Product } from '../types/Product';
import Loading from './Loading';
import Error from './Error';
import ProductGrid from './ProductGrid';

const REFRESH_INTERVAL = 10000; // 10 seconds

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0); // for background refresh

  const fetchAndSetProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e: any) {
      setError(e.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and refresh on retry
  useEffect(() => {
    fetchAndSetProducts();
  }, [refreshKey, fetchAndSetProducts]);

  // Background refresh
  useEffect(() => {
    const interval = setInterval(() => {
      fetchProducts()
        .then(data => {
          setProducts(currentProducts => {
            // Only update if data has changed
            if (JSON.stringify(currentProducts) !== JSON.stringify(data)) {
              return data;
            }
            return currentProducts;
          });
        })
        .catch(() => {
          // Silently ignore, don't update error state for background refresh
        });
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handleRetry = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <main className="catalog">
      <h1 className="catalog__title">Product Catalog</h1>
      {loading && <Loading />}
      {error && <Error message={error} onRetry={handleRetry} />}
      {!loading && !error && (
        <ProductGrid products={products} />
      )}
    </main>
  );
};

export default ProductCatalog;
