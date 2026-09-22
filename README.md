# Instructions for building the project

IOS 15.3 WEB UI ENGINEERING & COMPATIBILITY GUIDE
===============================================

Purpose
-------
This document is an engineering policy for AI coding agents and developers building modern websites that must remain usable, visually correct, and performant on iOS 15.3 Safari/WebKit.

Target device used as a hard compatibility reference:
- iPhone 8 / iPhone 8 Plus
- iOS 15.3
- Safari/WebKit generation shipped with iOS 15.3
- Apple A11-class hardware

Important:
iOS 15.3 is NOT a "modern browser" target. It predates Safari 15.4, which introduced more than 70 WebKit changes. Therefore, do not assume that a feature available in current Safari is available in iOS 15.3.

CORE PRINCIPLE
--------------
Build progressive enhancement, not graceful degradation.

The baseline UI must work with:
- ordinary CSS
- Flexbox
- CSS Grid
- CSS custom properties
- standard media queries
- transforms and opacity
- standard HTML
- ES modules and broadly supported JavaScript
- lightweight browser APIs

Modern effects may enhance the experience, but must never be required for the page to become visible, styled, readable, navigable, or interactive.

If a feature is unsupported:
1. Detect it when possible.
2. Provide a functional fallback.
3. Never leave content hidden because an enhancement failed.
4. Never make the entire layout depend on a modern feature.

==================================================
1. WEBKIT / SAFARI 15.3 MODEL
==================================================

Safari on iOS uses WebKit. Third-party iOS browsers also operate under Apple's WebKit-based browser architecture on this OS generation.

Think in terms of platform capabilities, not "Safari libraries".

The relevant stack is approximately:

HTML
 -> DOM
 -> CSS parser / cascade
 -> WebCore layout
 -> paint / compositing
 -> Core Animation / GPU

JavaScript
 -> JavaScriptCore
 -> DOM / Web APIs
 -> application framework

The User-Agent token "AppleWebKit/605.1.15" is NOT a complete feature/version detector. Prefer feature detection such as:
- CSS.supports()
- "feature" in window
- typeof API !== "undefined"

Do not write application logic based only on the User-Agent.

==================================================
2. WHAT IOS 15.3 DOES SUPPORT WELL
==================================================

Generally safe baseline technologies include:

CSS
- CSS custom properties / variables
- Flexbox
- CSS Grid
- media queries
- calc()
- min(), max(), clamp()
- aspect-ratio
- position: sticky
- standard transforms
- transitions
- keyframe animations
- opacity
- border-radius
- gradients
- box-shadow
- standard filters where supported
- CSS @supports
- standard pseudo-classes
- standard pseudo-elements

HTML
- semantic HTML
- forms
- buttons
- images
- video/audio with normal compatibility considerations
- SVG
- standard links and navigation

JavaScript
- ES modules
- async/await
- Promises
- fetch
- modern ES6+ language features supported by Safari 15
- top-level await
- private class methods/accessors
- BigInt typed arrays
- standard DOM APIs

Web APIs
- IntersectionObserver (available from iOS 12.2)
- WebGL
- Service Workers with limitations
- Fetch
- WebAssembly
- requestAnimationFrame
- common touch/pointer interaction APIs

Safari 15 itself added support for:
- CSS aspect-ratio
- lab(), lch(), hwb() colors
- color() color spaces
- top-level await
- ES modules in Workers/ServiceWorkers
- Error.cause
- private class methods/accessors
- BigInt64Array / BigUint64Array
- WebAssembly improvements
- theme-color
- safe-area related environment calculations

Do not interpret "supported" as "free". A feature can work while still being expensive on an A11 device.

==================================================
3. IMPORTANT FEATURES MISSING FROM IOS 15.3
==================================================

The following are particularly important because many modern sites assume them.

A) :has()
-------
NOT available in iOS 15.3.

Support was added with Safari 15.4.

Avoid making core layout depend on:

.card:has(.badge) { ... }

Use:
- explicit classes
- parent state classes
- JavaScript only when necessary
- server/component state

Never make content invisible because :has() did not apply.

B) CSS Cascade Layers (@layer)
------------------------------
NOT available in iOS 15.3.

Support was added in Safari 15.4.

Do not assume:

@layer base {}
@layer components {}
@layer utilities {}

will work on the baseline device.

