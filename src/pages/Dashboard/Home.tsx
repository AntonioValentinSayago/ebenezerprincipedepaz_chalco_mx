import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Iglesia Ebenezer Principe de Paz Chalco MX - Dashboard"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12">
          <ComponentCard title="Miembros Activos bajo Cobertura">
            <BasicTableOne />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
