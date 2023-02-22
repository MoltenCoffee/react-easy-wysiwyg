import { useCallback, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import UniqueId from "tiptap-unique-id";

import Menu from "./Menu";

import styles from "./Editor.module.scss";

const Editor = ({
  content,
  onSave,
  exportHTML = false,
  editable = true,
  showWordCount = true,
  className,
  buttons = {},
  labels = {
    url: "URL",
    save: "Save",
  },
  onLinkClick,
  ...rest
}) => {
  const [urlFieldState, setUrlFieldState] = useState(null);
  const inputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
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
      ...(showWordCount ? [CharacterCount.configure()] : []),
    ],
    editable,
    content,
    onFocus: () => {
      setUrlFieldState(null);
    },
  });

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, [inputRef.current]);

  const handleSave = useCallback(() => {
    onSave?.(exportHTML ? editor.getHTML() : editor.getJSON());
  }, [exportHTML, editor, onSave]);

  const setLink = useCallback(
    (url) => {
      setUrlFieldState(null);

      // empty
      if (!url) {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
    [editor]
  );

  const handleLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    setUrlFieldState({ url: previousUrl });
  }, [editor]);

  const handleClick = useCallback(
    (e) => {
      if (e.target.tagName === "A") {
        if (onLinkClick) {
          onLinkClick(e);
        } else {
          e.preventDefault();
          e.stopPropagation();
          if (e.ctrlKey || e.metaKey) {
            window.open(e.target.href, "_blank");
          }
        }
      }
    },
    [onLinkClick]
  );

  return (
    <div className={`${styles.container} rew-container`}>
      {editable && (
        <Menu
          editor={editor}
          buttons={buttons}
          handleLink={handleLink}
          handleSave={handleSave}
          labels={labels}
        />
      )}
      {urlFieldState && (
        <label className={styles.urlBar}>
          <span>{labels.url}</span>
          <input
            name="url"
            defaultValue={urlFieldState?.url}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            ref={inputRef}
          />
          <button onClick={() => setLink(inputRef.current.value)}>
            {labels.save}
          </button>
        </label>
      )}
      <EditorContent
        editor={editor}
        className={`${styles.wrapper} rew-wrapper${
          className ? ` ${className}` : ""
        }`}
        onClick={handleClick}
        {...rest}
      />
      {editable && showWordCount && (
        <div className={styles.wordCounter}>
          {editor?.storage.characterCount.words()}
        </div>
      )}
    </div>
  );
};

export default Editor;