C) CSS Containment
------------------
NOT available in iOS 15.3.

Support was added in Safari 15.4.

Avoid making layout correctness depend on:

contain: layout;
contain: paint;
contain: size;

D) Dynamic / Small / Large Viewport Units
------------------------------------------
The modern:
- dvh / dvw
- svh / svw
- lvh / lvw
- related dynamic logical viewport units

were added in Safari 15.4.

For full-screen mobile UI, use a fallback:

min-height: 100vh;
min-height: 100dvh;

The first declaration must remain useful on older Safari.

E) <dialog> and ::backdrop
---------------------------
Native <dialog> and ::backdrop support arrived in Safari 15.4.

For iOS 15.3 compatibility, prefer a controlled div-based modal/dialog implementation unless you have tested a robust fallback.

F) loading="lazy" on <img>
---------------------------
Native lazy-loading support for images arrived in Safari 15.4.

Do not assume browser-native image lazy loading exists on iOS 15.3. Use:
- responsive images
- IntersectionObserver-based lazy loading where useful
- appropriate image sizing
- modern image formats with fallback

G) accent-color
---------------
Added in Safari 15.4.

Do not depend on accent-color for critical visual identity of form controls.

H) scroll-behavior
------------------
Safari 15.4 added support for CSS scroll-behavior and ScrollOptions.

If smooth scrolling is a core requirement, provide a tested JavaScript fallback or use normal scrolling.

I) ResizeObserver additions
---------------------------
Safari 15.4 added ResizeObserverEntry / ResizeObserverSize interfaces.

If using ResizeObserver, use only the API surface actually available on the baseline device and feature-test advanced properties.

==================================================
4. MODERN CSS FEATURES TO AVOID AS BASELINE
==================================================

Do not make core layout depend on:
- :has()
- @layer
- container queries
- container query units
- CSS nesting
- modern viewport units without fallback
- very new color functions without fallback
- @property when not necessary
- advanced CSS Houdini APIs
- unsupported masking/filtering features
- bleeding-edge selectors
- browser-specific experimental features

Container queries:
- not supported by Safari/iOS 15.x
- Safari support begins at 16.0

CSS nesting:
- not supported by Safari/iOS 15.x
- Safari support begins later

Use build-time preprocessing if you want authoring convenience, but ensure the final generated CSS is compatible with the target.

==================================================
5. COLORS
==================================================

Safari 15 introduced:
- lab()
- lch()
- hwb()
- color()

However, support for a syntax does not mean every color-space workflow is identical across devices.

For maximum reliability:
- keep an sRGB fallback
- use modern color as enhancement
- verify gradients and alpha blending on the real device

Example:

color: #0f172a;
color: color(display-p3 0.05 0.09 0.16);

Do not use only a bleeding-edge color value for critical text/backgrounds.

IMPORTANT:
Do not assume Tailwind v4 is compatible with iOS 15.3.
Tailwind CSS v4 targets Safari 16.4+ and relies on modern CSS such as @property and color-mix().
For an iOS 15.3 baseline, use Tailwind v3.x or carefully authored compatible CSS instead.

==================================================
6. TAILWIND CSS POLICY
==================================================

Tailwind v4:
- DO NOT use for an iOS 15.3 baseline.
- Official Tailwind v4 compatibility target is Safari 16.4+.

Tailwind v3:
- Can be used, but do not blindly use every utility.
- Generated CSS must be tested on iOS 15.3.
- Use Autoprefixer / Browserslist appropriately.
- Avoid utilities that compile to unsupported platform features.

Prefer:
- Tailwind v3.x
- ordinary CSS
- PostCSS/Autoprefixer
- explicit fallback declarations

Never assume "Tailwind supports it" means "iOS 15.3 supports every generated rule."

==================================================
7. NEXT.JS POLICY
==================================================

Next.js support changes by major version.

Next.js 16 currently targets:
- Chrome 111+
- Edge 111+
- Firefox 111+
- Safari 16.4+

Therefore:
DO NOT assume a current Next.js 16 application is an iOS 15.3-compatible application.

If iOS 15.3 is a hard requirement:
- choose framework versions and build targets deliberately
- inspect generated JS/CSS
- configure Browserslist where supported
- test production builds
- provide required polyfills yourself when the framework no longer does so
- do not rely on development mode as the compatibility test

