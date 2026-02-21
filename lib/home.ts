import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const homePath = path.join(process.cwd(), 'content/home.md');

export interface HomeContent {
    title: string;
    tagline: string;
    bodyHtml: string;
}

export async function getHomeContent(): Promise<HomeContent> {
    if (!fs.existsSync(homePath)) {
        return {
            title: 'My Blog',
            tagline: 'Welcome.',
            bodyHtml: '',
        };
    }

    const fileContents = fs.readFileSync(homePath, 'utf8');
    const { data, content } = matter(fileContents);

    const processed = await remark().use(html).process(content);
    const bodyHtml = processed.toString();

    return {
        title: data.title ?? 'My Blog',
        tagline: data.tagline ?? '',
        bodyHtml,
    };
}
