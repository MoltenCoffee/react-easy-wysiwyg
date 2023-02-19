import { useCallback, useMemo } from "react";
import {
  Bold,
  Code,
  Code2,
  Italic,
  Strikethrough,
  // Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  Save,
  Underline,
  Link,
  Unlink,
} from "lucide-react";

import styles from "./Editor.module.scss";

const defaultButtons = {
  bold: <Bold />,
  italic: <Italic />,
  underline: <Underline />,
  strikethrough: <Strikethrough />,
  code: <Code />,
  link: <Link />,
  unlink: <Unlink />,
  heading1: <Heading1 />,
  heading2: <Heading2 />,
  heading3: <Heading3 />,
  heading4: <Heading4 />,
  heading5: <Heading5 />,
  heading6: <Heading6 />,
  bulletList: <List />,
  orderedList: <ListOrdered />,
  codeBlock: <Code2 />,
  blockquote: <Quote />,
  // paragraph: <Pillcrow />,
  horizontalRule: <Minus />,
  undo: <Undo />,
  redo: <Redo />,
  save: <Save />,
};

const Menu = ({ editor, buttons = {}, handleSave, ...rest }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) return;

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const realButtons = useMemo(
    () => ({ ...defaultButtons, ...buttons }),
    [buttons]
  );

  return editor ? (
    <div className={`${styles.menu} rew-menu`} {...rest}>
      <div>
        {!!realButtons.bold && (
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            {realButtons.bold}
          </button>
        )}
        {!!realButtons.italic && (
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? styles.active : ""}
          >
            {realButtons.italic}
          </button>
        )}
        {!!realButtons.underline && (
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? styles.active : ""}
          >
            {realButtons.underline}
          </button>
        )}
        {!!realButtons.strikethrough && (
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? styles.active : ""}
          >
            {realButtons.strikethrough}
          </button>
        )}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? styles.active : ""}
        >
          {realButtons.code}
        </button>
        <button
          onClick={setLink}
          className={editor.isActive("link") ? styles.active : ""}
        >
          {realButtons.link}
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          {realButtons.unlink}
        </button>
      </div>
      <div>
        {!!realButtons.heading1 && (
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? styles.active : ""
            }
          >
            {realButtons.heading1}
          </button>
        )}
        {!!realButtons.heading2 && (
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? styles.active : ""
            }
          >
            {realButtons.heading2}
          </button>
        )}
        {!!realButtons.heading3 && (
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? styles.active : ""
            }
          >
            {realButtons.heading3}
          </button>
        )}
        {!!realButtons.heading4 && (
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? styles.active : ""
            }
          >
            {realButtons.heading4}
          </button>
        )}
        {!!realButtons.heading5 && (
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              editor.isActive("heading", { level: 5 }) ? styles.active : ""
            }
          >
            {realButtons.heading5}
          </button>
        )}
        {!!realButtons.heading6 && (
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
              editor.isActive("heading", { level: 6 }) ? styles.active : ""
            }
          >
            {realButtons.heading6}
          </button>
        )}
      </div>
      <div>
        {!!realButtons.bulletList && (
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? styles.active : ""}
          >
            {realButtons.bulletList}
          </button>
        )}
        {!!realButtons.orderedList && (
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? styles.active : ""}
          >
            {realButtons.orderedList}
          </button>
        )}
        {!!realButtons.codeBlock && (
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? styles.active : ""}
          >
            {realButtons.codeBlock}
          </button>
        )}
        {!!realButtons.blockquote && (
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? styles.active : ""}
          >
            {realButtons.blockquote}
          </button>
        )}
        {/* {!!realButtons.paragraph && (
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? styles.active : ""}
          >
            {realButtons.paragraph}
          </button>
        )} */}
      </div>
      <div>
        {!!realButtons.horizontalRule && (
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            {realButtons.horizontalRule}
          </button>
        )}
      </div>
      <div>
        {!!realButtons.undo && (
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            {realButtons.undo}
          </button>
        )}
        {realButtons.redo && (
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            {realButtons.redo}
          </button>
        )}
      </div>
      {!!realButtons.save && (
        <div>
          <button onClick={handleSave}>{realButtons.save}</button>
        </div>
      )}
    </div>
  ) : null;
};

export default Menu;