Next.js 15 and older generations have historically had broader browser targets, but individual dependencies can still raise the effective minimum.

Rule:
The effective browser requirement is the highest requirement imposed by:
framework + compiler + CSS framework + animation library + UI library + dependencies + your own code.

==================================================
8. MOTION / ANIMATION POLICY
==================================================

Animations must degrade gracefully.

Preferred properties:
- transform
- opacity

Avoid animating:
- width
- height
- top/left when transform can be used
- box-shadow continuously
- blur continuously
- large filters
- expensive paint-heavy properties

Prefer:

transform: translate3d(...);
opacity: ...;

over layout-triggering animations.

Use:
- transform
- opacity
- requestAnimationFrame where appropriate
- IntersectionObserver for reveal-on-scroll

Do not make initial content permanently hidden:

initial:
opacity: 0

unless the application guarantees a fallback if JavaScript/animation fails.

Critical rule:
NO JS = content must still be visible.

For React/Motion:
- do not make first paint depend on successful animation initialization
- provide visible SSR/static state
- avoid heavy scroll-linked animation on low-end hardware
- test actual device performance
- use reduced-motion preferences
- do not animate hundreds of DOM nodes simultaneously

Motion documentation notes that some animation capabilities depend on CSS.registerProperty and browser APIs. Older Safari also has specific animation quirks. Treat Motion as an enhancement layer, not as the foundation of content visibility.

==================================================
9. WEBGL / THREE.JS / SHADERS
==================================================

WebGL is supported on iOS Safari 15.3, but hardware capability matters.

Therefore:
SUPPORTED != FAST.

On iPhone 8 / A11:
- minimize draw calls
- minimize shader complexity
- avoid unnecessary 3D scenes
- avoid huge textures
- avoid continuous rendering when nothing changes
- pause rendering when offscreen
- prefer CSS transforms for ordinary UI
- use canvas/WebGL only when the visual value justifies the cost

For a restaurant menu:
DO NOT use WebGL, Three.js, or shaders for ordinary UI.

If decorative WebGL is added:
- it must be optional
- it must have a static fallback
- it must not block page interaction
- it must stop when not visible
- it must respect reduced motion

==================================================
10. IMAGES
==================================================

Images are one of the most important performance factors.

Rules:
- never ship a 4000px image when 800px is enough
- use width/height attributes or known aspect ratio to prevent layout shifts
- use responsive srcset/sizes
- compress aggressively while preserving visual quality
- prefer WebP where tested
- retain a fallback when compatibility matters
- do not load all menu images at full resolution on initial page load

For a restaurant menu:
- thumbnail images should be small
- load higher resolution only when needed
- avoid dozens of large images in the first viewport
- reserve image space before loading

Use:
loading="lazy"
only as progressive enhancement for iOS 15.3, because native lazy-loading support was added in Safari 15.4.

IntersectionObserver can be used for custom lazy-loading because iOS Safari supports it from 12.2.

==================================================
11. FONTS
==================================================

Fonts can destroy perceived performance.

Rules:
- use WOFF2
- subset large fonts when possible
- avoid loading many weights
- avoid huge variable fonts when unnecessary
- preload only the most important font
- use font-display: swap
- never make the UI invisible while waiting for a font

For Arabic:
- test Arabic glyph coverage
- test shaping and diacritics
- use a font with correct Arabic support
- avoid loading multiple Arabic families unnecessarily

If a custom font fails:
the system fallback must still produce a usable layout.

==================================================
12. BACKDROP FILTER / BLUR
==================================================

backdrop-filter is supported on iOS Safari, but it is a potentially expensive compositing effect.

Do not cover the entire page with multiple blurred layers.

Prefer:
- one or two localized blurred surfaces
- solid/translucent fallback
- moderate blur radius
- limited area

Always provide a fallback background:

background: rgba(255,255,255,.92);
-webkit-backdrop-filter: blur(16px);
backdrop-filter: blur(16px);

The UI must remain readable without backdrop-filter.

==================================================
13. MOBILE VIEWPORT / SAFE AREA
==================================================

Always account for iPhone safe areas.

Use:

padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);

when appropriate.

Do not assume 100vh equals the visible area of a mobile browser.

