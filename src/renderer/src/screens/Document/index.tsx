import { ToC } from '../../components/ToC'
import { Editor } from '../../components/Editor'

export function Document() {
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
        <Editor />
      </section>
    </main>
  )
}
