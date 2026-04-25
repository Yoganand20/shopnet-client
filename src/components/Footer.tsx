function Footer() {
  return (
    <footer className="bg-background py-12 px-6 h-75 border-t-2 border-t-grey">
      <div className="max-w-full mx-auto flex flex-col items-center justify-center space-y-6">
        {/* Brand / Logo */}
        <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          ShopNet
        </div>

        {/* Simple Navigation */}
        <nav className="flex space-x-8 text-gray-600 dark:text-gray-400 text-sm">
          <a
            href="/about"
            className="hover:text-gray-900 dark:hover:text-gray-100 transition"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-gray-900 dark:hover:text-gray-100 transition"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="hover:text-gray-900 dark:hover:text-gray-100 transition"
          >
            Privacy
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-gray-500 dark:text-gray-400 select-none">
          &copy; 2025 NexTune. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