For iOS 15.3 baseline:
- use 100vh fallback
- avoid relying exclusively on dvh/svh/lvh
- test with Safari chrome visible/hidden
- test landscape
- test notch/safe-area behavior

==================================================
14. SCROLLING
==================================================

Use native scrolling whenever possible.

Avoid:
- replacing the entire page with a custom scroll engine
- intercepting touchmove unnecessarily
- nested scroll containers everywhere
- heavy scroll event handlers
- continuous JS calculations on every scroll event

Prefer:
- native document scrolling
- IntersectionObserver
- CSS sticky
- passive event listeners
- requestAnimationFrame batching when scroll-linked JS is unavoidable

iOS 15.3 supports position: sticky.

==================================================
15. TOUCH / INTERACTION
==================================================

Design for touch first.

Minimum recommendations:
- large touch targets
- clear pressed states
- avoid hover-only interactions
- do not hide critical controls behind hover
- avoid requiring precise mouse-like interactions
- support swipe only when it is genuinely useful
- avoid preventing default touch behavior unnecessarily

For a restaurant menu:
- category tabs must be easy to tap
- buttons must have obvious feedback
- product cards should not require hover
- sticky category navigation should remain usable
- modal sheets should have simple touch behavior

==================================================
16. ACCESSIBILITY
==================================================

Never sacrifice accessibility for visual effects.

Minimum:
- semantic headings
- buttons for actions
- links for navigation
- alt text for meaningful images
- sufficient contrast
- visible focus state where relevant
- reduced-motion support
- readable font sizes
- logical DOM order

Support:

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
    scroll-behavior: auto;
  }
}

Do not make reduced-motion users depend on animations for content discovery.

==================================================
17. JAVASCRIPT PERFORMANCE
==================================================

iPhone 8 / A11 should be treated as a constrained performance target.

Rules:
- minimize client-side JavaScript
- prefer server-rendered/static content
- avoid unnecessary hydration
- split heavy features
- lazy-load noncritical code
- avoid large dependency chains
- avoid running expensive work during first paint
- debounce expensive input handlers
- use requestAnimationFrame for visual updates
- use IntersectionObserver instead of continuous viewport calculations

Never assume:
"the JavaScript is only 200KB, so it is fine."

Parse time, execution time, hydration, layout, painting, and network all matter.

==================================================
18. CRITICAL RENDERING RULE
==================================================

The first render must be useful without JavaScript.

Ideal order:

1. HTML arrives
2. critical CSS renders
3. content is visible
4. images progressively load
5. JavaScript enhances interaction
6. animations start
7. optional effects load later

BAD:

HTML
 -> JS
 -> React hydration
 -> animation library
 -> CSS state change
 -> content becomes visible

If any step fails, the user gets a blank/broken page.

GOOD:

HTML
 -> CSS
 -> visible UI
 -> JS enhancement

==================================================
19. DESIGN SYSTEM RULES FOR THE RESTAURANT MENU
==================================================

The menu should prioritize:
- instant comprehension
- fast navigation
- low cognitive load
- fast image loading
- large touch targets
- readable typography
- stable layout
- minimal motion
- predictable scrolling

Recommended structure:

HEADER
CATEGORY NAVIGATION
MENU CONTENT
PRODUCT CARD
OPTIONAL PRODUCT DETAIL SHEET
OPTIONAL CART / ORDER ACTION

Avoid:
- huge animated hero sections
- WebGL backgrounds
- shader effects
- excessive blur
- dozens of simultaneous animations
- large parallax systems
- heavy video backgrounds
- unnecessary 3D
- excessive client-side state
- huge image payloads

A restaurant menu should feel fast before it feels spectacular.

==================================================
20. FALLBACK PATTERN
==================================================

Whenever using a modern feature:

BASE
----
Use the oldest reliable implementation.

ENHANCEMENT
-----------
Add the modern feature.

Example:

.hero {
  min-height: 100vh;
}

@supports (height: 100dvh) {
  .hero {
    min-height: 100dvh;
  }
}

The fallback must be complete and usable.

For JavaScript:

if ("IntersectionObserver" in window) {
  // enhancement
} else {
  // immediately show content
}

Never do the reverse.

==================================================
21. FEATURE DETECTION
==================================================

Prefer:

if (CSS.supports("selector(:has(*))")) {
   ...
}

if (CSS.supports("height: 100dvh")) {
   ...
}

