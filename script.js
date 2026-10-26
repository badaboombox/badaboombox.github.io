/* =========================================================
   Nikhil Reddy — Portfolio · shared script (all pages)

   HOW TO EDIT CONTENT (everything renders from PROJECTS below):
   · Add a project ....... copy any { ... } block, give it a unique id
   · Add photos .......... put files in assets/projects/, then list the
                           paths in that project's `images: []` array.
                           images[0] is the big hero slot on its page.
   · Card/spotlight images `thumb` = image on the Projects-grid card;
                           `feature` = image on the Home-page spotlight.
                           Both fall back to images[0], then to `glyph`.
   · More photo slots .... set `gallerySlots: <n>` on the project
                           (empty slots show as labeled placeholders); unset
                           defaults to the photo count — 1-3 photos render as
                           one equal-size row, 4+ uses the hero-grid layout
   · Info sections ....... each { h: "Heading", list: ["<b>Bold</b> text", ...] }
                           in `sections` becomes a titled box list
   · Spec chips .......... the `meta: { Label: "value" }` pairs
   · Homepage feature .... change FEATURED_ID below
   · Background words .... edit BACKGROUND_WORDS for pages, or a project's
                           backgroundWords: ["Word", "Another word"] field
   ========================================================= */

/* Cross-document View Transitions (@view-transition in styles.css) are flaky
   over file:// navigation — Chrome can leave the tab stuck instead of just
   skipping the animation. Bail out of the transition in that case only; it
   still runs normally once the site is served over http(s). */
addEventListener("pageswap", (e) => {
  if (e.viewTransition && location.protocol === "file:") e.viewTransition.skipTransition();
});

/* Which project is spotlighted on the Home page.
   Use any project id from the PROJECTS array below. */
const FEATURED_ID = "ss-handheld";

const BACKGROUND_WORDS = {
  "index.html": ["Welcome"],
  "about.html": ["Background", "ECE", "Rutgers"],
  "projects.html": ["Radio", "RTL", "Embedded", "Power", "PCB", "ARM", "Program", "Solder", "MCU"],
  "research.html": ["Academic", "Lab", "Professional", "Deep Dive"],
};

const CATEGORY = {
  power:    { label: "Power Electronics", color: "var(--c-power)" },
  embedded: { label: "Embedded Systems",  color: "var(--c-embedded)" },
  rf:       { label: "RF / Radio",        color: "var(--c-rf)" },
  fpga:     { label: "FPGA / Graphics",   color: "var(--c-fpga)" },
  analog:   { label: "Analog / Power",    color: "var(--c-analog)" },
  testing:  { label: "Test Platform",     color: "var(--c-embedded)" },
};

