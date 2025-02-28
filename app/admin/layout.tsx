import Link from 'next/link';
import {
  Home,
  MessageCircleIcon,
  Package,
  Package2,
  PanelLeft,
  Settings,
  Users2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';
import { VercelLogo } from '@/components/icons';
import Providers from './providers';
import { NavItem } from '@/components/general/nav-item';
import { HeaderIcon } from '@/components/general/header-icon';
import { UserPopup } from '@/components/general/user-popup';
import { MobileNavItem } from '@/components/general/mobile-nav-item';

export default function AdminDashboardLayout({
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
            <HeaderIcon />
            <UserPopup accountType="admin" />
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
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-24 flex-col border-r bg-background bg-green-800 sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link href="/admin">
          <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" />
          <span className="sr-only">JAMMAII</span>
        </Link>

        <NavItem href="/admin" label="Dashboard">
          <Home className="h-5 w-5" />
          Home
        </NavItem>

        <NavItem href="/admin/projects" label="Projects">
          <Package className="h-5 w-5" />
          Projects
        </NavItem>

        <NavItem href="/admin/support-messages" label="Support Messages">
          <MessageCircleIcon className="h-5 w-5" />
          Support
        </NavItem>

        <NavItem href="/admin/users" label="Users">
          <Users2 className="h-5 w-5" />
          Users
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
      <SheetContent side="left" className="bg-green-800 sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/admin"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">JAMMAII</span>
          </Link>
          <MobileNavItem href="/admin" label="Users">
            <Home className="h-5 w-5" />
            Dashboard
          </MobileNavItem>

          <MobileNavItem href="/admin/projects" label="Users">
            <Package className="h-5 w-5" />
            Projects
          </MobileNavItem>

          <MobileNavItem
            href="/admin/support-messages"
            label="Support Messages"
          >
            <MessageCircleIcon className="h-5 w-5" />
            Support
          </MobileNavItem>

          <MobileNavItem href="/admin/users" label="Users">
            <Users2 className="h-5 w-5" />
            Users
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
