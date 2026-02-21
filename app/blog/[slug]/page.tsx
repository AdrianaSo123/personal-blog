import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/posts';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    try {
        const post = await getPostBySlug(slug);
        return {
            title: `${post.title} — Adrian's Blog`,
            description: post.excerpt,
        };
    } catch {
        return { title: "Post not found" };
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;

    let post;
    try {
        post = await getPostBySlug(slug);
    } catch {
        notFound();
    }

    return (
        <article className="post-page">
            <Link href="/" className="back-link">
                ← Back
            </Link>

            <header className="post-header">
                <div className="post-header-meta">
                    <span className="post-date">
                        {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                        <div className="post-card-tags">
                            {post.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    )}
                </div>
                <h1 className="post-title">{post.title}</h1>
                {post.excerpt && <p className="post-card-excerpt">{post.excerpt}</p>}
            </header>

            <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
        </article>
    );
}
