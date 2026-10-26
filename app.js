/**
 * ARQUIVERSO — Interactive Landing Page Controller (Luminous Pastel Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================================
     1. DATOS CONCISOS DE LOS 7 MÓDULOS DEL SISTEMA OPERATIVO
     ======================================================================== */
  const MODULES_DATA = {
    dashboard: {
      code: 'MÓDULO 01 // DASHBOARD',
      badge: 'TIEMPO REAL',
      screenshot: './Dashboard.jpeg',
    },

    proyectos: {
      code: 'MÓDULO 02 // PROYECTOS',
      badge: 'DE PRINCIPIO A FIN',
      screenshot: './Proyectos.jpeg',
    },

    tareas: {
      code: 'MÓDULO 03 // TAREAS',
      badge: 'EJECUCIÓN DIARIA',
      screenshot: './Tareas.jpeg',
    },

    equipo: {
      code: 'MÓDULO 04 // EQUIPO',
      badge: 'CAPACIDAD REAL',
      screenshot: './Equipo.jpeg',
    },

    finanzas: {
      code: 'MÓDULO 05 // FINANZAS',
      badge: 'METAS Y PRESUPUESTO',
      screenshot: './Finanzas.jpeg',
    },

    basededatos: {
      code: 'MÓDULO 06 // BASE DE DATOS',
      badge: 'MEMORIA CENTRAL',
      screenshot: './Clientes.jpeg',
    },

    administrativo: {
      code: 'MÓDULO 07 // ADMINISTRATIVO',
      badge: 'ORDEN OPERATIVO',
      screenshot: './Administrativo.jpeg',
    },
  };

  /* ========================================================================
     2. CAMBIO INTERACTIVO DE MÓDULOS OS
     ======================================================================== */
  const moduleTabs = document.querySelectorAll('.module-tab');
  const stageBody = document.getElementById('stageBody');
  const stageCode = document.getElementById('stageCode');
  const stageBadge = document.getElementById('stageBadge');
  const stageScreenshotWrap = document.getElementById('stageScreenshotWrap');
  const stageScreenshotImg = document.getElementById('stageScreenshotImg');
  const stageDynamicContent = document.getElementById('stageDynamicContent');
  const stageTitle = document.getElementById('stageTitle');
  const stageSubtitle = document.getElementById('stageSubtitle');
  const stageMetrics = document.getElementById('stageMetrics');
  const stageVisual = document.getElementById('stageVisual');
  const stageChecklist = document.getElementById('stageChecklist');

  function activateModule(moduleKey) {
    const data = MODULES_DATA[moduleKey];
    if (!data) return;

    moduleTabs.forEach((btn) => {
      const isMatch = btn.getAttribute('data-module') === moduleKey;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    stageBody.classList.add('switching');

    setTimeout(() => {
      stageCode.textContent = data.code;
      stageBadge.textContent = data.badge;

      if (data.screenshot) {
        stageScreenshotImg.src = data.screenshot;
        stageScreenshotWrap.hidden = false;
        stageDynamicContent.hidden = true;
      } else {
        stageScreenshotWrap.hidden = true;
        stageDynamicContent.hidden = false;
        stageTitle.textContent = data.title;
        stageSubtitle.textContent = data.subtitle;

        stageMetrics.innerHTML = data.metrics
          .map(
            (m) => `
            <div class="stage-metric-box">
              <span class="sm-label">${m.label}</span>
              <strong class="sm-val">${m.val}</strong>
              <span class="sm-tag ${m.tagClass}">${m.tag}</span>
            </div>
          `
          )
          .join('');

        stageVisual.innerHTML = data.visualHTML;
        stageChecklist.innerHTML = data.checklist
          .map((item) => `<li>${item}</li>`)
          .join('');
      }

      stageBody.classList.remove('switching');
    }, 170);
  }

  moduleTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activateModule(tab.getAttribute('data-module'));
    });
  });

  /* ========================================================================
     3. MODAL INTERACTIVO CONSULTIVO
     ======================================================================== */
  const modal = document.getElementById('consultModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const doneModalBtn = document.getElementById('doneModalBtn');
  const modalFormView = document.getElementById('modalFormView');
  const modalSuccessView = document.getElementById('modalSuccessView');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalSubmitText = document.getElementById('modalSubmitText');
  const intentInput = document.getElementById('intentInput');
  const arquiversoForm = document.getElementById('arquiversoForm');
  const teamChips = document.querySelectorAll('#teamSizeSelector .chip-option');
  let selectedTeamSize = '1-5 personas (Start)';

  const MODAL_CONFIG = {
    'early-access': {
      badge: 'PROGRAMA ARQUIVERSO',
      title: 'Aplica al programa Arquiverso',
      desc: 'Transforma y opera tu estudio de arquitectura con nuestros dos núcleos: Mentoría 1:1 + Herramienta.',
      cta: 'Aplicar al programa',
    },
    demo: {
      badge: 'PROGRAMA ARQUIVERSO',
      title: 'Aplica al programa Arquiverso',
      desc: 'Transforma y opera tu estudio de arquitectura con nuestros dos núcleos: Mentoría 1:1 + Herramienta.',
      cta: 'Aplicar al programa',
    },
    'plan-start': {
      badge: 'PASO 01 · SISTEMA INICIAL "NÚCLEO"',
      title: 'Adquiere el Sistema "Núcleo"',
      desc: 'Alcance funcional base con los 7 módulos esenciales para centralizar la operación y administración del estudio.',
      cta: 'Adquirir Sistema "Núcleo"',
      teamDefault: '1-5 personas (Start)',
    },
    'plan-studio': {
      badge: 'PASO 02 · IMPLEMENTACIÓN GUIADA',
      title: 'Implementación y Acompañamiento',
      desc: '5 componentes estructurados: Sesión Despegue, Video Know-How, Implementación Técnica, 7 Sesiones Pregrabadas y Seguimiento al 1er mes.',
      cta: 'Iniciar Implementación',
      teamDefault: '6-15 personas (Studio / Pro)',
    },
    'plan-scale': {
      badge: 'PASO 03 · LICENCIAS & MÓDULOS ADD-ONS',
      title: 'Escala con Licencias y Add-Ons',
      desc: 'Suma licencias para nuevos miembros y activa Proyectos Kanban, Presupuestos, Cuestionarios, Plantillas y Reportes.',
      cta: 'Explorar Expansión',
      teamDefault: '16+ personas (Scale)',
    },
  };

  function setActiveTeamChip(value) {
    selectedTeamSize = value;
    teamChips.forEach((chip) => {
      chip.classList.toggle('active', chip.getAttribute('data-value') === value);
    });
  }

  teamChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      setActiveTeamChip(chip.getAttribute('data-value'));
    });
  });

  function openModal(modeKey = 'early-access') {
    const cfg = MODAL_CONFIG[modeKey] || MODAL_CONFIG['early-access'];
    intentInput.value = modeKey;
    modalBadge.textContent = cfg.badge;
    modalTitle.textContent = cfg.title;
    modalDescription.textContent = cfg.desc;
    modalSubmitText.textContent = cfg.cta;

    if (cfg.teamDefault) {
      setActiveTeamChip(cfg.teamDefault);
    }

    modalFormView.hidden = false;
    modalSuccessView.hidden = true;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openModal(trigger.getAttribute('data-open-modal'));
    });
  });

  closeModalBtn.addEventListener('click', closeModal);
  doneModalBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  arquiversoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value.trim();
    const studioName = document.getElementById('studioName').value.trim();
    const workEmail = document.getElementById('workEmail').value.trim();

    const submittedDataCard = document.getElementById('submittedDataCard');
    submittedDataCard.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:4px;">
        <div><strong style="color:#121526;">Estudio:</strong> ${studioName} (${selectedTeamSize})</div>
        <div><strong style="color:#121526;">Contacto:</strong> ${fullName} · ${workEmail}</div>
      </div>
    `;

    modalFormView.hidden = true;
    modalSuccessView.hidden = false;
    arquiversoForm.reset();
  });

  /* ========================================================================
     4. MENÚ MÓVIL Y ANIMACIONES SCROLL REVEAL
     ======================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileDrawer.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Configuración de índices de cascada (stagger) para animaciones de entrada */
  document.querySelectorAll('.modules-rail .module-tab').forEach((tab, idx) => {
    tab.style.setProperty('--stagger-index', idx);
  });

  document.querySelectorAll('.transformation-list .shift-row').forEach((row, idx) => {
    row.style.setProperty('--reveal-delay', `${idx * 90}ms`);
  });

  document.querySelectorAll('.pricing-grid .plan-card').forEach((card, idx) => {
    card.style.setProperty('--reveal-delay', `${idx * 150}ms`);
    card
      .querySelectorAll('.nucleo-mod-item, .impl-comp-card, .addon-visual-row')
      .forEach((item, itemIdx) => {
        item.style.setProperty('--item-index', itemIdx);
      });
  });

  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
  );

  revealItems.forEach((el) => observer.observe(el));
});
