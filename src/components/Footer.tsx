export default function Footer() {
  return (
    <footer className="bg-warhammer-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Warhammer Community. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}