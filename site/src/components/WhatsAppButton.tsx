export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/972522263776"
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter Dor Hadash sur WhatsApp"
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105 lg:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] lg:right-[calc(1.5rem+env(safe-area-inset-right,0px))]"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.892.525 3.66 1.437 5.166L2 22l4.958-1.395A9.947 9.947 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12.001 2Zm4.63 12.382c-.199.56-1.15 1.086-1.596 1.146-.408.055-.925.078-1.492-.094a13.9 13.9 0 0 1-1.34-.497c-2.36-1.02-3.9-3.383-4.02-3.539-.12-.157-.965-1.28-.965-2.443s.606-1.735.82-1.972c.213-.238.465-.297.62-.297.153 0 .307.001.44.008.14.006.33-.053.516.394.199.478.677 1.646.736 1.766.06.12.099.26.02.417-.079.158-.12.257-.238.396-.12.14-.25.312-.357.42-.119.118-.243.246-.104.483.138.238.615.99 1.322 1.604.908.79 1.674 1.033 1.912 1.15.238.118.377.099.516-.06.14-.157.594-.674.753-.906.158-.232.317-.193.535-.114.219.079 1.387.634 1.625.75.238.118.396.177.456.276.06.099.06.573-.139 1.133Z" />
      </svg>
    </a>
  );
}
