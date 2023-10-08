import { getAllPosts } from "@/lib/api";
import PostPreview from "./components/PostPreview";
import HeaderBar from "@/components/ui/HeaderBar";
import Footer from "@/components/ui/Footer";

export const metadata = {
    title: 'NFC Orange | Blog'
}

export default async function page() {
    const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"])

    return (
        <>
            <HeaderBar />

            <main className="bg-secondary">
                <div className="pt-[12vh] pb-8 mx-8">
                    <h1 className="mb-10 text-4xl font-bold">Blog</h1>

                    <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-32 gap-8">
                        {posts.map((post, index) => (
                            <PostPreview key={index} post={post} />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}