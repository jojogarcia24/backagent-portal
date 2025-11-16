"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Contacts", href: "/contacts" },
  { label: "Deals", href: "/deals" },
  { label: "Resources", href: "/resources" },
  { label: "Settings", href: "/settings" },
];

function NavLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-slate-800 text-white"
          : "text-slate-300 hover:bg-slate-800/60 hover:text-white",
      ].join(" ")}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-slate-800 bg-slate-950/80 p-4 text-slate-100 md:flex">
      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold">
          BB
        </div>
        <div>
          <div className="text-sm font-semibold tracking-wide">
            Back Boss AI
          </div>
          <div className="text-xs text-slate-400">
            Elite Living Realty Portal
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}
      </nav>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-300">
        <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-500">
          Nova status
        </div>
        <div className="flex items-center justify-between">
          <span>Online</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </div>
      </div>
    </aside>
  );
}
