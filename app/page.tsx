import Header from "@/components/Header";
import ProductLanding from "@/components/ProductLanding/ProductLanding";

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <ProductLanding />
      </div>
    </>
  );
}
