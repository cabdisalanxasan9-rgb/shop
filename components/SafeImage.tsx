"use client";

import React from "react";
import Image, { ImageProps } from "next/image";

type SafeImageProps = ImageProps & {
    fallbackSrc?: string;
};

export default function SafeImage({ fallbackSrc = "/images/veg-tomato.jpg", src, onError, ...props }: SafeImageProps) {
    const [resolvedSrc, setResolvedSrc] = React.useState(src);

    React.useEffect(() => {
        setResolvedSrc(src);
    }, [src]);

    return (
        <Image
            {...props}
            src={resolvedSrc}
            onError={(event) => {
                if (typeof resolvedSrc !== "string" || resolvedSrc !== fallbackSrc) {
                    setResolvedSrc(fallbackSrc);
                }
                onError?.(event);
            }}
        />
    );
}