/* Order here = display order on the Projects page. */
const PROJECTS = [
  {
    id: "ss-handheld",
    backgroundWords: ["GAME CONSOLE", "FPGA", "STM32", "VERILOG", "3D RASTERIZATION"],
    tag: "METAL RENDERING",          
    name: "SS Handheld Console",
    glyph: "🎮",
    thumb: "assets/projects/board_angled.png",         
    feature: "assets/projects/20260903_144341.jpg",    // Home-page spotlight image (falls back to images[0], then glyph)
    images: ["assets/projects/20260906_183621.jpg", "assets/projects/20260906_183207.jpg",
      "assets/projects/20260906_183227.jpg", "assets/projects/20260906_183628.jpg",
      "assets/projects/board_angled.png", "assets/projects/20260903_144341.jpg"],
    primary: "fpga",
    cats: ["fpga", "embedded", "verilog"],
    stage: "PROGRAMMING/BRING-UP",
    tagline: "A custom handheld console that runs DS-era games natively on an STM32 paired with an FPGA programmed as a real graphics processor.",
    tech: ["STM32H743", "Lattice ECP5-85", "Verilog", "32-bit SDRAM", "RasterIX", "OpenGL ES 1.1"],
    meta: { Role: "System architecture + HW", Performance: "480×272 @ 60 FPS", GPU: "ECP5 FPGA" },
    intro: "A from-scratch handheld inspired by the Nintendo DS's CPU-plus-graphics-hardware split. An STM32 runs the game and 3D setup while a Lattice ECP5 FPGA is a custom graphics processor with a 2D tile/sprite engine and a textured hardware 3D engine. It drives an LCD at a locked 60 FPS, running the game natively",
    sections: [
      {
        h: "Architecture",
        list: [
          "<b>CPU/GPU split (DS-style):</b> the STM32H743 runs game logic, audio, input, and 3D matrix setup; the FPGA owns graphics SDRAM and does all 3D generation, culling, rasterization and scanout.",
          "<b>Custom 2D PPU in Verilog:</b> Created a GBA-style scanline engine with 4 background layers (with affine) + 128 sprites that is composited line-by-line from buffers.",
          "<b>3D rasterizer:</b> integrated the open-source RasterIX core (perspective-correct texturing, 16-bit Z, alpha) and ported it to ECP5 EBR with fixed-point interpolation to save logic.",
        ],
      },
      {
        h: "Systems Engineering",
        list: [
          "<b>Real-time scanline compositor</b> merges the 2D layers and the upscaled 3D buffer straight to a 480×272 RGB panel, running culling before display for a locked 60 FPS output.",
          "<b>Hardware Geometry Engine:</b> The STM32 runs the game and sets up the 3D matrices, then sends transformed vertices to the FPGA for rasterization. The FPGA handles clipping, perspective division, and triangle setup in hardware.",
          "<b>CPU↔FPGA link:</b> FMC bus with logical address windows + a vblank IRQ, timing tightened to logical max for 60 FPS at 480×272 with 3D and 2D layers active.",
        ],
      },
      {
        h: "Status",
        list: [
          "Bring-up complete, 60 FPS has been achieved on actual hardware at maximum load",
          "Live T&L still testing to keep ideal performance, RTL restructure in progress",
        ],
      },
    ],
  },
  {
    id: "radio-rack",
    backgroundWords: ["HAM RADIO", "MODULAR", "PORTABLE", "HIGH-POWER"],
    tag: "HAM RADIO",
    name: "All-band, All-mode Transceiver",
    glyph: "📻",
    thumb: "assets/projects/racklayout.png",
    feature: "assets/projects/racklayout.png",
    images: ["assets/projects/racklayout.png", "assets/projects/codecbase.png", "assets/projects/paschema.png", "assets/projects/20260906_183048.jpg"],
    primary: "rf",
    cats: ["rf", "embedded", "analog"],
    stage: "DESIGN",
    tagline: "A modular amateur radio SDR transceiver with swappable band-pass filters and full repeater control, built around a Cortex-M7 MCU and a stereo audio codec.",
    tech: ["STM32H7", "Custom PA", "Si5351", "LNA", "KiCad"],
    meta: { Role: "Hardware + firmware", Filters: "80M, 40M, 15M, 10M", MCU: "Cortex-M7 @ 550 MHz" },
    intro: "A custom amateur radio SDR transceiver with swappable band-pass filters and full repeater control, built around a Cortex-M7 MCU and a stereo audio codec. The system is designed for high-power operation and portability.",
    sections: [
      {
        h: "System Architecture",
        list: [
          "<b>Modular design:</b> Each band-pass filter simply plugs into the main board, allowing the SDR to switch between completely different frequency bands without needing to redesign the entire system.",
          "<b>Repeater Function:</b> The controller can cross-route RX→TX for repeater operation, allowing the transceiver to run duplex operation as a repeater station.",
          "<b>Custom PA & LNA:</b> The transceiver includes a custom power amplifier for high-power transmission and a low-noise amplifier for improved reception sensitivity.",
        ],
      },
      {
        h: "Current Progress",
        list: [
          "<b>Schematic Design</b> complete, PCB layout currently in progress",
          "<b>Programming</b> currently being planned for the STM32H7, including SDR firmware for all DSP functions and repeater control",
        ],
      },
    ],
  },
  {
    id: "robodog-pdb",
    backgroundWords: ["POWER DISTRIBUTION", "BMS", "ROBOT DOG", "60A PEAK"],
    tag: "ANTI-REGEN",
    name: "RoboDog Power Distribution Board",
    glyph: "🐕",
    thumb: "assets/projects/Screenshot 2026-09-10 214702.png",
    feature: "assets/projects/Screenshot 2026-09-10 214612.png",
    images: ["assets/projects/Screenshot 2026-09-10 214702.png", "assets/projects/Screenshot 2026-09-10 214612.png",
      "assets/projects/Screenshot 2026-09-10 214307.png", "assets/projects/Screenshot 2026-09-10 214349.png"
    ],        
    primary: "power",
    cats: ["power", "embedded"],  
    stage: "BUILD",
    tagline: "40 A power-distribution + battery-management board feeding a 12-motor quadruped robot from four parallel LiPo packs.",
    tech: ["BQ76952 BMS", "STM32F042", "LM74700 ideal diode", "CAN", "IRFP4668 clamp", "KiCad"],
    meta: { Role: "Power + BMS design", Bus: "22.2 V / 40 A", Motors: "12 BLDC drivers" },
    intro: "The power backbone for a robotic dog: it takes four parallel 6S LiPo batteries and safely distributes ~1 kW to twelve regenerative motor drivers, while monitoring the pack, reporting over CAN, and surviving the voltage transients that come with regenerative braking.",
    sections: [
      {
        h: "Protection & Power Path",
        list: [
          "<b>Ideal-diode reverse-polarity protection</b> per battery (LM74700 + 1.4 mΩ MOSFET) — near-zero forward drop (~0.14 W at 10 A) instead of a lossy series diode.",
          "<b>Automatic precharge:</b> a comparator watches cap-bus vs main-bus voltage and bypasses the 220 Ω precharge resistor only once the 6000 µF bulk bank is charged — so the manual breaker closes with <i>zero inrush</i>.",
          "Per-battery 40 A bolt-down fusing (2 kA interrupt) sized for a worst-case pack short of ~675 A.",
        ],
      },
      {
        h: "Battery Management (BMS)",
        list: [
          "<b>BQ76952 AFE</b> monitors all 6 series groups, runs passive cell balancing, and integrates a coulomb-counter via a 1 mΩ main-bus shunt.",
          "<b>STM32F042</b> supervisor reports cell/pack voltage, current, SoC, temperature, and fault state over <b>CAN</b> (SN65HVD230 transceiver).",
          "Fully isolated AUX supply (5 V → 3.3 V LDO) keeps the BMS and precharge logic alive independent of the main bus.",
        ],
      },
      {
        h: "Regenerative Clamp",
        list: [
          "<b>Active shunt clamp</b> (TL431 reference + comparator + IRFP4668 MOSFET) fires above 25.2 V to dump regen energy into off-board 70 W brake resistors.",
          "Handles ~1 kW peak regen transients — protecting the caps, motor drivers, and BMS from overvoltage during hard braking.",
          "Hysteresis on the comparator prevents high-frequency chatter right at the clamp threshold.",
        ],
      },
    ],
  },
  {
    id: "igvc-electrical-system",
    backgroundWords: ["AUTONAV", "DC-ATX POWER", "SAFETY SYSTEM", "CAN", "ROS"],
    tag: "AUTOMOTIVE",
    name: "IGVC Electrical System",
    glyph: "⚡",
    thumb: "assets/projects/igvc.png",
    feature: "assets/projects/20261024_021259.jpg",
    images: ["assets/projects/20261024_021259.jpg", "assets/projects/IGVCPDB.png", "assets/projects/ESTOP.png", "assets/projects/CAN.png", "assets/projects/brake.png",
      "assets/projects/08f459c4-9b29-42e8-a5fa-861f10cd4d9b.jpg"
    ], 
    primary: "embedded",
    cats: ["power", "embedded", "safety", "sensing", "control"],

    stage: "BUILDING", 
    tagline: "Electrical system for an autonomous competition robot - power distribution, safety system, thermal management, sensor integration, and drive control.",
    tech: ["STM32G0", "CAN", "EasyEDA", "Multi-PCB System"],
    meta: { Role: "Hardware + Firmware design", Communication: "FDCAN, UART, ROS Interface", Capabilities: "Temp Control, Power Management, Self-Monitoring" },
    intro: "A complete electrical system for an autonomous competition robot, including power distribution, safety system, thermal management, sensor integration, and drive control. The system is designed to be modular and scalable, allowing for easy upgrades and modifications as the robot evolves.",
    sections: [
      {
        h: "Highlights",
        list: [
          "<b>Extremely Modular:</b> Upgrades can be latched onto the CAN bus without needing to redesign the entire system, and each individual board can be swapped out for a new revision without affecting the rest of the system.",
          "<b>Self-Monitoring:</b> The system includes built-in monitoring capabilities like current sensing, temperature monitoring, and fault detection to ensure safe operation and prevent damage to the robot.",
          "<b>ROS Integration:</b> The system is designed to interface with the Robot Operating System (ROS), allowing for easy integration with higher-level control algorithms and autonomous navigation software.",
        ]
      },
      {
        h: "Future Upgrades",
        list: [
          "<b>Custom O-Drives:</b> Planning to design the HeavyDrive Motor Driver in-house for total ROS control; planned as single-motor modules that sync with each other, allowing for any number of motors to be controlled by a single ROS node.",
          "<b>LiDAR System:</b> Planning to integrate a LiDAR system for improved autonomous navigation and obstacle detection, with the ability to interface with the existing ROS framework.",
          "<b>Advanced AI Integration:</b> Future plans incorporate a Jetson Orin for advanced AI processing, enabling more sophisticated autonomous behaviors and decision-making capabilities while being easier to integrate with the existing ROS framework.",
        ]
      },
    ],
  },
  {
    id: "breakout",
    backgroundWords: ["DEVELOPMENT", "TESTING", "ROCKET SYSTEM", "INTERFACE"],
    tag: "TEST PLATFORM",
    name: "STM32F411 Breakout Board",
    glyph: "📡",
    thumb: "assets/projects/Screenshot 2025-11-25 170501.png",
    feature: "assets/projects/Screenshot 2025-11-25 170501.png",
    images: ["assets/projects/Screenshot 2025-11-25 170501.png", "assets/projects/Screenshot 2025-11-25 164800.png", 
      "assets/projects/rpltestb.jpg"
    ],       
    primary: "embedded",
    cats: ["embedded", "communication", "power"],
    stage: "BUILD",
    tagline: "A breadboard-compatible testing platform for the STM32F411 MCU, with config flash memory, and 40 broken-out GPIOs for sensor and integration testing.",
    tech: ["STM32F411", "Breadboard-Compatible", "2-layer", "Altium Designer"],
    meta: { Role: "Hardware design", Status: "COMPLETE", Memory: "256 KB" },
    intro: "A breadboard-compatible breakout board for the STM32F411 MCU, with 40 broken-out GPIOs, a 3.3 V regulator, and a flash memory chip for configuration storage. Designed for rapid prototyping and testing of embedded flight systems.",
    sections: [
      {
        h: "Highlights",
        list: [
          "Easy to swap sensors and peripherals to test flight controller functionality without expensive rework per iteration of setup.",
          "Extremely cheap and compact with a low production cost, all the while robust enough to serve as a \"golden\" reference for validating deployed flight systems.",
          "External memory allows for rapid prototyping and extra hotplug capabilities for debugging connected peripherals using a custom readback system over SWD or USB in real-time.",
        ],
      },
    ],
  },
  {
    id: "nixie-clock",
    backgroundWords: ["TIMEKEEPING", "170V HV", "4-DIGIT", "RTC"],
    tag: "NEON LIGHTS",
    name: "Nixie Tube Clock",
    glyph: "🕰️",
    thumb: "assets/projects/20260906_183031.jpg",
    feature: "assets/projects/20260906_182850.jpg",
    images: ["assets/projects/20260906_183031.jpg", "assets/projects/20260906_182850.jpg",
      "assets/projects/20260906_182745.jpg", "assets/projects/20260906_182932.jpg"
    ],
    primary: "embedded",
    cats: ["embedded", "analog"],
    stage: "ASSEMBLING",
    tagline: "A 4-digit IN-14 nixie clock with 170 V tube drive and a rotary-encoder UI.",
    tech: ["STM32F030", "170 V HV", "IN-14 tubes", "Rotary encoder", "EasyEDA"],
    meta: { Role: "Hardware design", Display: "4 × IN-14 (HH:MM)", HV: "170 V rail" },
    intro: "A retro HH:MM nixie clock driving four IN-14 tubes plus an IN-3 neon colon. The logic board runs on an STM32F030 and takes a 170 V rail from an external boost stage to strike the tubes.",
    sections: [
      {
        h: "Highlights",
        list: [
          "<b>STM32F030C6T6</b> Cortex-M0 handles timekeeping, multiplexed BCD tube driving, and the colon blink.",
          "Rotary-encoder interface (TIM3 quadrature) for setting the time, with hardware debounce/filtering.",
          "Dual power inputs: 12 V for full operation, USB-C 5 V for programming/logic-only bring-up; 170 V HV arrives from a separate boost-converter board.",
        ],
      },
    ],
  },
];

