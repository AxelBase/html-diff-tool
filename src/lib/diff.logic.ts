// src/lib/diff.logic.ts
import * as Diff2Html from 'diff2html';
import * as Diff from 'diff';
import 'diff2html/bundles/css/diff2html.min.css';

export type ViewMode = 'side-by-side' | 'line-by-line';
const STORAGE_KEY = 'html-diff-viewmode';

export function getSavedViewMode(): ViewMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'side-by-side' ? 'side-by-side' : 'line-by-line';
  } catch (e) {
    console.warn('[diff.logic] localStorage read failed:', e);
    return 'line-by-line';
  }
}

export function saveViewMode(mode: ViewMode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch (e) {
    console.warn('[diff.logic] localStorage write failed:', e);
  }
}

export function computeDiff(original: string, modified: string, mode: ViewMode): string {
  try {
    const oldStr = (original ?? '').trim();
    const newStr = (modified ?? '').trim();

    if (!oldStr && !newStr) {
      return '<div class="text-center text-muted p-5 fs-4">Paste HTML to see the difference</div>';
    }

    let diffStr: string;

    if (oldStr === newStr) {
      return '<div class="text-center text-success p-5 fs-4">No changes detected</div>';
    } else {
      // Use jsdiff to create unified diff patch
      diffStr = Diff.createTwoFilesPatch(
        'Original',
        'Modified',
        oldStr,
        newStr,
        '',
        '',
        { context: 3 }
      );
    }

    // Parse the diff string into JSON
    const diffJson = Diff2Html.parse(diffStr);

    const config = {
      outputFormat: mode === 'side-by-side' ? 'side-by-side' : 'line-by-line',
      drawFileList: false,
      matching: 'lines',
      highlight: true,
    };

    const htmlOutput = Diff2Html.html(diffJson, config);
    console.log('[diff.logic] Success – diff generated', { oldLen: oldStr.length, newLen: newStr.length });
    return htmlOutput;

  } catch (err) {
    console.error('[diff.logic] computeDiff crashed:', err);
    return `
      <div class="alert alert-danger m-4">
        <h5>Diff Failed</h5>
        <p><strong>Error:</strong> ${err instanceof Error ? err.message : 'Unknown'}</p>
        <p>Try simpler or smaller HTML.</p>
      </div>
    `;
  }
}

export function swapInputs(a: string, b: string): [string, string] {
  return [b, a];
}

export function clearAll(): [string, string] {
  return ['', ''];
}

export async function copyResultToClipboard(html: string): Promise<boolean> {
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([html.replace(/<[^>]*>/g, '')], { type: 'text/plain' })
      })
    ]);
    return true;
  } catch (err) {
    console.error('[diff.logic] Copy failed:', err);
    return false;
  }
}