if ("IntersectionObserver" in window) {
   ...
}

if ("ResizeObserver" in window) {
   ...
}

Avoid:

if (navigator.userAgent.includes("iPhone")) {
   ...
}

User-Agent detection should not be the primary compatibility mechanism.

==================================================
22. DEVELOPMENT TEST MATRIX
==================================================

Every important UI should be tested on:

A. Baseline
- iPhone 8 Plus
- iOS 15.3
- Safari

B. Modern iPhone
- current iOS Safari

C. Modern Chromium
- current Chrome desktop/mobile

D. Android
- current Chrome Android

The baseline device is NOT the only target.
It is the "do not break" target.

==================================================
23. TEST PRODUCTION, NOT ONLY DEV
==================================================

Do not judge compatibility using:

npm run dev

only.

Development servers:
- include development code
- may behave differently
- may use different bundling
- may expose HMR behavior
- may produce different errors

Always test:

npm run build
npm run start

or the real deployment.

For a Next.js project, inspect:
- browser console
- network requests
- CSS responses
- JS responses
- hydration errors
- runtime exceptions
- failed font requests
- failed image requests

==================================================
24. WHEN THE PAGE LOOKS "UNSTYLED"
==================================================

If an iOS 15.3 page loads HTML but appears almost completely unstyled, DO NOT immediately blame a single unsupported CSS property.

Investigate in this order:

1. Did the CSS file load?
2. What HTTP status did the CSS file return?
3. Is the MIME type correct?
4. Is the stylesheet empty or malformed?
5. Did CSS parsing stop around a modern syntax?
6. Are critical selectors using unsupported syntax?
7. Is JavaScript preventing class/state initialization?
8. Did hydration fail?
9. Did a runtime exception stop the app?
10. Did the framework target a newer Safari than iOS 15.3?
11. Is a CSS framework generating unsupported CSS?
12. Are fonts/images/CDN resources failing?
13. Is CSP/CORS blocking resources?
14. Is the problem layout, paint, compositing, or JavaScript?

Never assume:
"old Safari = CSS is broken."

==================================================
25. IMPORTANT FRAMEWORK COMPATIBILITY RULE
==================================================

The browser target of the framework matters.

NEXT.JS — IOS 15.3 COMPATIBILITY
---------------------------------

IMPORTANT VERIFIED FACT:

Next.js 15 officially supports Safari 12+ by default.

Therefore:
- Safari/iOS 15.3 is inside the official browser range of Next.js 15.
- You do NOT need to drop all the way to an old Next.js release merely because the target device is iOS 15.3.
- Next.js 15 is the recommended major version in this guide when choosing between the current Next.js 16 baseline and an older release specifically for iOS 15.3 compatibility.

Official Next.js 15 Browserslist baseline:

    chrome 64
    edge 79
    firefox 67
    opera 51
    safari 12

This means an iOS 15.3 Safari browser is within Next.js 15's declared browser target.

Recommended starting point for an iOS 15.3 project:

    next@15
    react@19
    react-dom@19

For a reproducible project, pin the exact versions in package.json/package-lock.json rather than installing "latest" indefinitely.

IMPORTANT:
"Next.js 15 supports Safari 12+" does NOT mean every npm dependency used inside a Next.js 15 project supports iOS 15.3.

The real browser requirement is:

    max(
      Next.js requirement,
      React/runtime requirement,
      CSS framework requirement,
      animation library requirement,
      UI component library requirement,
      other dependency requirements
    )

Therefore every dependency must be checked separately.

NEXT.JS 16
----------

Current Next.js 16 officially targets:
- Chrome 111+
- Edge 111+
- Firefox 111+
- Safari 16.4+

Therefore:
- DO NOT choose Next.js 16 when iOS 15.3 is a hard browser-support requirement.
- Even if the application appears to work on some parts of iOS 15.3, it is outside Next.js 16's official browser target.

NEXT.JS 14
----------

Next.js 14 also officially supports Safari 12+.

Therefore Next.js 14 is also compatible with the iOS 15.3 browser target.

However, for a new project, use Next.js 15 rather than selecting an older major solely for Safari 15.3, unless a dependency or project requirement specifically calls for Next.js 14.

NEXT.JS 13
----------

Next.js 13 also officially targeted Safari 12+.

Do not downgrade to 13 simply for iOS 15.3 compatibility.

