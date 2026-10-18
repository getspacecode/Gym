"use client";

import { useApi } from "@/hooks/api";
import Loader from "../Loader";
import { useState } from "react";
import { TrashIcon } from "lucide-react";

export default function GymPlanDay({
  day,
  membership,
}: {
  day: string;
  membership: string;
}) {
  const [adding, setAdding] = useState(false);
  const [newExercise, setNewExercies] = useState("");
  const {
    mutate: addExercise,
    error: addExerciseError,
    isPending: addingExercise,
  } = useApi.post("exercise", "/exercise/add");
  const {
    data: exercises,
    error: exercisesError,
    isLoading: exercisesLoading,
  } = useApi.get<
    { day: string; membership: string; name: string; id: string }[]
  >("exercise", `/exercise/${membership}`, { enabled: !!membership });
  const {
    mutate: deleteExercise,
    error: deleteExerciseError,
    isPending: deletingExercise,
  } = useApi.delete("exercise", "/exercise/delete");
  if (addExerciseError) console.log(addExerciseError);
  if (exercisesError) console.log(exercisesError);
  if (deleteExerciseError) console.log(deleteExerciseError);
  if (addingExercise || exercisesLoading || deletingExercise) return <Loader />;

  return (
    <div className="h-full">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-semibold flex justify-center">{day}</h1>
        <div className="flex gap-5">
          <button
            className="bg-primary px-4 rounded-lg p-2 hover:bg-primary-hover cursor-pointer"
            onClick={() => {
              if (newExercise == "") {
                setAdding(!adding);
              } else {
                addExercise({ name: newExercise, day: day, membership });
              }
            }}
          >
            Add Exercise
          </button>
          {adding && (
            <input
              className="bg-border rounded-lg outline-none border-transparent border-2 text-sm focus:border-primary p-2"
              onChange={(e) => setNewExercies(e.target.value)}
              maxLength={30}
            />
          )}
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-2">
        {exercises?.map((e, idx) => {
          if (e.day == day) {
            return (
              <div
                key={idx}
                className="flex justify-between  bg-border items-center rounded-md p-2"
              >
                <h1>{e.name}</h1>
                <button
                  className="rounded-full bg-red-600 p-2 cursor-pointer hover:bg-red-400"
                  onClick={() => deleteExercise({ id: e.id })}
                >
                  <TrashIcon />
                </button>
              </div>
            );
          }
        })}
        {exercises?.length === 0 && (
          <div className="text-muted text-center">
            Give yourself time to rest...
          </div>
        )}
      </div>
    </div>
  );
}
