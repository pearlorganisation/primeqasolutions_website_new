// Server Component — no "use client" directive.
// Only the MobileMenu (extracted below) ships client JS for the toggle.
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { navigationData } from "@/config/navigation";
import { Logo } from "@/components/ui/logo";
import { TopBar } from "./top-bar";
import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <TopBar />

      {/* Main Bar */}
      <div className="relative w-full  bg-(--color-page-canvas) bg-[#f9fafb]!">
        <Container>
          <div className="flex px-4 md:px-8 lg:px-12 xl:px-0 h-16 items-center justify-between gap-8 relative">
            {/* Logo Section */}
            <div className="flex items-center shrink-0">
              <Logo priority  className="w-32 sm:w-40" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center">
              <DesktopNav />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden xl:block">
                <Link href="/contact-us">
                    <Button
                      asChild
                      variant="default"
                    >
                    <span>Contact Us</span>
                  </Button>
                </Link>
              </div>

              {/* Mobile menu — the only client component in this tree */}
              <MobileMenu />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
