(function(){
    const SVG_ATTRS = 'fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

    const ICONS = {
        photoshop: '<svg ' + SVG_ATTRS + '><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
        chrome: '<svg ' + SVG_ATTRS + '><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
        project: '<svg ' + SVG_ATTRS + '><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
        folder: '<svg ' + SVG_ATTRS + '><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>',
        copy: '<svg ' + SVG_ATTRS + '><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
        external: '<svg ' + SVG_ATTRS + '><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
        plus: '<svg ' + SVG_ATTRS + '><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
    };

    // 应用列表：后续新增应用只需往这里加一项（category 决定出现在哪个子页面）
    const APPS = [
        {
            id: 'photoshop-asset-connector',
            category: 'plugin',
            icon: ICONS.photoshop,
            nameKey: 'moreApps.ps.name',
            descKey: 'moreApps.ps.desc',
            tagKey: 'moreApps.tag.plugin',
            path: 'tools/photoshop-asset-connector',
            action: { type: 'copy', icon: ICONS.copy, labelKey: 'moreApps.copyPath' }
        },
        {
            id: 'chrome-asset-importer',
            category: 'plugin',
            icon: ICONS.chrome,
            nameKey: 'moreApps.chrome.name',
            descKey: 'moreApps.chrome.desc',
            tagKey: 'moreApps.tag.plugin',
            path: 'tools/chrome-local-asset-importer',
            action: { type: 'copy', icon: ICONS.copy, labelKey: 'moreApps.copyPath' }
        },
        {
            id: 'project-home',
            category: 'online',
            icon: ICONS.project,
            nameKey: 'moreApps.project.name',
            descKey: 'moreApps.project.desc',
            tagKey: 'moreApps.tag.online',
            path: 'https://github.com/qianyuniao/qianyuniao-Canvas',
            action: { type: 'open', icon: ICONS.external, labelKey: 'moreApps.openLink' }
        }
    ];

    let statusTimer = null;

    function t(key){
        return window.StudioI18n?.t?.(key) || key;
    }

    function showStatus(text){
        const el = document.getElementById('moreStatus');
        if(!el) return;
        el.textContent = text;
        el.classList.add('is-visible');
        clearTimeout(statusTimer);
        statusTimer = setTimeout(() => el.classList.remove('is-visible'), 2000);
    }

    async function copyText(text){
        try {
            if(navigator.clipboard && window.isSecureContext){
                await navigator.clipboard.writeText(text);
                return true;
            }
        } catch(e) {}
        try {
            const area = document.createElement('textarea');
            area.value = text;
            area.setAttribute('readonly', '');
            area.style.position = 'fixed';
            area.style.opacity = '0';
            document.body.appendChild(area);
            area.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(area);
            return ok;
        } catch(e) {
            return false;
        }
    }

    function placeholderCard(){
        const card = document.createElement('div');
        card.className = 'app-card is-placeholder';
        card.innerHTML =
            '<div class="app-placeholder-icon">' + ICONS.plus + '</div>' +
            '<div class="app-placeholder-title" data-i18n="moreApps.comingTitle">敬请期待</div>' +
            '<div class="app-placeholder-desc" data-i18n="moreApps.comingDesc">更多应用正在接入，可在此页继续扩展。</div>';
        return card;
    }

    function renderCard(app){
        const card = document.createElement('div');
        card.className = 'app-card';
        card.dataset.appId = app.id;

        const isOpen = app.action.type === 'open';
        const pathLabel = isOpen ? '' :
            '<div class="app-path">' + ICONS.folder + '<span>' + app.path + '</span></div>';

        card.innerHTML =
            '<div class="app-top">' +
                '<div class="app-icon">' + app.icon + '</div>' +
                '<div class="app-heading">' +
                    '<div class="app-name" data-i18n="' + app.nameKey + '"></div>' +
                    '<span class="app-tag" data-i18n="' + app.tagKey + '"></span>' +
                '</div>' +
            '</div>' +
            '<div class="app-desc" data-i18n="' + app.descKey + '"></div>' +
            pathLabel +
            '<div class="app-actions">' +
                '<button class="app-btn is-primary" type="button" data-action="' + app.action.type + '" data-value="' + app.path + '">' +
                    app.action.icon + '<span data-i18n="' + app.action.labelKey + '"></span>' +
                '</button>' +
            '</div>';

        card.querySelector('[data-action]')?.addEventListener('click', async event => {
            const value = event.currentTarget.dataset.value || '';
            if(event.currentTarget.dataset.action === 'open'){
                window.open(value, '_blank', 'noopener');
                return;
            }
            const ok = await copyText(value);
            showStatus(ok ? t('moreApps.copied') : t('moreApps.copyFail'));
        });

        return card;
    }

    function render(){
        const grid = document.getElementById('moreAppsGrid');
        if(!grid) return;
        // 页面通过 <body data-app-category="plugin|online"> 指定要展示的分类
        const category = document.body?.dataset?.appCategory || 'plugin';
        grid.innerHTML = '';
        APPS.filter(app => app.category === category).forEach(app => grid.appendChild(renderCard(app)));
        grid.appendChild(placeholderCard());
        window.StudioI18n?.apply?.();
    }

    // 跟随外壳的语言切换
    window.addEventListener('message', event => {
        if(event.data?.type === 'studio-lang'){
            try { localStorage.setItem('studio_lang', event.data.lang === 'en' ? 'en' : 'zh'); } catch(e) {}
            window.StudioI18n?.apply?.();
        }
    });

    document.addEventListener('DOMContentLoaded', render);
    if(document.readyState !== 'loading') render();
})();
