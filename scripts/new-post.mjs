#!/usr/bin/env node
/**
 * new-post — publish a blog post via the GitHub Content API
 *
 * Usage:  npm run new-post
 *
 * Requires GH_TOKEN in .env (or exported in shell).
 * No editor opened — everything typed inline in the terminal.
 */

import { createInterface } from 'readline';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ── Config ────────────────────────────────────────────────────────────────────
const REPO = 'AdrianaSo123/personal-blog';
const BRANCH = 'main';

const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dir, '../.env');
if (existsSync(envPath)) {
    readFileSync(envPath, 'utf8').split('\n').forEach(line => {
        const [k, ...v] = line.split('=');
        if (k?.trim() && v.length) process.env[k.trim()] = v.join('=').trim();
    });
}

const TOKEN = process.env.GH_TOKEN;

// ── Helpers ───────────────────────────────────────────────────────────────────
const toSlug = s =>
    s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');

const c = {
    reset: s => `\x1b[0m${s}\x1b[0m`,
    bold: s => `\x1b[1m${s}\x1b[0m`,
    dim: s => `\x1b[2m${s}\x1b[0m`,
    cyan: s => `\x1b[36m${s}\x1b[0m`,
    green: s => `\x1b[32m${s}\x1b[0m`,
    yellow: s => `\x1b[33m${s}\x1b[0m`,
    red: s => `\x1b[31m${s}\x1b[0m`,
    purple: s => `\x1b[35m${s}\x1b[0m`,
};

function ask(rl, label, hint = '') {
    const prompt = c.cyan(`  ${label.padEnd(8)}`) + c.dim('› ') + (hint ? c.dim(`[${hint}] `) : '');
    return new Promise(resolve => {
        rl.question(prompt, ans => resolve(ans.trim()));
    });
}

function askMultiline(label) {
    return new Promise(resolve => {
        console.log(c.cyan(`  ${label}`));
        console.log(c.dim('  Write your post below. Type') + ' --- ' + c.dim('on its own line when done.\n'));

        const rl2 = createInterface({ input: process.stdin });
        const lines = [];

        rl2.on('line', line => {
            if (line.trim() === '---') {
                rl2.close();
            } else {
                lines.push(line);
            }
        });

        rl2.on('close', () => resolve(lines.join('\n').trim()));
    });
}

async function ghFetch(path, method = 'GET', body) {
    const res = await fetch(`https://api.github.com/repos/${REPO}/${path}`, {
        method,
        headers: {
            Authorization: `token ${TOKEN}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });
    return { ok: res.ok, data: await res.json() };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
    console.log('');
    console.log(c.bold(c.purple('  Blog.')) + ' ' + c.dim('new post'));
    console.log(c.dim('  ─────────────────────────────────'));
    console.log('');

    if (!TOKEN) {
        console.error(c.red('  ✗ GH_TOKEN not found in .env'));
        process.exit(1);
    }

    const today = new Date().toISOString().split('T')[0];

    const rl = createInterface({ input: process.stdin, output: process.stdout });

    const title = await ask(rl, 'Title');
    if (!title) { console.error(c.red('  Title is required.')); rl.close(); process.exit(1); }

    const dateAns = await ask(rl, 'Date', today);
    const date = dateAns || today;

    const tagsAns = await ask(rl, 'Tags', 'comma separated');
    const tags = tagsAns ? tagsAns.split(',').map(t => t.trim()).filter(Boolean) : [];

    const excerpt = await ask(rl, 'Excerpt');
    rl.close();

    console.log('');

    // Multiline body
    const body = await askMultiline('Body (Markdown)');

    if (!body) {
        console.log(c.yellow('\n  Empty post — nothing published.'));
        process.exit(0);
    }

    const slug = toSlug(title);
    const tagsYaml = tags.length ? `\ntags: [${tags.map(t => `"${t}"`).join(', ')}]` : '';
    const content = `---\ntitle: "${title}"\ndate: "${date}"\nexcerpt: "${excerpt}"${tagsYaml}\n---\n\n${body}\n`;
    const encoded = Buffer.from(content).toString('base64');
    const filePath = `content/posts/${slug}.md`;

    process.stdout.write(c.cyan('\n  Publishing'));

    const check = await ghFetch(`contents/${filePath}`);
    const sha = check.ok ? check.data.sha : undefined;

    const { ok, data } = await ghFetch(`contents/${filePath}`, 'PUT', {
        message: `post: add "${title}"`,
        content: encoded,
        branch: BRANCH,
        ...(sha ? { sha } : {}),
    });

    if (!ok) {
        console.log('');
        console.error(c.red(`  ✗ ${data.message}`));
        process.exit(1);
    }

    console.log(c.green(' ✓'));
    console.log('');
    console.log(c.bold(c.green('  Published!')));
    console.log(c.dim(`  slug   : ${slug}`));
    console.log(c.dim(`  commit : ${data.commit?.sha?.slice(0, 7)}`));
    console.log(c.dim(`  live   : https://adrianaso123.github.io/personal-blog/blog/${slug}`));
    console.log(c.dim(`  deploy : https://github.com/${REPO}/actions`));
    console.log('');
}

main().catch(err => {
    console.error(c.red(`\n  ✗ ${err.message}`));
    process.exit(1);
});
