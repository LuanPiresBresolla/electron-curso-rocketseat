import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<h1>Backend</h1><p>Esse é um conteúdo sobre backend.</p>',
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: '',
      },
    },
  })

  return <EditorContent className="w-[65ch]" editor={editor} />
}