const byId = (id) => PROJECTS.find((p) => p.id === id);

/* ---------- HOME: FEATURED PROJECT ---------- */
const activeEl = document.getElementById("activeProject");
if (activeEl) {
  const p = byId(FEATURED_ID) || PROJECTS[0];
  const cat = CATEGORY[p.primary];
  const stats = Object.values(p.meta).join("  ·  ");
  const featureImg = p.feature || (p.images && p.images[0]);
  const featureMedia = featureImg
    ? `<img src="${featureImg}" alt="${p.name}" />`
    : `<span class="active__glyph">${p.glyph}</span>`;
  activeEl.innerHTML = `
    <a class="active brackets" style="--cat:${cat.color}" href="project.html?id=${p.id}" aria-label="Open ${p.name}">
      <div class="active__media">
        ${featureMedia}
      </div>
      <div class="active__body">
        <span class="active__label">Active Project</span>
        <h2 class="active__title">${p.name}</h2>
        <p class="active__tag">${p.tagline}</p>
        <p class="active__stats">${stats}</p>
        <span class="active__cta">open project <span>→</span></span>
      </div>
    </a>`;
}

/* ---------- PROJECTS PAGE: GRID ---------- */
const grid = document.getElementById("projectGrid");
if (grid) {
  const cardHTML = (p, i) => {
    const cat = CATEGORY[p.primary];
    const thumbImg = p.thumb || (p.images && p.images[0]);
    const cardMedia = thumbImg
      ? `<img src="${thumbImg}" alt="${p.name}" loading="lazy" />`
      : `<span class="card__glyph">${p.glyph}</span>`;
    return `
    <a class="card" style="--cat:${cat.color}; animation-delay:${i * 50}ms"
       href="project.html?id=${p.id}" aria-label="Open ${p.name}">
      <span class="card__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
      <span class="card__ribbon">${p.stage}</span>
      <div class="card__media">
        ${cardMedia}
      </div>
      <div class="card__body">
        <h3 class="card__title">${p.name}</h3>
        <p class="card__tag">${p.tagline}</p>
        <span class="card__more">open project <span>→</span></span>
      </div>
    </a>`;
  };
  grid.innerHTML = PROJECTS.map(cardHTML).join("");
}

