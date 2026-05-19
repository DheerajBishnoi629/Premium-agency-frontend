import { RenderMode, ServerRoute } from '@angular/ssr';
import { BlogService } from './features/blog/blog.service';

export const serverRoutes: ServerRoute[] = [
  {
    // Prerender every blog post by enumerating slugs from the data layer.
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const blog = new BlogService();
      return blog.allSlugs().map((slug) => ({ slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
