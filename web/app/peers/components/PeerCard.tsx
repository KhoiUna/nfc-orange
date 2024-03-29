import Image from "next/image";
import { Peer } from "../../../types/types";

interface Props {
    student: Peer
}

export default function PeerCard({ student }: Props) {
    return (
        <div className="bg-slate-50 rounded-lg my-4 mx-4 px-4 flex items-center hover:drop-shadow-lg w-[350px] sm:w-[400px] h-[180px]">
            <div className="rounded-lg border-r-2 border-slate-300 pr-8">
                <Image
                    loading="lazy"
                    className="m-auto w-[60px] h-[60px] rounded-[100%] border-2 border-primary object-scale-down"
                    src={student.avatar_url
                        || `https://api.dicebear.com/5.x/initials/png?seed=${student.first_name} ${student.last_name}`
                    } alt={`${student.first_name} ${student.last_name}'s profile picture`} width={500} height={500} />
            </div>

            <div className="pl-5">
                <p className="font-bold">{student.first_name} {student.middle_name} {student.last_name}</p>

                <p><b>Major:</b> {student.major}</p>

                <p className="pt-2">{student.university_name}</p>
            </div>
        </div>
    )

}