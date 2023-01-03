import { IDocument } from '@shared/types/ipc'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'

export function CreatePage() {
  const queryClient = useQueryClient()

  const {
    isLoading: isCreatingNewDocument,
    mutateAsync: handleCreateDocument,
  } = useMutation(
    async () => {
      const response = await window.api.createDocument()
      return response.data
    },
    {
      onSuccess: (data) => {
        queryClient.setQueriesData<IDocument[]>(['documents'], (documents) => {
          if (documents && documents.length >= 0) {
            return [...documents, data]
          }

          return [data]
        })
      },
    },
  )

  return (
    <button
      disabled={isCreatingNewDocument}
      onClick={() => handleCreateDocument()}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Novo documento
    </button>
  )
}
