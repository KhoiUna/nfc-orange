"use client";

import TextLoader from "@/components/ui/TextLoader";
import useAuth from "../../lib/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import greetUser from "../../lib/greetUser";
// import { Howl } from 'howler';
// import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./components/SearchBar";
import { SyntheticEvent, useState } from "react";

type Student = {
  student_id: number
  first_name: string;
  middle_name?: string;
  last_name: string;
  avatar_url?: string;
  major: string;
  university_name: string;
  pdf_url?: string;
  symplicity_url?: string
};

export default function Dashboard() {
  useAuth({});

  const [studentsSearched, setStudentsSearched] = useState<Student[] | null>(null)
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

  const searchStudents = (event: SyntheticEvent) => {
    const searchValue = (event.target as HTMLInputElement).value
    if (searchValue.trim().length === 0) return setStudentsSearched(null)

    let searchValueArray = searchValue.trim().toLowerCase().split(' ')

    const studentArray = students.filter((student) => {
      const stringToSearch = student.first_name + student.middle_name + student.last_name + student.major + student.university_name

      for (let index = 0; index < searchValueArray.length; index++) {
        const string = searchValueArray[index]

        if (stringToSearch.toLowerCase().indexOf(string) < 0) return false

        // Remove the first phrase since it is already matched
        if (searchValueArray.length > 1) searchValueArray = searchValueArray.slice(index + 1, searchValueArray.length)
        return true
      }
    })

    setStudentsSearched(studentArray)
  }

  const studentsToMap = studentsSearched || students

  return (
    <div>
      <h1 className="text-xl mx-5 my-7">
        {greetUser(profile.first_name || "")}
      </h1>

      <div>
        <SearchBar searchStudents={searchStudents} />
        <p className="mx-3 mt-2 text-sm text-slate-500">Total: {studentsToMap.length}</p>

        {students.length === 0 && (
          <p className="mx-5 text-slate-500">No student profiles been saved</p>
        )}
        <div className="flex flex-wrap">
          {studentsToMap.map((student: Student, index: number) => (
            <div key={index} className="bg-slate-50 rounded-lg mx-3 my-4 p-4 flex items-center hover:drop-shadow-lg w-[400px]">
              <div className="rounded-lg border-r-2 border-slate-300 pr-8">
                <Image
                  className="m-auto w-[70px] h-[70px] rounded-[100%] border-2 border-primary object-scale-down"
                  src={student.avatar_url
                    || `https://api.dicebear.com/5.x/initials/png?seed=${student.first_name} ${student.last_name}`
                  } alt={`${student.first_name} ${student.last_name}'s profile picture`} width={500} height={500} />
              </div>

              <div className="pl-5">
                <p className="font-bold">
                  {student.first_name} {student.middle_name} {student.last_name}
                </p>

                <p>
                  <b>Major:</b> {student.major}
                </p>

                <p className="py-2">{student.university_name}</p>


                <a className="block w-fit" href={student.symplicity_url || student.pdf_url} target="_blank" rel="noreferrer">
                  <p className="pt-2 underline font-semibold text-blue-700">
                    View Resume
                  </p>
                </a>

                <Link href={`/note/${student.student_id}`}>
                  <button className="bg-primary p-2 text-white rounded-lg drop-shadow-lg ml-[-4px] mt-2">
                    <p className="font-semibold">View / Add Note</p>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
