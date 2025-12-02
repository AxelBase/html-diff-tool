<script lang="ts">
  import {base} from '$app/paths';
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import {
    computeDiff,
    getSavedViewMode,
    saveViewMode,
    swapInputs,
    clearAll,
    copyResultToClipboard,
    type ViewMode
  } from '$lib/diff.logic';

  let original = '';
  let modified = '';
  let viewMode: ViewMode = 'line-by-line';
  let resultHtml = '';
  let mounted = false;

  onMount(() => {
    mounted = true;
    try {
      viewMode = getSavedViewMode();
      updateDiff();
    } catch (err) {
      console.error('[+page] onMount error:', err);
    }
  });

  // Reactive diff calculation
  $: {
    if (mounted) {
      try {
        resultHtml = computeDiff(original, modified, viewMode);
      } catch (err) {
        console.error('Diff failed:', err);
        resultHtml = '<div class="alert alert-danger">Diff crashed</div>';
      }
    }
  }

  function updateDiff() {
    try {
      resultHtml = computeDiff(original, modified, viewMode);
    } catch (err) {}
  }

  function handleSwap() {
    try { [original, modified] = swapInputs(original, modified); } catch (err) {}
  }

  function handleClear() {
    original = '';
    modified = '';
  }

  async function handleCopy() {
    const ok = await copyResultToClipboard(resultHtml);
    alert(ok ? 'Copied to clipboard!' : 'Copy failed');
  }

  function setViewMode(mode: ViewMode) {
    viewMode = mode;
    saveViewMode(mode);
  }
</script>