/* ---------- PROJECT DETAIL PAGE (project.html?id=...) ---------- */
const pageEl = document.getElementById("projectPage");
if (pageEl) {
  const id = new URLSearchParams(location.search).get("id");
  const p = byId(id) || PROJECTS[0];
  const cat = CATEGORY[p.primary];
  const idx = PROJECTS.indexOf(p);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  document.title = `${p.name} — Nikhil Reddy`;

  const csEl = document.getElementById("projectCallsign");
  if (csEl) {
    csEl.textContent = p.tag || "";
    const fitCallsign = () => {
      csEl.style.transform = "none";
      const avail = csEl.parentElement.clientWidth;
      const natural = csEl.scrollWidth;
      const scale = avail > 0 && natural > avail ? (avail / natural) * 0.97 : 1;
      csEl.style.transform = scale < 1 ? `scaleX(${scale})` : "none";
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(fitCallsign));
    } else {
      requestAnimationFrame(fitCallsign);
    }
  }

  const specs = Object.entries(p.meta).map(([k, v]) => `<span>${k}: <b>${v}</b></span>`).join("");
  const sections = p.sections
    .map((s) => `<h4>${s.h}</h4><ul class="plist">${s.list.map((li) => `<li>${li}</li>`).join("")}</ul>`)
    .join("");

  // gallery: real images from p.images, then labeled placeholders up to gallerySlots.
  // No gallerySlots set -> frame count matches the photo count exactly (no forced
  // minimum) -- small counts get a dedicated equal-size layout (see pgallery--x1/2/3).
  const imgs = p.images || [];
  const slots = Math.max(p.gallerySlots || imgs.length, imgs.length);
  const gallerySizeClass = slots <= 3 ? ` pgallery--x${slots}` : "";
  let gallery = "";
  for (let i = 0; i < slots; i++) {
    if (imgs[i]) {
      gallery += `<figure><img src="${imgs[i]}" alt="${p.name} — photo ${i + 1}" loading="lazy" /></figure>`;
    } else {
      const glyph = i === 0 ? `<span class="pgallery__glyph">${p.glyph}</span>` : "";
      gallery += `<figure>${glyph}<figcaption>${p.id}-${i + 1}.jpg</figcaption></figure>`;
    }
  }

  pageEl.innerHTML = `
    <a class="pback" href="projects.html">← all projects</a>
    <header class="phead" style="--cat:${cat.color}">
      <h1 class="phead__title">${p.name}</h1>
      <p class="phead__tag">${p.tagline}</p>
      <div class="pspecs">${specs}</div>
    </header>
    <div class="pgallery${gallerySizeClass}" style="--cat:${cat.color}">${gallery}</div>
    <div class="pbody" style="--cat:${cat.color}">
      <p class="pintro">${p.intro}</p>
      ${sections}
      <h4>Tech</h4>
      <p class="ptech">${p.tech.join("  ·  ")}</p>
    </div>
    <nav class="pnav" aria-label="Project navigation">
      <a href="project.html?id=${prev.id}">← ${prev.name}</a>
      <a href="project.html?id=${next.id}">${next.name} →</a>
    </nav>`;
}

