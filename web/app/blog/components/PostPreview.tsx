import DateFormatter from "./DateFormatter";
import Image from "next/image";
import Link from "next/link";

type Items = {
    [key: string]: string;
};

export default function PostPreview({ post }: { post: Items }) {
    return (
        <div className="w-[300px]">
            <Link href={`/blog/${post.slug}`}>
                {post?.coverImage && (
                    <Image
                        className="w-full rounded-lg"
                        alt={`Cover image for ${post.title}`}
                        src={post.coverImage}
                        width={300}
                        height={300}
                    />
                )}
                <div className="mt-4 space-y-2">
                    <p className="font-semibold text-xl group-hover:underline">
                        {post.title}
                    </p>
                    <DateFormatter dateString={post.date} />
                    <p>{post.excerpt}</p>
                </div>
            </Link>
        </div>
    );
}
