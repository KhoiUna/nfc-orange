import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "./markdown.module.css";
import { Metadata, ResolvingMetadata } from 'next'
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import HeaderBar from "@/components/ui/HeaderBar";
import Footer from "@/components/ui/Footer";
import Image from "next/image";

export async function generateMetadata(
    { params }: { params: { slug: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const post = getPostBySlug(params.slug, ["title", "author", "excerpt", "content", "coverImage"])

    let og = (await parent).openGraph!
    og = {
        ...og,
        description: post.excerpt,
        images: [
            {
                url: post.coverImage,
                width: 512,
                height: 512,
            }
        ]
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: og as OpenGraph,
    }
}

export default async function Post({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug, ["title", "author", "content", 'coverImage'])

    const content = await markdownToHtml(post.content || '')

    return (
        <>
            <HeaderBar />

            <main className="bg-secondary">
                <div className="pt-[15vh] pb-8 mx-8">
                    <div className="max-w-[800px] m-auto">
                        <p className="text-3xl font-bold">{post.title}</p>
                        <p className="text-slate-800 text-lg font-semibold py-3">{post.author}</p>

                        <Image
                            className="max-w-[300px] mx-auto rounded-lg"
                            alt={`Cover image for ${post.title}`}
                            src={post.coverImage}
                            width={300}
                            height={300}
                        />

                        <div
                            className={markdownStyles["markdown"]}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