/* Repeat two identical groups for a seamless scrolling loop. */
document.querySelectorAll(".main").forEach((main) => {
  const pageName = location.pathname.split("/").pop() || "index.html";
  const project = main.querySelector("#projectCallsign")
    ? byId(new URLSearchParams(location.search).get("id")) || PROJECTS[0]
    : null;
  const words = project
    ? project.backgroundWords || [project.tag]
    : BACKGROUND_WORDS[pageName] || [];
  if (!words.length) return;
  const ticker = document.createElement("div");
  ticker.className = "page-ticker";
  ticker.setAttribute("aria-hidden", "true");
  const track = document.createElement("span");
  track.className = "page-ticker__track";
  for (let i = 0; i < 2; i++) {
    const group = document.createElement("span");
    group.className = "page-ticker__group";
    // Keep each half wider than the viewport even for a single short word.
    for (let repeat = 0; repeat < 8; repeat++) {
      words.forEach((word) => {
        const text = document.createElement("span");
        text.className = "page-ticker__word";
        text.textContent = word;
        const divider = document.createElement("span");
        divider.className = "page-ticker__divider";
        group.append(text, divider);
      });
    }
    track.append(group);
  }
  ticker.append(track);
  main.prepend(ticker);
  // Move every page's words at the same readable speed, regardless of list length.
  const setTickerSpeed = () => {
    const distance = track.firstElementChild.getBoundingClientRect().width;
    if (distance > 0) track.style.setProperty("--ticker-duration", `${distance / 56}s`);
  };
  setTickerSpeed();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setTickerSpeed);
  addEventListener("resize", setTickerSpeed);
});
