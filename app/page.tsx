import Link from 'next/link';
import { getHomeContent } from '@/lib/home';
import { getAllPosts } from '@/lib/posts';

export default async function HomePage() {
    const [home, posts] = await Promise.all([getHomeContent(), getAllPosts()]);
    const latestPosts = posts.slice(0, 3);

    return (
        <>
            {/* ── Hero ── */}
            <section className="home-hero">
                <p className="hero-greeting">Hi, I&apos;m</p>
                <h1 className="hero-name">Adriana.</h1>
                <p className="hero-role">{home.tagline}</p>
                <div
                    className="hero-body"
                    dangerouslySetInnerHTML={{ __html: home.bodyHtml }}
                />
                <div className="hero-actions">
                    <Link href="/blog" className="hero-cta">
                        Read the blog →
                    </Link>
                    <Link href="/blog" className="hero-cta-ghost">
                        View all posts
                    </Link>
                </div>
            </section>

            {/* ── Latest posts preview ── */}
            {latestPosts.length > 0 && (
                <>
                    <div className="section-divider">
                        <span className="section-label">Latest Posts</span>
                        <span className="divider-line" />
                        {posts.length > 3 && (
                            <Link href="/blog" className="view-all-link">
                                View all {posts.length} →
                            </Link>
                        )}
                    </div>

                    <div className="posts-grid">
                        {latestPosts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-grid-card">
                                <div className="post-card-meta">
                                    <span className="post-card-date">
                                        {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="post-card-tags">
                                            {post.tags.slice(0, 2).map((tag) => (
                                                <span key={tag} className="tag">{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <h2 className="post-card-title">{post.title}</h2>
                                {post.excerpt && (
                                    <p className="post-card-excerpt">{post.excerpt}</p>
                                )}
                                <span className="read-more">Read post →</span>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
