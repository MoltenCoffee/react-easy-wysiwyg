import { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import UniqueId from "tiptap-unique-id";

import Menu from "./Menu";

import styles from "./Editor.module.scss";

const Editor = ({
  content,
  onSave,
  exportHTML = false,
  editable = true,
  buttons = {},
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Underline,
      UniqueId.configure({
        attributeName: "id",
        types: [
          "paragraph",
          "heading",
          "orderedList",
          "bulletList",
          "listItem",
        ],
        createId: () => window.crypto.randomUUID(),
      }),
    ],
    editable,
    content,
  });

  const handleSave = useCallback(() => {
    onSave(exportHTML ? editor.getHTML() : editor.getJSON());
  }, [exportHTML, editor, onSave]);

  return (
    <div className={`${styles.container} rew-container`}>
      {editable && (
        <Menu editor={editor} buttons={buttons} handleSave={handleSave} />
      )}
      <EditorContent editor={editor} className={`${styles.wrapper} rew-wrapper`} />
    </div>
  );
};

export default Editor;