TAILWIND CSS
------------

Tailwind v4:
- DO NOT use for an iOS 15.3 baseline.
- Official Tailwind v4 compatibility requires a much newer Safari baseline.

Tailwind v3:
- preferred Tailwind generation for older-browser projects
- still inspect generated CSS and avoid unsupported utilities/features

ANIMATION LIBRARIES
-------------------

For Motion/Framer Motion or other animation libraries:
- verify their actual browser/API requirements
- keep content visible without animation initialization
- avoid making hydration or animation setup a prerequisite for first paint

UI COMPONENT LIBRARIES
----------------------

Inspect:
- generated CSS
- runtime JavaScript
- required browser APIs
- peer dependencies
- minimum Safari version

Do not assume "React component" means "iOS 15.3 compatible".

FRAMEWORK SELECTION RULE
------------------------

If iOS 15.3 is a HARD requirement for the project:

    Prefer Next.js 15
    + Tailwind CSS v3.x (if Tailwind is desired)
    + compatible animation/UI libraries
    + explicit progressive enhancement

Do NOT silently use:

    Next.js 16
    + Tailwind v4
    + modern-only UI libraries

and then expect the project to remain an iOS 15.3 baseline project.

Sources:
- Next.js 15 supported browsers:
  https://nextjs.org/docs/15/architecture/supported-browsers
- Next.js 14 supported browsers:
  https://nextjs.org/docs/14/architecture/supported-browsers
- Current Next.js supported browsers:
  https://nextjs.org/docs/architecture/supported-browsers

==================================================
26. AI CODING AGENT RULES
==================================================

When an AI agent modifies the project, it MUST:

1. Treat iOS 15.3 as a real supported browser if the project declares it.
2. Check browser support before introducing new CSS/JS APIs.
3. Prefer progressive enhancement.
4. Avoid unsupported CSS as a core dependency.
5. Preserve fallbacks.
6. Never remove a fallback just to simplify code.
7. Never hide content until JavaScript succeeds.
8. Avoid unnecessary dependencies.
9. Prefer transform/opacity for animation.
10. Test production output.
11. Inspect generated CSS/JS when compatibility is uncertain.
12. Use feature detection.
13. Consider A11 CPU/GPU/memory constraints.
14. Optimize images.
15. Test touch interactions.
16. Respect prefers-reduced-motion.
17. Document any feature that intentionally requires a newer browser.
18. If a requested library requires Safari >15.3, tell the developer before adding it.
19. If a modern dependency is incompatible, propose an older compatible version or a native implementation.
20. Do not silently raise the project's browser requirement.

==================================================
27. AI AGENT PRE-COMMIT CHECKLIST
==================================================

Before considering a UI feature complete, ask:

COMPATIBILITY
[ ] Does the feature work in iOS 15.3?
[ ] Does the final CSS contain unsupported syntax?
[ ] Does the final JS require newer APIs?
[ ] Are fallbacks present?

RENDERING
[ ] Is content visible without JS?
[ ] Is layout stable while images load?
[ ] Are fonts allowed to fall back?

PERFORMANCE
[ ] How many client components were added?
[ ] How much JavaScript was added?
[ ] Are there continuous animations?
[ ] Are there expensive blur/filter effects?
[ ] Are large images loaded immediately?
[ ] Are scroll handlers necessary?

TOUCH
[ ] Does the feature work without hover?
[ ] Are controls large enough?
[ ] Does scrolling remain native?

ACCESSIBILITY
[ ] Is semantic HTML used?
[ ] Is reduced motion supported?
[ ] Is text readable?
[ ] Are important controls keyboard/focus accessible?

PRODUCTION
[ ] Was the production build tested?
[ ] Were console errors checked?
[ ] Were network failures checked?
[ ] Was the actual iOS 15.3 device tested?

==================================================
28. RECOMMENDED TECHNOLOGY STACK FOR A FAST MENU
==================================================

For an iOS 15.3-first restaurant menu, prefer:

Framework:
- a framework/version that can genuinely target the required browser

Styling:
- CSS
- Tailwind v3.x if desired
- PostCSS
- Autoprefixer
- Browserslist

Images:
- WebP where appropriate
- responsive srcset/sizes
- compressed assets
- explicit dimensions

