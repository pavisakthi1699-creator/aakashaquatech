/**
 * Universal Asset URL Resolver
 * Resolves static assets (images, videos, logos) correctly across:
 * - Subfolder deployments (e.g. /version2.0/)
 * - Root domain deployments (e.g. /)
 * - Localhost Vite development
 */
export function assetUrl(path: string | undefined | null): string {
  if (!path) return '';

  // Already an absolute external URL or data URI
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const clean = path.replace(/^\/+/, '');

  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && (segments[0].toLowerCase().startsWith('version') || segments[0].toLowerCase().startsWith('v2'))) {
      return `/${segments[0]}/${clean}`;
    }
  }

  return `/${clean}`;
}
