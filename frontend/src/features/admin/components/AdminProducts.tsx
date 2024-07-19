import ProductsTable from "./ProductsTable";
import SearchProductsTable from "./SearchProductsTable";

const AdminProducts = () => {
  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-auto p-5">
      <SearchProductsTable />
      <ProductsTable />
    </div>
  );
};
export default AdminProducts;
