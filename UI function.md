Core Responsive Instruction Prompt



Design the entire portfolio website using fluid, percentage-based and relative units instead of fixed pixel sizes.



Avoid fixed width (px) values for layout containers, typography scaling, spacing, or components.



Use:



% for layout widths



vw, vh, vmin, vmax for scalable sections



rem and em for typography and spacing



clamp() for responsive font scaling



min(), max() for layout constraints



CSS Grid and Flexbox with fractional units (fr)



The design must dynamically adapt to:



Mobile (320px+)



Tablet (768px+)



Laptop (1024px+)



Desktop (1440px+)



Ultra-wide screens (1920px+)



Layout must stretch proportionally without breaking hierarchy.



All sections should scale fluidly without abrupt jumps at breakpoints.



Avoid rigid breakpoints wherever possible — prioritize fluid responsiveness.



🧬 Typography Scaling Prompt (Very Important)



Add this:



Implement fluid typography using clamp() to ensure readable scaling across devices.



Example pattern:



font-size: clamp(1rem, 2vw, 1.5rem);





Headings must scale proportionally with viewport width while maintaining visual hierarchy.



Never use fixed pixel font sizes.



🧫 Layout Instruction Prompt



All layout containers must use relative widths such as:



width: 90%



max-width: 85rem



grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr))



Avoid fixed width containers like:



width: 1200px



height: 600px



Sections must adapt naturally to screen size changes without content overflow.



🔬 Microbiology Theme Adaptive Prompt



Background elements (molecular particles, floating cells, animations) must use:



Relative positioning



Percentage-based placement



Viewport-based scaling



Animations should scale proportionally with viewport size.



🧪 Spacing System Prompt



Use a scalable spacing system based on rem units.



Example:



Section padding: padding: 8vh 5%



Card padding: 1.5rem



Grid gaps: 2vw



Avoid fixed pixel spacing.



🧬 Component Responsiveness Rule



All cards, research blocks, publication elements, and navigation must:



Stack automatically on smaller screens



Use flex-wrap or auto grid fitting



Maintain proportional spacing



No horizontal scrollbars should appear at any resolution.



🔥 Advanced 2026 Responsive Standard Prompt



The layout must feel fluid and organic, similar to molecular structures — resizing the window should feel natural and continuous, not segmented.



Avoid traditional “mobile-only breakpoint hacks.”

Prioritize intrinsic layout behavior using modern CSS features.



💎 If Using Tailwind (Add This)



Configure Tailwind to prioritize:



container: false



Custom fluid container system



Use arbitrary values like w-\[92%]



Use max-w-\[85rem] instead of fixed px containers



Use responsive typography with clamp() via custom utilities



🎯 Short Version (If You Need Minimal Prompt)



Use fully fluid, percentage-based layout with no fixed pixel sizing.

Implement viewport-based scaling, clamp typography, fractional grid units, and intrinsic responsive behavior.

The website must dynamically adapt across all devices without rigid breakpoints.

