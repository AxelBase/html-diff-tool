<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions • AxelBase HTML Difference Highlighter</title>
  <meta name="description" content="Legal terms of use for the free, open-source, client-side HTML comparison tool by AxelBase." />
  <meta property="og:title" content="Terms & Conditions • AxelBase" />
  <meta property="og:description" content="Legal terms of use for the free, open-source, client-side HTML comparison tool by AxelBase." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a> <span>/</span> <p>Terms & Conditions</p>
  </div>

  <article class="glass glass-card p-5">
    <h1>Terms & Conditions</h1>
    <p class="post-meta">Last Updated: December 2, 2025</p>

    <p>By using <strong>AxelBase HTML Difference Highlighter</strong>, you agree to these Terms & Conditions. This is a free, open-source, client-side web tool provided as-is for comparing HTML documents.</p>

    <h2>1. Nature of Service</h2>
    <p>This tool runs <strong>entirely in your browser</strong>. No data is transmitted to any server. All processing, storage, and output occur locally on your device. You are solely responsible for the content you input and any outputs you generate or share.</p>

    <h2>2. License to Use</h2>
    <p>You are granted a worldwide, non-exclusive, royalty-free license to use this tool for personal or commercial purposes. You may compare any HTML content, including proprietary, confidential, or sensitive material, with the understanding that <strong>all processing remains on your device</strong>.</p>

    <h2>3. No Warranty</h2>
    <p>This tool is provided <strong>"as is"</strong> and <strong>without warranty of any likelihood</strong>, including but not limited to accuracy, completeness, or fitness for a particular purpose. While we strive for excellence, we do not guarantee error-free operation in all scenarios.</p>

    <h2>4. Limitation of Liability</h2>
    <p>In no event shall AxelBase or its contributors be liable for any direct, indirect, incidental, special, or consequential damages arising from use of this tool — including data loss, incorrect diffs, or reliance on output in production environments.</p>

    <h2>5. Acceptable Use</h2>
    <p>You agree not to:</p>
    <ul>
      <li>Use the tool for unlawful purposes</li>
      <li>Attempt to reverse-engineer or extract the source code beyond what is publicly available</li>
      <li>Distribute malicious HTML intended to exploit browser vulnerabilities</li>
    </ul>

    <h2>6. Intellectual Property</h2>
    <p>The tool’s source code is open and available on GitHub under the MIT license. You are free to fork, modify, and redistribute it in accordance with that license.</p>

    <h2>7. Changes to Terms</h2>
    <p>We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance of the new terms.</p>

    <p class="italic-note"><strong>Use freely. Trust completely.</strong> This tool exists to make your work easier and safer — nothing more.</p>
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