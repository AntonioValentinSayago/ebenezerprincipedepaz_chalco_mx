interface Props {
  open: boolean;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  memberName: string;
}

export const MemberConfirmationModal = ({
  open,
  loading,
  onCancel,
  onConfirm,
  memberName,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">
          Confirmar Registro
        </h2>

        <p>
          ¿Desea registrar a:
        </p>

        <p className="font-semibold mt-2">
          {memberName}
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 border rounded-lg py-2"
          >
            Cancelar
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="flex-1 bg-emerald-600 text-white rounded-lg py-2"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};