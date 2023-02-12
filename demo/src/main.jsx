import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Editor from "../../dist/index.js";

import "../../dist/styles.css";
import styles from "./main.module.scss";

const Page = () => {
  const [content, setContent] = useState({
    __html: `
      <h1>React Easy WYSIWYG Demo</h1>
    `,
  });

  const buttons = {
    bold: "B",
    italic: "I",
    underline: "U",
    strikethrough: "S",
    heading1: "H1",
    heading2: "H2",
    heading3: "H3",
    heading4: "H4",
    heading5: "H5",
    heading6: "H6",
    code: "C",
    bulletList: "L",
    orderedList: "LO",
    codeBlock: "CB",
    blockquote: "BQ",
    horizontalRule: "M",
    undo: "U",
    redo: "R",
    link: "L",
    unlink: "UL",
  };

  return (
    <div className={styles.container}>
      <div dangerouslySetInnerHTML={content} />
      <Editor
        content={content.__html}
        exportHTML={true}
        onSave={(html) => setContent({ __html: html })}
        buttons={buttons}
      />
    </div>
  );
};

ReactDOM.createRoot(document.body).render(<Page />);
