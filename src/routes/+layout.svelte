<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { slide, fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  // --- Buy Me A Coffee Logic ---
  const paypalUsername = 'AxelLab427'; // Update this!
  const donationAmounts = [1, 3, 5, 10];
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
    // Check local storage or system preference could go here
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

      <div class="position-relative" use:clickOutside on:click_outside={closeDropdown}>
        <button class="bmac-button" on:click={toggleDropdown}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z" />
          </svg>
          <span class="d-none d-sm-inline">Buy me a coffee</span>
        </button>

        {#if isDropdownOpen}
          <div class="bmac-dropdown" transition:slide={{ duration: 250 }}>
            {#each donationAmounts as amount}
              <a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" rel="noopener noreferrer" on:click={closeDropdown}>
                ${amount}
              </a>
            {/each}
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
  /* Navbar Styling */
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
  .nav-link-custom:hover { color: #000; } /* Dark text on hover for clarity */
  
  /* BMAC Button */
  .bmac-button {
    background-color: var(--zinc-yellow);
    color: var(--text-on-yellow);
    border: none;
    border-radius: 50px;
    padding: 8px 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 10px rgba(248, 243, 43, 0.3);
  }
  .bmac-button:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(248, 243, 43, 0.5); }
  .bmac-button svg { width: 18px; height: 18px; }
  
  .bmac-dropdown {
    position: absolute;
    top: 115%;
    right: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    min-width: 100px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  .bmac-dropdown a {
    text-decoration: none;
    color: #333;
    padding: 6px 12px;
    border-radius: 10px;
    text-align: center;
    font-weight: bold;
    transition: background 0.2s;
  }
  .bmac-dropdown a:hover { background-color: var(--zinc-yellow); }

  /* Theme Button */
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