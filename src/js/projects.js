async function loadProjects() {
  try {
    const res = await fetch('data/projects.json', { cache: 'no-store' });
    const projects = await res.json();
    const grid = document.getElementById('projects-grid');

    const badge = (text, tone = 'primary') =>
      `<span class="px-2 py-1 text-xs rounded bg-${tone}/20 text-${tone} font-body">${text}</span>`;

    const toneByIndex = (i) => (i % 2 === 0 ? 'primary' : 'secondary');

    const card = (p, i) => {
      const tone = toneByIndex(i);
      const hoverShadow = tone === 'primary' ? 'hover:shadow-glow-primary' : 'hover:shadow-glow-secondary';
      const hoverRing   = tone === 'primary' ? 'group-hover:border-primary' : 'group-hover:border-secondary';
      const hoverBg     = tone === 'primary'
        ? 'rgba(139, 92, 246, 0.1)'
        : 'rgba(74, 222, 128, 0.1)';

      const img = p.image && p.image.length ? p.image : 'assets/img/projects/placeholder.jpg';
      const repoLink = p.repo_url
        ? `<a class="inline-flex items-center mt-4 text-sm font-semibold transition-colors text-secondary hover:brightness-125" href="${p.repo_url}" target="_blank" rel="noopener">Ver no GitHub <span class="ml-1 material-symbols-outlined">arrow_forward</span></a>`
        : '';
      const liveLink = p.live_url
        ? `<a class="inline-flex items-center mt-4 text-sm font-semibold transition-colors text-secondary hover:brightness-125" href="${p.live_url}" target="_blank" rel="noopener">Ver Demo <span class="ml-1 material-symbols-outlined">open_in_new</span></a>`
        : '';

      return `
        <div class="relative flex flex-col overflow-hidden transition-all duration-300 transform border rounded-lg group bg-white/5 border-white/10 hover:-translate-y-1 ${hoverShadow}">
          <div class="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
               style="background: radial-gradient(circle at center, transparent 40%, ${hoverBg});"></div>
          <div class="absolute inset-0 transition-all duration-300 border-2 border-transparent rounded-lg pointer-events-none ${hoverRing}"></div>

          <div class="relative z-10 flex flex-col flex-grow">
            <div class="w-full h-48 bg-center bg-cover" role="img" aria-label="${p.title} cover"
                 style="background-image: url('${img}')"></div>

            <div class="flex flex-col flex-grow gap-4 p-6">
              <h4 class="text-xl font-semibold text-text-primary font-display">${p.title}</h4>
              <p class="text-sm text-text-secondary font-body">${p.description}</p>

              <div class="flex flex-wrap gap-2 mt-auto">
                ${p.tags.map(t => badge(t, tone)).join('')}
              </div>

              <div class="flex gap-4">
                ${repoLink}
                ${liveLink}
              </div>
            </div>
          </div>
        </div>
      `;
    };

    grid.innerHTML = projects.map(card).join('');
  } catch (e) {
    console.error('Erro ao carregar projetos:', e);
    const grid = document.getElementById('projects-grid');
    if (grid) grid.innerHTML = `<p class="text-text-secondary">Não foi possível carregar os projetos agora.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadProjects);
