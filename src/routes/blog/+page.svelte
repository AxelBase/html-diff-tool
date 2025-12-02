<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    {
      href: '/blog/posts/post1',
      title: 'Understanding DOM-Aware HTML Diffing',
      description: 'How AxelBase compares HTML structure, not just text — preserving tags, attributes, and nesting for accurate visual diffs.'
    },
    {
      href: '/blog/posts/post2',
      title: 'Line-by-Line vs Side-by-Side: When to Use Which Mode',
      description: 'A technical breakdown of both viewing modes and how they help identify structural vs inline changes efficiently.'
    },
    {
      href: '/blog/posts/post3',
      title: 'How Attribute Changes Are Detected and Highlighted',
      description: 'Deep dive into how modified, added, or removed attributes (class, id, data-*, aria-*) are visually flagged in the output.'
    },
    {
      href: '/blog/posts/post4',
      title: 'Handling Malformed or Fragmented HTML Safely',
      description: 'Why AxelBase never crashes on broken tags, missing closers, or partial documents — and how it normalizes input.'
    },
    {
      href: '/blog/posts/post5',
      title: 'Exporting Diff Results as Clean, Semantic HTML',
      description: 'Learn how the "Copy Result" feature generates valid <ins>/<del> markup ready for documentation, emails, or CMS use.'
    },
    {
      href: '/blog/posts/post6',
      title: 'Performance Optimization for Large HTML Payloads',
      description: 'How the tool handles 15,000+ character inputs instantly using efficient diff algorithms and virtual DOM parsing.'
    },
    {
      href: '/blog/posts/post7',
      title: 'Privacy & Security: 100% Client-Side Processing Explained',
      description: 'Technical confirmation that no HTML ever leaves your browser — with proof via network inspection and offline mode.'
    }
  ];
</script>

<svelte:head>
  <title>Blog • AxelBase HTML Difference Highlighter</title>
  <meta name="description" content="Technical deep dives, best practices, and advanced usage guides for the AxelBase HTML Difference Highlighter." />
</svelte:head>

<div class="container py-5 blog-index">
  <header class="text-center mb-5">
    <h1 class="display-5 fw-bold mb-3">
      <i class="bi bi-journal-code me-2"></i>
      AxelBase Blog
    </h1>
    <p class="lead text-muted col-lg-8 mx-auto">
      In-depth articles on HTML diffing techniques, performance, accessibility, and real-world use cases for frontend developers, content teams, and QA engineers.
    </p>
  </header>

  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    {#each posts as post}
      <div class="col">
        <a href="{base}{post.href}" class="text-decoration-none h-100">
          <div class="card glass glass-card h-100 border-0 shadow-sm hover-lift">
            <div class="card-body d-flex flex-column">
              <h3 class="card-title fs-5 fw-bold text-primary mb-3">
                {post.title}
              </h3>
              <p class="card-text text-muted small flex-grow-1">
                {post.description}
              </p>
              <span class="text-warning fw-semibold mt-3">
                Read article <i class="bi bi-arrow-right ms-1"></i>
              </span>
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>

<style>
  .hover-lift {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important;
  }
</style>