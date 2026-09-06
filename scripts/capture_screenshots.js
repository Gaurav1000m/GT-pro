const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/var/lib/flatpak/app/com.google.Chrome/x86_64/stable/b86e55b133d5643e6de573870cd0a7d6797164981ff64e25ac157ff29221c68c/files/extra/chrome';
const OUTPUT_DIR = path.resolve(__dirname, '../docs/screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--hide-scrollbars'
    ],
    defaultViewport: {
      width: 412,
      height: 890,
      deviceScaleFactor: 2.5,
      isMobile: true,
      hasTouch: true
    }
  });

  const page = await browser.newPage();
  const baseUrl = 'http://localhost:8080/index.html';

  console.log('Navigating to:', baseUrl);
  await page.goto(baseUrl, { waitUntil: 'networkidle0' });

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // 1. Splash Screen
  console.log('Capturing: 01_splash_screen.png');
  await page.evaluate(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.style.display = 'flex';
      splash.style.opacity = '1';
      splash.style.visibility = 'visible';
    }
  });
  await sleep(400);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_splash_screen.png') });

  // Reset splash
  await page.evaluate(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.style.display = 'none';
      splash.style.opacity = '0';
      splash.style.visibility = 'hidden';
    }
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await sleep(300);

  // 2. Home Screen (Dark Mode)
  console.log('Capturing: 02_home_dark.png');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02_home_dark.png') });

  // 3. Home Screen (Light Mode)
  console.log('Capturing: 03_home_light.png');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    const badge = document.getElementById('theme-status-badge');
    if (badge) {
      badge.textContent = 'LITE';
      badge.classList.add('badge-light-mode');
    }
  });
  await sleep(400);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03_home_light.png') });

  // Reset to Dark Mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    const badge = document.getElementById('theme-status-badge');
    if (badge) {
      badge.textContent = 'PRO';
      badge.classList.remove('badge-light-mode');
    }
  });
  await sleep(300);

  // 4. Category Sidebar Navigation Drawer
  console.log('Capturing: 04_category_sidebar.png');
  await page.evaluate(() => {
    const filterBtn = document.getElementById('open-category-filter-btn');
    if (filterBtn) filterBtn.click();
  });
  await sleep(500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04_category_sidebar.png') });

  // Close sidebar
  await page.evaluate(() => {
    const closeBtn = document.getElementById('close-sidebar-btn');
    if (closeBtn) closeBtn.click();
  });
  await sleep(400);

  // 5. Explore Category Screen (Physics Wallah cards)
  console.log('Capturing: 05_explore_category.png');
  await page.evaluate(() => {
    const firstBox = document.querySelector('.category-rect-box');
    if (firstBox) firstBox.click();
  });
  await sleep(500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05_explore_category.png') });

  // Back to Home
  await page.evaluate(() => {
    const backBtn = document.getElementById('explore-page-back-btn');
    if (backBtn) backBtn.click();
  });
  await sleep(400);

  // 6. Search Results Screen
  console.log('Capturing: 06_search_results.png');
  await page.evaluate(() => {
    const searchInput = document.getElementById('subject-search-input');
    if (searchInput) {
      searchInput.value = 'Physics';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await sleep(500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06_search_results.png') });

  // Clear search
  await page.evaluate(() => {
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.click();
    const searchInput = document.getElementById('subject-search-input');
    if (searchInput) {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await sleep(300);

  // 7. Donation & Support Screen
  console.log('Capturing: 07_donation_support.png');
  await page.evaluate(() => {
    const donBtn = document.getElementById('nav-item-donation');
    if (donBtn) donBtn.click();
  });
  await sleep(500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07_donation_support.png') });

  // 8. Library / Saved Resources Screen
  console.log('Capturing: 08_library_saved.png');
  await page.evaluate(() => {
    const libBtn = document.getElementById('nav-item-library');
    if (libBtn) libBtn.click();
  });
  await sleep(500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '08_library_saved.png') });

  // 9. In-App Update Modal Screen
  console.log('Capturing: 09_update_modal.png');
  await page.evaluate(() => {
    const modal = document.getElementById('app-update-modal');
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      const tag = document.getElementById('update-modal-tag');
      if (tag) tag.textContent = 'Release v1.0.1';
      const ver = document.getElementById('update-modal-version');
      if (ver) ver.textContent = 'GT pro v1.0.1 is available now!';
      const notes = document.getElementById('update-modal-notes');
      if (notes) {
        notes.innerHTML = `
          <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: var(--text-secondary);">
            <li>🚀 Enhanced offline cellular tower signal screen</li>
            <li>🔒 Improved VPN detection & tunnel security</li>
            <li>🎨 Native app bars with back buttons on all views</li>
            <li>⚡ Micro-animations & smoother swipe transitions</li>
          </ul>
        `;
      }
    }
  });
  await sleep(400);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '09_update_modal.png') });

  // Close Update Modal
  await page.evaluate(() => {
    const modal = document.getElementById('app-update-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
  await sleep(200);

  // 10. No Internet / Offline Screen
  console.log('Capturing: 10_offline_screen.png');
  await page.evaluate(() => {
    const offline = document.getElementById('no-internet-screen');
    if (offline) {
      offline.classList.add('active');
      offline.setAttribute('aria-hidden', 'false');
    }
  });
  await sleep(400);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '10_offline_screen.png') });

  // Close offline screen
  await page.evaluate(() => {
    const offline = document.getElementById('no-internet-screen');
    if (offline) {
      offline.classList.remove('active');
      offline.setAttribute('aria-hidden', 'true');
    }
  });
  await sleep(200);

  // 11. VPN Detected Security Screen
  console.log('Capturing: 11_vpn_detected.png');
  await page.evaluate(() => {
    const vpn = document.getElementById('vpn-detected-modal');
    if (vpn) {
      vpn.classList.add('active');
      vpn.setAttribute('aria-hidden', 'false');
    }
  });
  await sleep(400);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '11_vpn_detected.png') });

  console.log('All screenshots captured successfully!');
  await browser.close();
}

run().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
