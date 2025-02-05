import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <Link
              href="/"
              className="font-medium underline underline-offset-4"
            >
              Fitness Tracker Team
            </Link>
            . The source code is available on{' '}
            <Link
              href="https://github.com/your-username/fitness-tracker"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <nav className="flex items-center space-x-6 text-sm">
            <Link
              href="/terms"
              className="hover:underline underline-offset-4"
            >
              이용약관
            </Link>
            <Link
              href="/privacy"
              className="hover:underline underline-offset-4"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/contact"
              className="hover:underline underline-offset-4"
            >
              문의하기
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
} 