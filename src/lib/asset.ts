/**
 * Resolves a path inside /public against Vite's configured `base`
 * (e.g. "/my-storyboard/") so assets work in dev and on GitHub Pages.
 *
 * Usage: asset("assets/img/foo.jpg")
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL; // ends with "/"
  return base + path.replace(/^\/+/, "");
}
