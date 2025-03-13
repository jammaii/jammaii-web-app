import Link from 'next/link';
import {
  DollarSignIcon,
  Home,
  Package,
  PanelLeft,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';
import Providers from '../admin/providers';
import { NavItem } from '@/components/general/nav-item';
import { HeaderIcon } from '@/components/general/header-icon';
import { UserPopup } from '@/components/general/user-popup';
import { MobileNavItem } from '@/components/general/mobile-nav-item';

export default function UserDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-24">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <HeaderIcon url="/user" />
            <UserPopup accountType="user" />
          </header>
          <main className="grid flex-1 items-start gap-2 bg-muted/40 p-4 sm:px-6 sm:py-0 md:gap-4">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-24 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link href="/">
          <Image
            src={'/jammaii-logo-0.jpg'}
            height={50}
            width={50}
            alt="Avatar"
            className="mx-auto rounded-lg"
          />
          <span className="sr-only">JAMMAII</span>
        </Link>

        <NavItem href="/user" label="Dashboard">
          <Home className="h-5 w-5" />
          Home
        </NavItem>

        <NavItem href="/user/investments" label="Investments">
          <DollarSignIcon className="h-5 w-5" />
          Assets
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Image
              src={'/jammaii-logo-0.jpg'}
              height={50}
              width={50}
              alt="Avatar"
              className="mx-auto rounded-lg"
            />
            <span className="sr-only">JAMMAII</span>
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          ></Link>
          <MobileNavItem href="/user" label="Users">
            <Home className="h-5 w-5" />
            Dashboard
          </MobileNavItem>

          <MobileNavItem href="/user/investments" label="Users">
            <Package className="h-5 w-5" />
            Projects & Assets
          </MobileNavItem>
          {/* <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link> */}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
