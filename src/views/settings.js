import { getBrandSettings, updateBrandSettings } from '../db.js';

export async function render(root) {
  root.innerHTML = '<div class="loading">Loading…</div>';
  try {
    const settings = await getBrandSettings();
    
    root.innerHTML = `
      <div class="panel" style="max-width: 600px; margin: 0 auto;">
        <div class="panel-head"><h3>Brand Settings</h3></div>
        <form class="entry-form" id="brandForm">
          <label class="full">Brand Name
            <input type="text" id="brandName" value="${settings?.brand_name || 'My Brand'}" required>
          </label>
          <div class="full">
            <button type="submit" class="btn">Save Changes</button>
          </div>
        </form>
      </div>
    `;

    root.querySelector('#brandForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const newName = root.querySelector('#brandName').value.trim();
      try {
        await updateBrandSettings(newName);
        document.getElementById('sidebar-brand-name').textContent = newName;
        alert('Brand name updated!');
      } catch (err) {
        alert('Failed to save: ' + err.message);
      }
    });

  } catch (err) {
    root.innerHTML = `<div class="error-msg">Failed to load settings: ${err.message}</div>`;
  }
}
