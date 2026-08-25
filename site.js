(() => {
  const atlas = window.ScriptureAtlasData;
  if (!atlas) return;

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function topicById(id) {
    return atlas.getTopicById(id);
  }

  function currentTopic() {
    return topicById(atlas.getCurrentTopicId());
  }

  function passagesForTopic(topicId) {
    return atlas.passages.filter((passage) => passage.topic === topicId);
  }

  function setAccent(topic) {
    document.documentElement.style.setProperty("--accent", topic.color);
    document.documentElement.style.setProperty("--accent-soft", `${topic.color}26`);
    document.documentElement.style.setProperty("--accent-glow", `${topic.color}47`);
  }

  function setCurrentTopic(id) {
    atlas.setCurrentTopicId(id);
    setAccent(topicById(id));
  }

  function matchesSearch(text, term) {
    return !term || text.toLowerCase().includes(term.toLowerCase());
  }

  function churchSearchUrl(query) {
    return `https://www.churchofjesuschrist.org/search?lang=eng&query=${encodeURIComponent(query)}`;
  }

  function scriptureUrl(ref) {
    return churchSearchUrl(ref);
  }

  function escapeHtml(text) {
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function scriptureLink(ref, className = "") {
    const classAttr = className ? ` class="${className}"` : "";
    return `<a${classAttr} href="${scriptureUrl(ref)}" target="_blank" rel="noopener noreferrer" data-scripture-link>${escapeHtml(ref)}</a>`;
  }

  function initReveal() {
    const elements = qsa(".reveal");
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    elements.forEach((el) => observer.observe(el));
  }

  function initPointerParallax() {
    const stage = qs("[data-parallax-stage]");
    if (!stage) return;
    let raf = null;
    window.addEventListener("pointermove", (event) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 8;
        stage.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.04)`;
        raf = null;
      });
    });
  }

  function stopScriptureLinkPropagation(root = document) {
    qsa("[data-scripture-link]", root).forEach((link) => {
      link.addEventListener("click", (event) => event.stopPropagation());
    });
  }

  function createTopicCard(topic, activeId, onSelect) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `theme${topic.id === activeId ? " active" : ""}`;
    button.dataset.theme = topic.id;
    button.style.setProperty("--theme-color", topic.color);
    const count = passagesForTopic(topic.id).length;
    button.innerHTML = `
      <div class="label">
        <strong>${escapeHtml(topic.name)}</strong>
        <em>${escapeHtml(topic.teaser)}</em>
      </div>
      <p>${escapeHtml(topic.summary)}</p>
      <span class="count">${count} key passages</span>
    `;
    button.addEventListener("click", () => onSelect(topic.id));
    return button;
  }

  function createPassageCard(passage, activeId, onSelect) {
    const article = document.createElement("article");
    article.className = `verse${passage.id === activeId ? " active" : ""}`;
    article.tabIndex = 0;
    article.role = "button";
    article.ariaLabel = `${passage.ref} ${passage.title}`;
    article.innerHTML = `
      <div class="verse-top">
        ${scriptureLink(passage.ref, "verse-ref")}
        <span>${escapeHtml(passage.book)}</span>
      </div>
      <p>${escapeHtml(passage.excerpt)}</p>
      <div class="tag-row">
        ${passage.tags.map((tag) => `<span class="tag dot" style="--chip:${topicById(passage.topic).color}">${escapeHtml(tag)}</span>`).join("")}
      </div>
    `;
    const activate = () => onSelect(passage.id);
    article.addEventListener("click", activate);
    article.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
    stopScriptureLinkPropagation(article);
    return article;
  }

  function scoreCatalogItem(item, term) {
    const q = term.trim().toLowerCase();
    if (!q) return 0;
    const hay = item.searchText.toLowerCase();
    if (hay === q) return 120;
    if (hay.startsWith(q)) return 100;
    if (hay.includes(q)) return 80 - hay.indexOf(q) / 20;
    const tokens = q.split(/\s+/).filter(Boolean);
    let score = 0;
    tokens.forEach((token) => {
      if (hay.startsWith(token)) score += 25;
      else if (hay.includes(token)) score += 12;
    });
    return score;
  }

  function initExplorePage() {
    const state = {
      topicId: atlas.getCurrentTopicId(),
      mode: "topics",
      query: "",
      selectedKind: "topic",
      selectedId: atlas.getCurrentTopicId(),
      selectedScriptureId: null,
    };

    const workspace = qs("[data-workspace]");
    const primaryGrid = qs("[data-primary-grid]");
    const stream = qs("[data-stream]");
    const detailTitle = qs("[data-detail-title]");
    const detailRef = qs("[data-detail-ref]");
    const detailExcerpt = qs("[data-detail-excerpt]");
    const detailNote = qs("[data-detail-note]");
    const detailMeta = qs("[data-detail-meta]");
    const detailLabel = qs("[data-detail-label]");
    const detailActions = qs("[data-detail-actions]");
    const suggestions = qs("[data-suggestions]");
    const searchInput = qs("[data-search]");
    const topicCount = qs("[data-topic-count]");
    const modeButtons = qsa("[data-mode-button]");
    const topicPassagesWrap = qs("[data-topic-passages-wrap]");
    const topicPassagesTitle = qs("[data-topic-passages-title]");
    const topicPassagesCount = qs("[data-topic-passages-count]");
    const topicPassagesList = qs("[data-topic-passages-list]");
    const scripturePanel = qs("[data-scripture-panel]");
    const scriptureTitle = qs("[data-scripture-title]");
    const scriptureRef = qs("[data-scripture-ref]");
    const scriptureExcerpt = qs("[data-scripture-excerpt]");
    const scriptureNote = qs("[data-scripture-note]");
    const scriptureActions = qs("[data-scripture-actions]");
    const scriptureMeta = qs("[data-scripture-meta]");
    const scriptureModal = qs("[data-scripture-modal]");
    const scriptureModalTitle = qs("[data-scripture-modal-title]");
    const scriptureModalRef = qs("[data-scripture-modal-ref]");
    const scriptureModalExcerpt = qs("[data-scripture-modal-excerpt]");
    const scriptureModalNote = qs("[data-scripture-modal-note]");
    const scriptureModalActions = qs("[data-scripture-modal-actions]");
    const scriptureModalMeta = qs("[data-scripture-modal-meta]");
    const closeScriptureButtons = qsa("[data-close-scripture]");

    function isMobileLayout() {
      return window.matchMedia("(max-width: 1080px)").matches;
    }

    function setScriptureActions(container, passage) {
      if (!container) return;
      container.innerHTML = `
        <a class="btn primary" href="${escapeHtml(scriptureUrl(passage.ref))}" target="_blank" rel="noopener noreferrer">Read on church site</a>
      `;
    }

    function setScriptureMeta(container, passage, topic) {
      if (!container) return;
      container.innerHTML = `
        <div class="meta-box"><span>Type</span><strong>Scripture</strong></div>
        <div class="meta-box"><span>Topic</span><strong>${escapeHtml(topic.name)}</strong></div>
        <div class="meta-box"><span>Collection</span><strong>${escapeHtml(passage.testament)}</strong></div>
        <div class="meta-box"><span>Tags</span><strong>${escapeHtml(passage.tags.join(" • "))}</strong></div>
      `;
    }

    function closeScriptureDetail() {
      state.selectedScriptureId = null;
      if (workspace) workspace.classList.remove("has-scripture-detail");
      if (scripturePanel) scripturePanel.hidden = true;
      if (scriptureModal) scriptureModal.hidden = true;
      document.body.classList.remove("modal-open");
    }

    function openScriptureDetail(id) {
      state.selectedScriptureId = id;
    }

    function renderDetailActions(items) {
      if (!detailActions) return;
      detailActions.innerHTML = items.map((item) => `
        <a class="btn ${item.kind}" href="${escapeHtml(item.href)}"${item.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${escapeHtml(item.label)}</a>
      `).join("");
    }

    function updateDetail(kind, id) {
      state.selectedKind = kind;
      state.selectedId = id;

      if (kind === "topic") {
        const topic = topicById(id);
        const related = passagesForTopic(topic.id);
        detailTitle.textContent = topic.name;
        detailRef.textContent = `${related.length} passages in this set`;
        detailExcerpt.textContent = topic.summary;
        detailNote.textContent = topic.teaser;
        detailMeta.innerHTML = `
          <div class="meta-box"><span>Type</span><strong>Topic</strong></div>
          <div class="meta-box"><span>Best for</span><strong>${escapeHtml(topic.teaser)}</strong></div>
          <div class="meta-box"><span>Passages</span><strong>${related.length} key references</strong></div>
          <div class="meta-box"><span>Search</span><strong>Topic and scripture</strong></div>
        `;
        renderDetailActions([
          { label: "Search church resources", href: churchSearchUrl(topic.name), kind: "ghost", external: true },
        ]);
        return;
      }

      const passage = atlas.passages.find((entry) => entry.id === id) ?? atlas.passages[0];
      const topic = topicById(passage.topic);
      detailTitle.textContent = passage.title;
      detailRef.innerHTML = `${scriptureLink(passage.ref, "detail-ref-link")} <span class="detail-ref-book">• ${escapeHtml(passage.book)}</span>`;
      detailExcerpt.textContent = passage.excerpt;
      detailNote.textContent = passage.note;
      setScriptureMeta(detailMeta, passage, topic);
      renderDetailActions([
        { label: "Read on church site", href: scriptureUrl(passage.ref), kind: "primary", external: true },
      ]);
      stopScriptureLinkPropagation(detailRef);
    }

    function renderScriptureDetail() {
      const passage = atlas.passages.find((entry) => entry.id === state.selectedScriptureId);
      if (!passage) {
        closeScriptureDetail();
        return;
      }

      const topic = topicById(passage.topic);
      const useModal = isMobileLayout();

      if (scriptureTitle) scriptureTitle.textContent = passage.title;
      if (scriptureRef) scriptureRef.innerHTML = `${scriptureLink(passage.ref, "detail-ref-link")} <span class="detail-ref-book">• ${escapeHtml(passage.book)}</span>`;
      if (scriptureExcerpt) scriptureExcerpt.textContent = passage.excerpt;
      if (scriptureNote) scriptureNote.textContent = passage.note;
      setScriptureActions(scriptureActions, passage);
      setScriptureMeta(scriptureMeta, passage, topic);
      stopScriptureLinkPropagation(scripturePanel);

      if (scriptureModalTitle) scriptureModalTitle.textContent = passage.title;
      if (scriptureModalRef) scriptureModalRef.innerHTML = `${scriptureLink(passage.ref, "detail-ref-link")} <span class="detail-ref-book">• ${escapeHtml(passage.book)}</span>`;
      if (scriptureModalExcerpt) scriptureModalExcerpt.textContent = passage.excerpt;
      if (scriptureModalNote) scriptureModalNote.textContent = passage.note;
      setScriptureActions(scriptureModalActions, passage);
      setScriptureMeta(scriptureModalMeta, passage, topic);
      stopScriptureLinkPropagation(scriptureModal);

      if (workspace) workspace.classList.toggle("has-scripture-detail", !useModal);
      if (scripturePanel) scripturePanel.hidden = useModal;
      if (scriptureModal) scriptureModal.hidden = !useModal;
      document.body.classList.toggle("modal-open", useModal);
    }

    function renderPrimary() {
      primaryGrid.innerHTML = "";
      if (state.mode === "topics") {
        topicCount.textContent = `${atlas.topics.length} topic sets`;
        if (detailLabel) detailLabel.textContent = "Topic view";
        atlas.topics.forEach((topic) => primaryGrid.appendChild(createTopicCard(topic, state.topicId, selectTopic)));
        return;
      }

      topicCount.textContent = `${atlas.passages.length} key passages`;
      if (detailLabel) detailLabel.textContent = "Scripture view";
      const query = state.query.trim();
      const items = atlas.passages
        .filter((passage) => matchesSearch([passage.ref, passage.title, passage.excerpt, passage.note, passage.book, passage.testament, topicById(passage.topic).name, ...passage.tags].join(" "), query))
        .sort((a, b) => a.ref.localeCompare(b.ref));
      items.forEach((passage) => primaryGrid.appendChild(createPassageCard(passage, state.selectedId, selectPassage)));
      if (!items.length) {
        primaryGrid.innerHTML = `<div class="verse"><div class="verse-top"><strong>No scripture matches</strong><span>Try a broader word</span></div><p>Search by reference, topic, tag, or a spiritual need.</p></div>`;
      }
    }

    function renderTopicPassages() {
      if (!topicPassagesWrap || !topicPassagesList || !topicPassagesTitle || !topicPassagesCount) return;
      const topic = topicById(state.topicId);
      const related = passagesForTopic(state.topicId).filter((passage) => matchesSearch([passage.ref, passage.title, passage.excerpt, passage.note, ...passage.tags].join(" "), state.query.trim()));
      topicPassagesWrap.hidden = state.mode !== "topics";
      if (state.mode !== "topics") return;
      topicPassagesTitle.textContent = `Passages in ${topic.name}`;
      topicPassagesCount.textContent = `${related.length} passages`;
      topicPassagesList.innerHTML = "";
      related.forEach((passage) => topicPassagesList.appendChild(createPassageCard(passage, state.selectedScriptureId, inspectPassage)));
      if (!related.length) {
        topicPassagesList.innerHTML = `<div class="verse"><div class="verse-top"><strong>No related scriptures</strong><span>Try a different word</span></div><p>Choose another topic or broaden the search.</p></div>`;
      }
    }

    function renderStream() {
      stream.innerHTML = "";
      if (state.mode === "topics") {
        stream.hidden = true;
        return;
      }
      stream.hidden = false;
      const query = state.query.trim();
      const related = passagesForTopic(state.topicId).filter((passage) => matchesSearch([passage.ref, passage.title, passage.excerpt, passage.note, ...passage.tags].join(" "), query));
      related.forEach((passage) => stream.appendChild(createPassageCard(passage, state.selectedScriptureId, selectPassage)));
      if (!related.length) {
        stream.innerHTML = `<div class="verse"><div class="verse-top"><strong>No related scriptures</strong><span>Try a different word</span></div><p>Choose another topic or broaden the search.</p></div>`;
      }
    }

    function selectTopic(id) {
      state.topicId = id;
      state.selectedKind = "topic";
      state.selectedId = id;
      state.mode = "topics";
      state.selectedScriptureId = null;
      setCurrentTopic(id);
      syncTopicUI();
      render();
    }

    function inspectPassage(id) {
      const passage = atlas.passages.find((entry) => entry.id === id);
      if (!passage) return;
      state.topicId = passage.topic;
      state.selectedKind = "topic";
      state.selectedId = passage.topic;
      openScriptureDetail(id);
      setCurrentTopic(passage.topic);
      syncTopicUI();
      render();
    }

    function selectPassage(id) {
      const passage = atlas.passages.find((entry) => entry.id === id);
      if (!passage) return;
      state.topicId = passage.topic;
      state.mode = "scriptures";
      state.selectedKind = "scripture";
      state.selectedId = id;
      openScriptureDetail(id);
      setCurrentTopic(passage.topic);
      syncTopicUI();
      render();
    }

    function syncTopicUI() {
      const topic = topicById(state.topicId);
      setAccent(topic);
    }

    function updateSuggestions() {
      const query = state.query.trim();
      if (!query) {
        suggestions.hidden = true;
        suggestions.innerHTML = "";
        return;
      }

      const catalog = [
        ...atlas.topics.map((topic) => ({
          kind: "Topic",
          id: topic.id,
          title: topic.name,
          searchText: [topic.name, topic.summary, topic.teaser].join(" "),
        })),
        ...atlas.passages.map((passage) => ({
          kind: "Scripture",
          id: passage.id,
          title: passage.ref,
          searchText: [passage.ref, passage.title, passage.excerpt, passage.note, passage.book, passage.testament, topicById(passage.topic).name, ...passage.tags].join(" "),
        })),
      ];

      const results = catalog
        .map((item) => ({ ...item, score: scoreCatalogItem(item, query) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);

      suggestions.innerHTML = "";

      if (!results.length) {
        suggestions.hidden = true;
        return;
      }

      suggestions.hidden = false;

      results.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "suggestion";
        button.innerHTML = `
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.kind)}</span>
        `;
        button.addEventListener("click", () => {
          if (item.kind === "Topic") selectTopic(item.id);
          else selectPassage(item.id);
          state.query = "";
          searchInput.value = "";
          render();
        });
        suggestions.appendChild(button);
      });
    }

    function applySelectedCards() {
      qsa(".theme").forEach((button) => {
        button.classList.toggle("active", button.dataset.theme === state.topicId && state.mode === "topics");
      });
    }

    function render() {
      renderPrimary();
      renderTopicPassages();
      renderStream();
      updateSuggestions();
      applySelectedCards();
      if (state.selectedScriptureId) renderScriptureDetail();
      else closeScriptureDetail();

      if (state.selectedKind === "topic") updateDetail("topic", state.selectedId);
      else updateDetail("scripture", state.selectedId);

      modeButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mode === state.mode)));
    }

    modeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        state.mode = button.dataset.mode;
        closeScriptureDetail();
        if (state.mode === "topics") {
          state.selectedKind = "topic";
          state.selectedId = state.topicId;
        } else {
          const first = passagesForTopic(state.topicId)[0] ?? atlas.passages[0];
          state.selectedKind = "scripture";
          state.selectedId = first.id;
        }
        render();
      });
    });

    closeScriptureButtons.forEach((button) => {
      button.addEventListener("click", closeScriptureDetail);
    });

    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        state.query = event.target.value;
        render();
      });
    }

    window.addEventListener("resize", () => {
      if (state.selectedScriptureId) renderScriptureDetail();
    });

    syncTopicUI();
    render();
  }

  function initNav() {
    qsa(".navlinks a").forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add("active");
      }
    });
  }

  function init() {
    setAccent(currentTopic());
    initReveal();
    initPointerParallax();
    initNav();
    const page = document.body.dataset.page;
    if (page === "explore") initExplorePage();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
