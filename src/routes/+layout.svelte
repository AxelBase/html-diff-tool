<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { slide, fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  // --- Buy Me A Coffee + Bitcoin Logic ---
  const bmacUsername = 'axelbase';           // ← your BuyMeACoffee username
  const bitcoinAddress = 'bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9';

  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  // --- Dark Mode Logic ---
  let isDarkMode = false;

  onMount(() => {
    const currentTheme = document.body.getAttribute('data-bs-theme');
    isDarkMode = currentTheme === 'dark';
  });

  function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-bs-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-bs-theme', next);
    isDarkMode = next === 'dark';
  }
</script>

<header class="fixed-top p-3 w-100" style="pointer-events: none; z-index: 1040;">
  <nav class="container glass rounded-pill px-4 py-2 d-flex justify-content-between align-items-center shadow-sm"
       style="pointer-events: auto; max-width: 1200px;">

    <div class="d-flex align-items-center gap-3">
      <a href="{base}/" class="d-flex align-items-center gap-2 text-decoration-none logo-group">
        <img src="{base}/AxelLab-Logo.ico" alt="Logo" class="navbar-brand-logo" />
        <span class="fw-bold fs-5 tracking-tight navbar-brand-text">AxelBase</span>
      </a>
    </div>

    <div class="d-flex align-items-center gap-3">

      <div class="d-none d-lg-flex align-items-center gap-2">
        <a class="nav-link-custom" href="{base}/">Home</a>
        <a class="nav-link-custom" href="{base}/#about">About</a>
        <a class="nav-link-custom" href="{base}/#how-to-use">How to use</a>
        <a class="nav-link-custom" href="{base}/#faq">FAQ</a>
        <a class="nav-link-custom" href="{base}/blog">Blog</a>
      </div>

      <div class="vr mx-2 d-none d-lg-block"></div>

      <!-- Buy me a coffee + Bitcoin Dropdown -->
      <div class="position-relative" use:clickOutside on:click_outside={closeDropdown}>
        <button
          class="bmac-button d-flex align-items-center gap-2"
          on:click={toggleDropdown}
          aria-label="Support options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
          </svg>
          <span class="d-none d-sm-inline fw-semibold">Buy me a Coffee</span>
        </button>

        {#if isDropdownOpen}
          <div
            class="bmac-dropdown glass"
            transition:slide={{ duration: 250 }}
          >
            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
            >
              <span class="amount">$3</span> One Coffee
            </a>

            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
            >
              <span class="amount">$5</span> Two Coffees
            </a>

            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
            >
              <span class="amount">$10</span> Three Coffees
            </a>

            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              on:click={closeDropdown}
              class="custom-amount"
            >
              Custom Amount
            </a>

            <a
              href="bitcoin:{bitcoinAddress}?label=AxelBase&message=Buy%20me%20a%20coffee"
              on:click={closeDropdown}
              class="custom-amount bitcoin-option"
            >
              Buy via Crypto (Bitcoin)
            </a>
          </div>
        {/if}
      </div>

      <button class="btn btn-icon-only" on:click={toggleTheme} aria-label="Toggle Dark Mode">
        {#if isDarkMode}
          <i class="bi bi-sun-fill" in:fade></i>
        {:else}
          <i class="bi bi-moon-stars-fill" in:fade></i>
        {/if}
      </button>

    </div>
  </nav>
</header>

<main class="container py-5 mt-5">
  <div class="mt-4">
    <slot />
  </div>
</main>

<footer class="fixed-bottom glass border-top py-2">
  <div class="container d-flex flex-column flex-sm-row justify-content-between align-items-center small text-muted">
    <span class="fw-bold">© {new Date().getFullYear()} AxelBase Difference Highlighter</span>
    <div class="d-flex gap-3 mt-1 mt-sm-0">
      <a href="{base}/privacy" class="footer-link">Privacy</a>
      <a href="{base}/terms" class="footer-link">Terms</a>
    </div>
  </div>
</footer>

<style>
  /* ── Buy me a coffee button ── */
  .bmac-button {
    background: var(--zinc-yellow);
    color: var(--text-on-yellow);
    border: none;
    border-radius: 50px;
    padding: 8px 18px;
    font-weight: 700;
    font-size: 0.95rem;
    box-shadow: 0 4px 12px rgba(248, 243, 43, 0.35);
    transition: all 0.25s ease;
  }

  .bmac-button:hover {
    background: var(--zinc-yellow-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(248, 243, 43, 0.5);
  }

  .bmac-button svg {
    width: 20px;
    height: 20px;
  }

  /* ── Dropdown ── */
  .bmac-dropdown {
    position: absolute;
    top: 115%;
    right: 0;
    width: 240px;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: var(--glass-shadow);
    overflow: hidden;
    z-index: 1000;
    padding: 8px 0;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    color: var(--color-text-main);
    text-decoration: none;
    font-size: 0.98rem;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: rgba(248, 243, 43, 0.18);
    color: var(--color-text-main);
  }

  .bmac-dropdown .amount {
    font-weight: 800;
    color: var(--zinc-yellow);
    font-size: 1.15rem;
    min-width: 38px;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 700;
    color: var(--zinc-yellow);
    justify-content: center !important;
    border-top: 1px solid var(--glass-border);
    margin-top: 4px;
    padding-top: 12px;
  }

  .bmac-dropdown .bitcoin-option {
    color: #f7931a;
    font-weight: 700;
  }

  .bmac-dropdown .bitcoin-option:hover {
    background: rgba(247, 147, 26, 0.12);
  }

  /* Keep your existing styles for the rest */
  .navbar-brand-logo { height: 32px; width: auto; transition: transform 0.3s ease; }
  .logo-group:hover .navbar-brand-logo { transform: rotate(15deg); }
  .navbar-brand-text { color: var(--color-text-main); }

  .nav-link-custom {
    color: var(--color-text-muted);
    font-weight: 600;
    text-decoration: none;
    padding: 0.5rem 0.8rem;
    transition: all 0.2s ease;
  }
  .nav-link-custom:hover { color: var(--color-text-main); }

  .btn-icon-only {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid var(--glass-border);
    color: var(--color-text-main);
    background: transparent;
  }
  .btn-icon-only:hover { background: var(--glass-border); transform: rotate(15deg); }

  .footer-link { color: var(--color-text-muted); text-decoration: none; margin: 0 10px; }
  .footer-link:hover { color: var(--color-text-main); text-decoration: underline; }
</style>