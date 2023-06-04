import ogs from 'open-graph-scraper'
import Image from "next/image"
import axios from 'axios'
import { parse } from 'node-html-parser';
import { Suspense } from 'react';

type JobItem = {
    name: string,
    tags: {
        title: string,
        color: string
    }[],
    url: string,
    text: string
}

const FALLBACK_ICON_URL = 'https://ik.imagekit.io/chekchat/www-icon_zUzwyf79x.png?updatedAt=1685905852569'
const imageURLToBase64 = async (href: string, url: string) => {
    try {
        try {
            new URL(url)
        } catch (error) {
            url = href + url
            console.log(href);

        }

        const { data } = await axios.get(url, {
            responseType: 'arraybuffer',
        })
        const imageBuffer = Buffer.from(data, 'binary');
        const base64Image = imageBuffer.toString('base64');

        return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
        return
    }
}
const fetchFavicon = async (url: string) => {
    try {
        const { html, result } = await ogs({ url })

        if (result.favicon) return await imageURLToBase64(url, result.favicon)

        if (html) {
            const root = parse(html);
            const faviconElement = root.querySelector('link[rel="shortcut icon"]');
            const faviconUrl = faviconElement?.getAttribute('href');
            if (faviconUrl) return await imageURLToBase64(url, faviconUrl)
        }

        if (result.ogImage && result.ogImage[0].url) return await imageURLToBase64(url, result.ogImage[0].url)
    } catch (error) {
        return
    }
}

export default async function JobToolCard({ jobItem }: { jobItem: JobItem }) {
    const [imageURL] = await Promise.all([fetchFavicon(jobItem.url)])

    return (
        <Suspense>
            <div className="border-2 border-black bg-white p-3 rounded-lg m-3 w-[300px] h-[330px] hover:drop-shadow-lg hover:bg-secondary">
                <div className="flex justify-between">
                    <Image className="rounded-lg object-scale-down w-[70px] h-[70px]" src={imageURL || FALLBACK_ICON_URL} alt={jobItem.name} width={70} height={70} />

                    <a href={jobItem.url + '?ref=nfcorange'} target='_blank' rel="noreferrer">
                        <div className="flex underline">
                            <h1 className="text-xl font-bold">{jobItem.name}</h1>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </div>
                    </a>
                </div>

                <div className="mt-3">
                    <p>{jobItem.text}</p>
                </div>

                <div className="mt-1 flex flex-wrap">
                    {jobItem.tags.map((tag, index) => (
                        <p
                            key={index}
                            className={`my-2 mr-2 font-bold p-1 rounded-lg drop-shadow-lg text-xs whitespace-nowrap ${tag.color}`}
                        >
                            {tag.title}
                        </p>
                    ))}
                </div>
            </div>
        </Suspense>
    )
}