Animation:
- CSS transitions/keyframes
- lightweight Motion usage only when necessary
- IntersectionObserver for reveal logic

Graphics:
- SVG for icons/illustrations
- avoid WebGL unless truly necessary

Fonts:
- WOFF2
- limited weights
- font-display: swap

Architecture:
- server/static rendering where possible
- minimal hydration
- progressive enhancement

==================================================
29. WHAT NOT TO DO
==================================================

DO NOT:

- use Tailwind v4 and assume iOS 15.3 compatibility
- use :has() for critical layout
- use @layer for essential styles
- use container queries as a baseline dependency
- use dvh without a fallback
- depend on native <dialog> without fallback
- make animations required for visibility
- load enormous images
- create dozens of simultaneous blur effects
- build a restaurant menu around WebGL
- use heavy parallax everywhere
- replace native scrolling without a strong reason
- add libraries for trivial effects
- assume modern Chrome behavior equals iOS 15.3
- test only localhost/dev mode
- use User-Agent sniffing as the primary compatibility solution
- silently upgrade the browser requirement

==================================================
30. PRACTICAL VERSION DECISION FOR IOS 15.3
==================================================

If the developer's goal is:

"Build a new restaurant menu and guarantee official Next.js browser support that includes iOS 15.3"

Use:

    Next.js 15.x
    React 19.x
    Tailwind CSS 3.x (optional)
    CSS/PostCSS + Autoprefixer
    compatible animation/UI dependencies

Do not use Next.js 16 as the baseline because its official Safari requirement is 16.4+.

Next.js 14.x is also officially compatible with Safari 12+, but Next.js 15 is the more appropriate starting point when choosing a currently maintained major that still includes iOS 15.3 in its official browser target.

IMPORTANT:
This is a browser-support decision, not a guarantee that every third-party package works on iOS 15.3. Audit dependencies individually.

==================================================
31. FINAL ENGINEERING PHILOSOPHY
==================================================

A high-quality UI is not the UI with the most effects.

A high-quality UI is one that:
- renders quickly
- communicates immediately
- responds predictably
- survives weak hardware
- survives older browsers
- remains readable without effects
- feels native on touch
- uses animation with purpose
- has fallbacks
- does not make users wait for JavaScript

Use iPhone 8 Plus / iOS 15.3 as a "constraint device".

If the UI is beautiful and smooth there, it will usually have a much stronger performance foundation on modern hardware.

But do NOT artificially limit modern browsers.
Use progressive enhancement:

BASELINE
iOS 15.3-compatible UI
        +
ENHANCEMENTS
modern CSS
modern viewport units
advanced effects
better animations
higher-resolution assets
optional graphics

The baseline must remain complete.

==================================================
32. SOURCES / VERIFICATION REFERENCES
==================================================

Primary Apple/WebKit sources:

Safari 15 — WebKit:
https://webkit.org/blog/11989/new-webkit-features-in-safari-15/

Safari 15 release notes:
https://developer.apple.com/documentation/safari-release-notes/safari-15-release-notes

Safari 15.4 — WebKit:
https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/

Safari 15.4 release notes:
https://developer.apple.com/documentation/safari-release-notes/safari-15_4-release-notes

Safari CSS Reference:
https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariCSSRef/

Compatibility databases:

Can I Use:
https://caniuse.com/

Relevant checks:
- :has()
- CSS Cascade Layers
- CSS Containment
- viewport unit variants
- CSS Container Queries
- CSS Nesting
- IntersectionObserver
- WebGL
- backdrop-filter
- position: sticky

Framework sources:

Next.js browser support:
https://nextjs.org/docs/architecture/supported-browsers

Next.js 16 upgrade/browser requirements:
https://nextjs.org/docs/app/guides/upgrading/version-16

Tailwind CSS compatibility:
https://tailwindcss.com/docs/compatibility

Tailwind CSS upgrade/browser requirements:
https://tailwindcss.com/docs/upgrade-guide

Motion FAQ:
https://motion.dev/docs/faqs

==================================================
END OF GUIDE
==================================================

NOTE TO AI AGENTS:
This document is a compatibility policy, not a claim that every listed feature is universally identical across every iOS 15.x device. When a feature is critical, verify it with feature detection and a real iOS 15.3 device. Browser support data changes over time; the project's declared minimum browser version must always be treated as an explicit engineering constraint.
