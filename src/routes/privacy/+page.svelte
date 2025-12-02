<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy • AxelBase HTML Difference Highlighter</title>
  <meta name="description" content="Your HTML never leaves your browser. 100% client-side processing, zero data collection, fully offline-capable." />
  <meta property="og:title" content="Privacy Policy • AxelBase" />
  <meta property="og:description" content="Your HTML never leaves your browser. 100% client-side processing, zero data collection, fully offline-capable." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a> <span>/</span> <p>Privacy Policy</p>
  </div>

  <article class="glass glass-card p-5">
    <h1>Privacy Policy</h1>
    <p class="post-meta">Effective Date: December 2, 2025</p>

    <p>At <strong>AxelBase HTML Difference Highlighter</strong>, your privacy is not just respected — it is guaranteed by design. This tool operates <strong>100% in your browser</strong>. When you paste HTML to compare versions, <strong>nothing is uploaded, transmitted, logged, or stored anywhere</strong>. This Privacy Policy confirms our complete commitment to data protection.</p>

    <h2>We Collect Absolutely Nothing</h2>
    <p>We do not collect, store, or process any form of personal data. This includes:</p>
    <ul>
      <li><strong>HTML content</strong> you paste or compare</li>
      <li><strong>IP addresses</strong>, browser fingerprints, or location data</li>
      <li><strong>Usage statistics</strong>, session information, or analytics</li>
      <li><strong>Cookies</strong>, localStorage persistence, or tracking pixels</li>
    </ul>
    <p>All diff calculations happen exclusively on your device using JavaScript. When you close the tab, everything disappears forever.</p>

    <h2>How the Tool Works</h2>
    <p>The entire comparison engine — powered by <em>diff2html</em> and <em>jsdiff</em> — runs locally. Even if you disable internet access completely, the tool continues to function perfectly. You can verify this yourself: open Developer Tools → Network tab → no requests are made after page load.</p>

    <h2>No Third-Party Services</h2>
    <p>We do not use analytics (Google Analytics, Plausible, etc.), advertising networks, error reporting tools, or external fonts that could track you. The only external resources are optional CDN-hosted Bootstrap CSS/JS (which contain no tracking) and the open-source diff libraries bundled locally.</p>

    <h2>Security & Offline Use</h2>
    <p>Because no data ever leaves your browser, the tool is safe for:</p>
    <ul>
      <li>Proprietary templates and internal documentation</li>
      <li>Pre-release designs and client deliverables</li>
      <li>Sensitive administrative interfaces</li>
      <li>Any HTML containing confidential information</li>
    </ul>

    <h2>Children's Privacy</h2>
    <p>Our service is not directed to children under 13. Since we collect no data, we do not knowingly process information from children.</p>

    <h2>Changes to This Policy</h2>
    <p>We may update this policy only if we add server-side features (which we have no plans to do). Any changes will be clearly dated at the top of this page.</p>

    <p class="italic-note"><strong>Your data stays yours — always.</strong> This is not a marketing claim. It is verifiable architecture.</p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; padding-top: 2rem; padding-bottom: 4rem; }
  .breadcrumbs { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--color-text-muted); }
  .breadcrumbs a { color: var(--zinc-yellow); text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .breadcrumbs p { margin: 0; color: var(--color-text-main); font-weight: 600; }
  .post-meta { color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 2rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 1rem; }
  .italic-note { font-style: italic; color: var(--color-text-muted); text-align: center; margin-top: 3rem; font-size: 1.1rem; }
</style>