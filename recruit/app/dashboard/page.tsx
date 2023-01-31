"use client";

import TextLoader from "@/components/ui/TextLoader";
import useAuth from "../../lib/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import greetUser from "../../lib/greetUser";

type Student = {
  first_name: string;
  middle_name?: string;
  last_name: string;
  university_name: string;
  url: string;
};

export default function Dashboard() {
  useAuth({});

  const { data: students } = useQuery<any, any, Student[], any>({
    queryKey: ["fetchedStudents"],
    queryFn: () => axios.get("/api/dashboard").then((res) => res.data.success),
    refetchInterval: 1000
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => axios.get("/api/profile").then((res) => res.data.success),
  });

  if (!students || !profile)
    return (
      <div className="text-[1.8rem] text-center m-5">
        <TextLoader loadingText="Loading" />
      </div>
    );

  return (
    <div>
      <h1 className="text-xl mx-5 my-7">
        {greetUser(profile.first_name || "")}
      </h1>

      <div>
        <h2 className="text-2xl font-bold mx-5 mt-12 mb-4">
          Saved {"students'"} profile: {students.length}
        </h2>

        {students.length === 0 && (
          <p className="mx-5 text-slate-500">No student profiles been saved</p>
        )}
        {students.map((student: Student, index) => (
          <div key={index} className="bg-slate-50 rounded-lg m-3 p-4">
            <p className="text-lg font-bold">
              {student.first_name} {student.middle_name} {student.last_name}
            </p>

            <p className="py-1">{student.university_name}</p>

            <a href={student.url} target="_blank" rel="noreferrer">
              <p className="pt-1 underline font-semibold text-blue-700">
                View Resume
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
