import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import NoteEditor from "./NoteEditor";
import { NoteCard } from "./NoteCard";

type Topic = RouterOutputs["topic"]["getAll"][0];

const Content: React.FC = () => {
  const { data: sessionData } = useSession();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    }
  );

  // To Create a Topic
  const createTopic = api.topic.create.useMutation({
    onSuccess: async () => {
      await refetchTopics(); // !using the void keyword instead of await works 2
    },
  });

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deletNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-10">
      <div className="col-span-1 max-w-xl px-2">
        <input
          type="text"
          placeholder="New Topic"
          className="input-bordered input input-md w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: e.currentTarget.value,
              });

              e.currentTarget.value = "";
            }
          }}
        />
        <div className="divider"></div>
        <ul className={`menu rounded-box w-full bg-slate-900 p-2`}>
          {topics?.map((topic) => {
            return (
              <li key={topic.id} className={`my-2`}>
                <Link
                  href="#"
                  className={`${selectedTopic === topic ? "bg-slate-800" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTopic(topic);
                  }}
                >
                  {topic.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-span-3">
        <div>
          {notes?.map((note) => {
            return (
              <div key={note.id} className="mt-5">
                <NoteCard
                  note={note}
                  onDelete={() => deletNote.mutate({ id: note.id })}
                />
              </div>
            );
          })}
        </div>
        <NoteEditor
          onSave={({ title, content }) => {
            void createNote.mutate({
              title,
              content,
              toppicId: selectedTopic?.id ?? "",
            });
          }}
        />
      </div>
    </div>
  );
};

export default Content;
