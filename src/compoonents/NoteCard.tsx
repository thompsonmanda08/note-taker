import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { type RouterOutputs } from "~/utils/api";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="card my-5 border border-gray-700 bg-slate-800 shadow-2xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${isExpanded ? "collapse-open" : ""}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
          <div className="collapse-content">
            <article className="prose lg:prose-xl">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
          <div className="card-action mx-2 flex justify-end">
            <button className="btn-error btn-sm btn px-5" onClick={onDelete}>
              Delete Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
