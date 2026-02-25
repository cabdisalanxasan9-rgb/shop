"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CategoryItemProps {
    id: string;
    label: string;
    icon: string;
    color: string;
}

export default function CategoryItem({ id, label, icon, color }: CategoryItemProps) {
    const [imageSrc, setImageSrc] = React.useState(icon);

    React.useEffect(() => {
        setImageSrc(icon);
    }, [icon]);

    return (
        <Link href={`/categories/${id}`} className="flex flex-col items-center gap-3 group">
            <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 active:scale-95 premium-shadow overflow-hidden relative",
                color
            )}>
                <Image
                    src={imageSrc}
                    alt={label}
                    fill
                    className="object-cover"
                    sizes="64px"
                    onError={() => setImageSrc("/images/cat-greens.jpg")}
                />
            </div>
            <span className="text-[11px] font-semibold text-subtitle group-hover:text-primary transition-colors">
                {label}
            </span>
        </Link>
    );
}
