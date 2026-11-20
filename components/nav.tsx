"use client";
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Aperture,ArrowUpRight} from 'lucide-react';
export function Nav(){const path=usePathname();return <header className="o-nav"><Link href="/" className="o-logo"><Aperture size={23} strokeWidth={1.6}/><span>omnisight<span className="o-logo-dot">.</span></span></Link><nav aria-label="Main navigation"><Link href="/" aria-current={path==='/'?'page':undefined}>Overview</Link><Link href="/demo/live" aria-current={path==='/demo/live'?'page':undefined}>Monitor</Link><Link href="/demo/results" aria-current={path==='/demo/results'?'page':undefined}>Session review</Link></nav><span className="o-demo-tag">Interactive demo <ArrowUpRight size={12}/></span></header>}
