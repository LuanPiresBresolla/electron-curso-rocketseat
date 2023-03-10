import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'

export interface IContentUpdateParams {
  title: string
  content: string
}

interface IEditorProps {
  content: string
  onContentUpdated: (data: IContentUpdateParams) => Promise<void>
}

export function Editor({ content, onContentUpdated }: IEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ document: false }),
      Document.extend({ content: 'heading block*' }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Untitled',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
      }),
    ],
    content,
    onUpdate: async ({ editor }) => {
      const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/
      const parsedContent = editor.getHTML().match(contentRegex)?.groups

      const title = parsedContent?.title || 'Untitled'
      const content = parsedContent?.content || '<p></p>'
      await onContentUpdated({ title, content })
    },
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-invert prose-headings:mt-0',
      },
    },
  })

  return <EditorContent className="w-[65ch]" editor={editor} />
}
