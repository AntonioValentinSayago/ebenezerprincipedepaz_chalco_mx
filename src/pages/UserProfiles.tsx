import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import MemberProfileDashboard from "../components/UserProfile/UserMetaCard";
import { getUserEbenezerById } from "../api/DevEbenezerApi";

export default function UserProfiles() {
  const { id } = useParams<{ id: string }>();
  const memberId = Number(id); // Convert the id to a number

  const {
    data: memberData,
    isLoading,
    isError,
    error,
  } = useQuery<any, Error>({
    queryKey: ["member", memberId],
    queryFn: () => getUserEbenezerById(memberId),
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!memberId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Cargando perfil...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-red-500">
          {error instanceof Error ? error.message : "Error al cargar el perfil"}
        </p>
      </div>
    );
  }

  if (!memberData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          No se encontró información del miembro.
        </p>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Perfil" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <MemberProfileDashboard memberData={memberData} />
        </div>
      </div>
    </>
  );
}
