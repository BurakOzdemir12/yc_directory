import React, {Suspense} from 'react'
import {PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY} from "@/sanity/lib/queries";
import {notFound} from "next/navigation";
import {client} from "@/sanity/lib/client";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import {Skeleton} from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";

const md = markdownit();
export const experimental_ppr = true

const Page = async ({params}: { params: Promise<{ id: string }> }) => {

    const id = (await params).id;

    //Sequential to => parallel => the code requests two queries concurrently
    // if second query depends on first query then you can use sequential
    // if you want to run them in parallel then you can use Promise.all
    const [post,{select: editorPosts}]= await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, {id}),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: 'editor-picks'}),
    ])

    // const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});
    // const {select: editorPosts} = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: 'editor-picks'});

    if (!post) return notFound();

    const parsedContent = md.render(post.pitch || '');
    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(post?._createdAt)}</p>
                <h1 className="heading">{post.title}</h1>
                <p className="sub-heading !max-w-5xl">{post.description}</p>
            </section>
            <section className="section_container">
                <img src={post.image} alt="placeholder" className="w-full h-auto rounded-xl"/>
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post.author?._id}`}
                              className="flex gap-2 items-center mb-3"
                        >
                            <Image src={post.author.image}
                                   className="rounded-full drop-shadow-lg"
                                   alt="avatar"
                                   width={64}
                                   height={64}/>
                            <div className="">
                                <p className="text-20-medium">{post.author.name}</p>
                                <p className="text-16-medium !text-black-300">
                                    @{post.author?.username}
                                </p>
                            </div>
                        </Link>
                        <p className="category-tag">
                            {post.category}
                        </p>
                    </div>
                    <h3 className="text-30-bold">
                        Pitch Details
                    </h3>

                    {parsedContent ? (
                        <article className="prose max-w-4xl font-work-sans break-all"
                                 dangerouslySetInnerHTML={{__html: parsedContent}}/>
                    ) : (
                        <p>No Result</p>
                    )}
                </div>
                <hr className="divider"/>
                {/* todo: EDITOR SELECTED STARTUPS*/}

                {editorPosts?.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <p className="text-30-semibold">Editor Picks</p>
                        <ul className="mt-7 card_grid-sm">
                            {editorPosts.map((post: StartupTypeCard, i: number) => (
                                <StartupCard key={i} post={post}/>
                            ))}
                        </ul>
                    </div>
                )}
                {/*// Whenever you want to make something dynamic in PPR you have to wrap it in Suspense*/}
                <Suspense fallback={<Skeleton className="view_skeleton"/>}>
                    <View id={id}/>
                </Suspense>
            </section>
        </>


    )
}
export default Page
