import { ToC } from '../../components/ToC'
import { Editor, IContentUpdateParams } from '../../components/Editor'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { IDocument } from '@shared/types/ipc'

export function Document() {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery(['document', id], async () => {
    const response = await window.api.findDocument({ id: id! })
    return response.data
  })

  const { mutateAsync: saveDocument } = useMutation(
    async ({ title, content }: IContentUpdateParams) => {
      await window.api.saveDocument({ id: id!, title, content })
    },
    {
      onSuccess: (_, { title }) => {
        queryClient.setQueriesData<IDocument[]>(['documents'], (documents) => {
          return documents?.map((document) => {
            if (document.id === id) {
              return { ...document, title }
            }

            return document
          })
        })
      },
    },
  )

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content || '<p></p>'}`
    }
    return ''
  }, [data])

  async function handleUpdateDocument({
    content,
    title,
  }: IContentUpdateParams) {
    await saveDocument({ content, title })
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs uppercase">
          Table of Content
        </span>

        <ToC.Root>
          <ToC.Link>Backend</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco de dados</ToC.Link>
            <ToC.Link>Estrutura</ToC.Link>
            <ToC.Link>Docker</ToC.Link>
          </ToC.Section>

          <ToC.Link>Frontend</ToC.Link>
          <ToC.Section>
            <ToC.Link>React</ToC.Link>
            <ToC.Link>Styles</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor
            content={initialContent}
            onContentUpdated={handleUpdateDocument}
          />
        )}
      </section>
    </main>
  )
}
