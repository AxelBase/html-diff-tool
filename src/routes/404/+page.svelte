<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>404 – Page Not Found • AxelBase HTML Difference Highlighter</title>
  <meta name="description" content="Oops! The page you're looking for doesn't exist. Return to the HTML diff tool or explore the blog." />
  <meta name="robots" content="noindex" />
  <meta property="og:title" content="404 – Page Not Found • AxelBase" />
  <meta property="og:description" content="Oops! The page you're looking for doesn't exist. Return to the HTML diff tool or explore the blog." />
  <meta property="og:url" content="{base}/404" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 min-vh-100 d-flex align-items-center">
  <div class="text-center w-100">
    <div class="glass glass-card p-5 p-md-7 shadow-lg mx-auto" style="max-width: 720px;">
      
      <h1 class="display-1 fw-bold mb-4" style="color: var(--zinc-yellow); text-shadow: 0 0 30px rgba(248,243,43,0.4);">
        404
      </h1>
      
      <h2 class="display-5 fw-bold mb-4">Page Not Found</h2>
      
      <p class="lead text-muted mb-5">
        Looks like this page took a wrong turn in the DOM tree.<br>
        Don’t worry — your HTML is still safe.
      </p>

      <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
        <a href="{base}/" class="btn btn-primary btn-lg px-5">
          <i class="bi bi-house-door me-2"></i> Back to Tool
        </a>
        <a href="{base}/blog" class="btn btn-outline-primary btn-lg px-5">
          <i class="bi bi-journal-text me-2"></i> Read Blog
        </a>
      </div>

      <div class="row text-start mt-5 g-4">
        <div class="col-md-4">
          <h5 class="fw-bold text-warning">Quick Links</h5>
          <ul class="list-unstyled mt-3">
            <li><a href="{base}/" class="text-decoration-none">HTML Diff Tool</a></li>
            <li><a href="{base}/blog" class="text-decoration-none">Blog</a></li>
            <li><a href="{base}/privacy" class="text-decoration-none">Privacy Policy</a></li>
            <li><a href="{base}/terms" class="text-decoration-none">Terms</a></li>
          </ul>
        </div>
        <div class="col-md-8">
          <h5 class="fw-bold text-warning">Still lost?</h5>
          <p class="text-muted small">
            This is a static site hosted on GitHub Pages. If you typed the URL manually, double-check it.<br>
            If you followed a broken link, feel free to <a href="https://github.com/yourusername/html-diff-tool/issues" target="_blank" rel="noopener" class="text-warning">open an issue</a> — we’d love to fix it.
          </p>
        </div>
      </div>

      <p class="italic-note mt-5 opacity-75">
        <em>Even 404 pages deserve to look good.</em>
      </p>
    </div>
  </div>
</div>

<style>
  .min-vh-100 {
    min-height: 100vh;
  }
  .glass-card:hover {
    transform: translateY(-10px);
    transition: transform 0.3s ease;
  }
  a {
    color: var(--zinc-yellow);
  }
  a:hover {
    color: var(--zinc-yellow-hover);
    text-decoration: underline;
  }
  .text-warning {
    color: var(--zinc-yellow) !important;
  }
  .italic-note {
    font-style: italic;
    color: var(--color-text-muted);
    font-size: 1.1rem;
  }
</style>