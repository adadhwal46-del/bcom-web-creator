<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep student content and email preparation in the browser-safe portfolio module so the four public routes use a single editable source of truth.
- Use root-level shared navigation and footer around Outlet, with one content route per portfolio page, so navigation and page metadata remain independent.
- Contact prepares a mailto draft without network submission or persistence, keeping the informational portfolio honest about message delivery.
- Define portfolio styling and semantic colors in the global stylesheet and use existing UI controls so presentation stays consistent across pages.
- Use Lovable's project Git sync for source-code repositories; never display repository listings on the student portfolio unless requested.
- Keep sign-up and sign-in on a public `/auth` page and derive shared header account controls from one root auth-state listener, so the portfolio remains public without storing profile records.