{#if mounted}
<div in:fade={{ duration: 500 }}>
  
  <div class="row g-4 mb-5 justify-content-center">
    <div class="col-lg-8 text-center" in:fly={{ y: -20, duration: 800 }}>
      <h1 class="display-4 fw-bold mb-3">Compare HTML Code</h1>
      <p class="lead text-muted">
        Instant, safe, client-side difference highlighter. 
        <span class="badge bg-warning text-dark rounded-pill">v2.0</span>
      </p>
    </div>
  </div>

  <div class="row g-4" in:fly={{ y: 30, duration: 800, delay: 200 }}>
    
    <div class="col-lg-6">
      <div class="glass glass-card h-100">
        <label for="original" class="form-label fw-bold ms-2 mb-3">
          <i class="bi bi-file-earmark-code me-2"></i>Original HTML
        </label>
        <textarea id="original" class="form-control" bind:value={original} on:input={updateDiff} placeholder="Paste original HTML here..."></textarea>
      </div>
    </div>

    <div class="col-lg-6">
      <div class="glass glass-card h-100">
        <label for="modified" class="form-label fw-bold ms-2 mb-3">
          <i class="bi bi-file-earmark-plus me-2"></i>Modified HTML
        </label>
        <textarea id="modified" class="form-control" bind:value={modified} on:input={updateDiff} placeholder="Paste modified HTML here..."></textarea>
      </div>
    </div>

    <div class="col-12 text-center py-3">
      <div class="d-flex justify-content-center gap-2 flex-wrap">
        <div class="btn-group shadow-sm" style="border-radius: 50px;">
          <button type="button" class="btn btn-outline-secondary" on:click={handleSwap}>
            <i class="bi bi-arrow-left-right me-1"></i> Swap
          </button>
          <button type="button" class="btn btn-outline-secondary" on:click={handleClear}>
             <i class="bi bi-trash me-1"></i> Clear
          </button>
          <button type="button" class="btn btn-primary" on:click={handleCopy}>
            <i class="bi bi-clipboard me-1"></i> Copy Result
          </button>
        </div>

        <div class="btn-group shadow-sm ms-md-3" style="border-radius: 50px;">
          <button type="button" class="btn {viewMode === 'line-by-line' ? 'btn-primary' : 'btn-outline-primary'}"
            on:click={() => setViewMode('line-by-line')}>Inline</button>
          <button type="button" class="btn {viewMode === 'side-by-side' ? 'btn-primary' : 'btn-outline-primary'}"
            on:click={() => setViewMode('side-by-side')}>Side-by-Side</button>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div class="glass glass-card p-3 shadow-lg">
        {#if original || modified}
          <div class="card-body p-0">
            {@html resultHtml}
          </div>
        {:else}
          <div class="text-center py-5 text-muted opacity-50">
            <i class="bi bi-layers fs-1"></i>
            <p class="mt-2">Waiting for input...</p>
          </div>
        {/if}
      </div>
    </div>
  </div>

<hr class="my-5" style="border-color: var(--glass-border); opacity: 0.3;">

<div in:fly={{ y: 50, duration: 800, delay: 400 }}>

  <!-- ABOUT SECTION -->
  <section id="about" class="py-5 scroll-margin-offset">
    <div class="glass glass-card p-5">
      <h2 class="fw-bold mb-4"><i class="bi bi-info-circle-fill me-3 text-warning"></i>About AxelBase HTML Difference Highlighter</h2>
      <p class="lead text-muted mb-4">
        AxelBase is a privacy-first, client-side HTML comparison tool engineered for developers, designers, content teams, and QA engineers who need accurate, instant, and secure visual diffs — without ever sending code to a server.
      </p>
      <p>
        Unlike traditional text-based diff tools that treat HTML as plain strings, AxelBase understands the document as structured data. It recognizes tags, attributes, nesting, and movement of elements, delivering meaningful, human-readable differences even when working with malformed fragments, dynamically generated templates, or massive marketing pages.
      </p>
      <p>
        Built with performance and robustness in mind, the tool processes documents of 15,000+ characters in under a second using optimized tokenization and virtual rendering. Whether you're reviewing a single component change or an entire page redesign, AxelBase eliminates noise from whitespace, formatting differences, or line-ending variations.
      </p>
      <p>
        Every comparison happens entirely in your browser. No data is uploaded, logged, or stored. You can disconnect from the internet completely and the tool continues working flawlessly — making it safe for proprietary templates, pre-release designs, internal admin panels, or any sensitive markup.
      </p>
      <p>
        The output is not just visual. When you click “Copy Result,” you receive clean, semantic HTML using standard <ins>ins</ins> and <ins>del</ins> elements — ready to paste into GitHub comments, documentation, emails, or CMS fields with perfect formatting preserved across platforms.
      </p>
      <p>
        AxelBase supports two powerful viewing modes: <strong>Inline</strong> (line-by-line) for seeing the final document with changes highlighted in context, and <strong>Side-by-Side</strong> for precise structural analysis when elements are added, removed, or moved. Your preference is automatically saved.
      </p>
      <p>
        Open-source, dependency-light, and deployed as a fully static site, AxelBase embodies the philosophy that great tools should be fast, transparent, and respect user privacy by design. It’s not just a diff tool — it’s a trusted companion for anyone who works with HTML.
      </p>
    </div>
  </section>

  <!-- HOW TO USE SECTION -->
  <section id="how-to-use" class="py-5 scroll-margin-offset">
    <h2 class="fw-bold mb-5 text-center">How to Use AxelBase</h2>
    <div class="row g-5">
      <div class="col-lg-4">
        <div class="glass glass-card h-100 text-center p-4 hover-lift">
          <div class="display-3 fw-bold text-warning mb-3">1</div>
          <h4 class="fw-bold mb-3">Paste Your HTML</h4>
          <p class="text-muted">
            Copy the original version into the left textarea and the modified version into the right. You can paste full documents, fragments, or even malformed HTML — the tool gracefully handles broken tags, missing closers, and partial content without crashing.
          </p>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="glass glass-card h-100 text-center p-4 hover-lift">
          <div class="display-3 fw-bold text-warning mb-3">2</div>
          <h4 class="fw-bold mb-3">Choose Your View</h4>
          <p class="text-muted">
            Use <strong>Inline</strong> mode to see changes directly in the final document flow — perfect for content reviews. Switch to <strong>Side-by-Side</strong> when you need to understand structural changes, moved blocks, or attribute modifications with absolute clarity.
          </p>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="glass glass-card h-100 text-center p-4 hover-lift">
          <div class="display-3 fw-bold text-warning mb-3">3</div>
          <h4 class="fw-bold mb-3">Export & Share</h4>
          <p class="text-muted">
            Click “Copy Result” to get clean, semantic HTML with proper <ins>ins</ins> and <ins>del</ins> tags. Paste it anywhere — GitHub PRs, Notion, Confluence, Outlook — and the highlighting survives perfectly. Use “Swap” to reverse inputs or “Clear” to start fresh.
          </p>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center">
      <p class="lead text-muted">
        That’s it. No accounts, no uploads, no waiting. Instant, accurate, private HTML comparison — exactly when you need it.
      </p>
    </div>
  </section>

  <!-- FAQ SECTION -->
  <section id="faq" class="py-5 scroll-margin-offset">
    <h2 class="fw-bold mb-5 text-center">Frequently Asked Questions</h2>
    <div class="accordion accordion-flush" id="faqAccordion">

      <div class="glass glass-card mb-3 overflow-hidden">
        <div class="accordion-item bg-transparent border-0">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
              Is my HTML ever sent to a server?
            </button>
          </h2>
          <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              Never. All processing happens 100% in your browser using JavaScript. Open DevTools → Network tab → you’ll see zero requests after page load. Try it offline — everything still works perfectly.
            </div>
          </div>
        </div>
      </div>

      <div class="glass glass-card mb-3 overflow-hidden">
        <div class="accordion-item bg-transparent border-0">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
              Why is it more accurate than GitHub or other diff tools?
            </button>
          </h2>
          <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              Most tools compare text line-by-line. AxelBase understands HTML structure — it detects moved elements, attribute changes, and ignores irrelevant formatting differences. The result: dramatically less noise and true insight into what actually changed.
            </div>
          </div>
        </div>
      </div>

      <div class="glass glass-card mb-3 overflow-hidden">
        <div class="accordion-item bg-transparent border-0">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
              Can I use it with sensitive or proprietary code?
            </button>
          </h2>
          <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              Absolutely. Since nothing leaves your device, AxelBase is approved for internal tools, client work, financial interfaces, and pre-release designs. Many teams use it where traditional online diff tools are forbidden.
            </div>
          </div>
        </div>
      </div>

      <div class="glass glass-card mb-3 overflow-hidden">
        <div class="accordion-item bg-transparent border-0">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
              Is it really free forever?
            </button>
          </h2>
          <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              Yes. Completely free, open-source (MIT), no limits, no accounts. If you love it, consider supporting via the “Buy me a coffee” button — but it’s never required.
            </div>
          </div>
        </div>
      </div>

      <div class="glass glass-card mb-3 overflow-hidden">
        <div class="accordion-item bg-transparent border-0">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
              Does it work on mobile?
            </button>
          </h2>
          <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              Yes. Fully responsive design with stacked layout on small screens and horizontally scrollable side-by-side view. Perfect for quick reviews on the go.
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

</div>
</div>
{/if}

<style>
  .scroll-margin-offset { scroll-margin-top: 120px; }
  .hover-lift { transition: transform 0.3s ease; }
  .hover-lift:hover { transform: translateY(-8px); }
</style>