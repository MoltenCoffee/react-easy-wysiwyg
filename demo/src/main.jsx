import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Editor from "../../dist/index";

import "../../dist/styles.css";
import styles from "./main.module.scss";

const Page = () => {
  const [content, setContent] = useState({
    __html: `
      <h1>React Easy WYSIWYG Demo</h1>
      <p>A simple, convenient wrapper around Tiptap, using Lucide icons.</p>
      <p>Change and save to update this view!</p>
    `,
  });

  return (
    <div className={styles.container}>
      <div dangerouslySetInnerHTML={content} />
      <Editor
        content={content.__html}
        exportHTML={true}
        onSave={(html) => setContent({ __html: html })}
      />
    </div>
  );
};

ReactDOM.createRoot(document.body).render(<Page />);
