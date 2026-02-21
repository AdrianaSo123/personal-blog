import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default async function BlogIndexPage() {
    const posts = await getAllPosts();

    return (
        <>
            <div className="page-hero">
                <h1 className="page-title">All Posts</h1>
                <p className="page-subtitle">{posts.length} post{posts.length !== 1 ? 's' : ''} so far</p>
            </div>

            <div className="section-header">
                <span className="section-line" />
            </div>

            {posts.length === 0 ? (
                <div className="empty-state">
                    <p>No posts yet — drop a <code>.md</code> file in <code>content/posts/</code></p>
                </div>
            ) : (
                <div className="post-list">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
                            <div className="post-card-meta">
                                <span className="post-card-date">
                                    {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                                {post.tags && post.tags.length > 0 && (
                                    <div className="post-card-tags">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <h2 className="post-card-title">{post.title}</h2>
                            {post.excerpt && (
                                <p className="post-card-excerpt">{post.excerpt}</p>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
