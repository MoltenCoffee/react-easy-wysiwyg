import { useCallback } from "react";
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

  return editor ? (
    <div className={`${styles.menu} rew-menu`} {...rest}>
      <div>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          {buttons.bold || <Bold />}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? styles.active : ""}
        >
          {buttons.italic || <Italic />}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? styles.active : ""}
        >
          {buttons.underline || <Underline />}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? styles.active : ""}
        >
          {buttons.strikethrough || <Strikethrough />}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? styles.active : ""}
        >
          {buttons.code || <Code />}
        </button>
        <button
          onClick={setLink}
          className={editor.isActive("link") ? styles.active : ""}
        >
          {buttons.link || <Link />}
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          {buttons.unlink || <Unlink />}
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? styles.active : ""
          }
        >
          {buttons.heading1 || <Heading1 />}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? styles.active : ""
          }
        >
          {buttons.heading2 || <Heading2 />}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? styles.active : ""
          }
        >
          {buttons.heading3 || <Heading3 />}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? styles.active : ""
          }
        >
          {buttons.heading4 || <Heading4 />}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? styles.active : ""
          }
        >
          {buttons.heading5 || <Heading5 />}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? styles.active : ""
          }
        >
          {buttons.heading6 || <Heading6 />}
        </button>
      </div>
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? styles.active : ""}
        >
          {buttons.bulletList || <List />}
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? styles.active : ""}
        >
          {buttons.orderedList || <ListOrdered />}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? styles.active : ""}
        >
          {buttons.codeBlock || <Code2 />}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? styles.active : ""}
        >
          {buttons.blockquote || <Quote />}
        </button>
        {/* <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? styles.active : ""}
        >
          {buttons.paragraph || <Pilcrow />}
        </button> */}
      </div>
      <div>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          {buttons.horizontalRule || <Minus />}
        </button>

        {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break // Like doing ctrl+enter
      </button> */}
      </div>
      <div>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          {buttons.undo || <Undo />}
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          {buttons.redo || <Redo />}
        </button>
      </div>
      <div>
        <button onClick={handleSave}>{buttons.save || <Save />}</button>
      </div>
    </div>
  ) : null;
};

export default Menu;
