import React, { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { dracula } from "@uiw/codemirror-theme-dracula";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  function resetFields() {
    setTitle("");
    setCode("");
  }

  return (
    <div className="card border border-gray-700 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note Title"
            className="input-group-lg input-primary input w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <CodeMirror
          value={code}
          width={"300px"}
          color="red"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="whitespace-pre-wrap break-words rounded-md border border-slate-600"
          theme={dracula}
        />
      </div>
      <div className="card-actions justify-end">
        <button
          className="btn-primary btn mb-5 mr-8 w-32"
          onClick={() => {
            onSave({
              title,
              content: code,
            });
            resetFields();
          }}
          disabled={title.trim().length === 0 && code.trim.length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
