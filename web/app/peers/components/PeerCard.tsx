import Image from "next/image";

interface Props {
    student: {
        avatar_url?: string
        first_name: string
        middle_name?: string
        last_name: string
        university_name: string
        major: string
    }
}

export default function PeerCard({ student }: Props) {
    return (
        <div className="bg-slate-50 rounded-lg my-4 mx-auto p-4 flex items-center hover:drop-shadow-lg w-[350px] sm:w-[400px] h-[150px]">
            <div className="rounded-lg border-r-2 border-slate-300 pr-8">
                <Image
                    className="m-auto w-[60px] h-[60px] rounded-[100%] border-2 border-primary object-scale-down"
                    src={student.avatar_url
                        || `https://api.dicebear.com/5.x/initials/png?seed=${student.first_name} ${student.last_name}`
                    } alt={`${student.first_name} ${student.last_name}'s profile picture`} width={500} height={500} />
            </div>

            <div className="pl-5">
                <p className="font-bold">{student.first_name} {student.middle_name} {student.last_name}</p>

                <p><b>Major:</b> {student.major}</p>

                <p className="py-2">{student.university_name}</p>
            </div>
        </div>
    )

}