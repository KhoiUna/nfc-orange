"use client";

import TextLoader from "@/components/ui/TextLoader";
import useAuth from "../../lib/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import greetUser from "../../lib/greetUser";
import { Howl } from 'howler';
import { useState } from "react";
import Image from "next/image";

type Student = {
  first_name: string;
  middle_name?: string;
  last_name: string;
  avatar_url?: string;
  university_name: string;
  url: string;
};

export default function Dashboard() {
  useAuth({});

  // const [cachedStudents, setCachedStudents] = useState([])

  const { data: students } = useQuery<any, any, Student[], any>({
    queryKey: ["fetchedStudents"],
    queryFn: () => axios.get("/api/dashboard").then((res) => {
      // TODO: add notification sound
      // if (res.data.success.length > cachedStudents.length && cachedStudents.length > 0) {
      //   const notificationSound = new Howl({
      //     src: ["notification-sound.mp3"]
      //   });
      //   notificationSound.play()
      //   setTimeout(() => notificationSound.stop(), 1000)
      // }
      // setCachedStudents(res.data.success)

      return res.data.success
    }),
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
          <div key={index} className="bg-slate-50 rounded-lg m-3 p-4 flex items-center">
            <div className="rounded-lg border-r-2 border-slate-300 pr-8">
              <Image
                className="m-auto w-[70px] h-[70px] rounded-[100%] border-2 border-primary object-scale-down"
                src={student.avatar_url
                  || `https://api.dicebear.com/5.x/initials/png?seed=${student.first_name} ${student.last_name}`
                } alt={`${student.first_name} ${student.last_name}'s profile picture`} width={500} height={500} />
            </div>

            <div className="pl-5">
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
          </div>
        ))}
      </div>
    </div>
  );
}
