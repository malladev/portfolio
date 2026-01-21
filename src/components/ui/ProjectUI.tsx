import React from "react";
import { cn } from "../../utils/cn.ts";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpIcon, ArrowUpRightIcon } from "@heroicons/react/20/solid";

export const HoverEffect = ({
    items,
    className,
}: {
    items: {
        title: string;
        description: string;
        link: string;
        techs: any[]
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 relative  lg:grid-cols-3  py-10",
                className
            )}
        >
            {items.map((item, idx) => (
                <div
                    key={item?.link}
                    className="relative group  block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-indigo-400 block  rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card link={item.link}>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                        <div className="abolute bottom-10 mt-4 flex items-center gap-1 flex-wrap">
                            {item.techs.map((t, idx) => (
                                <div key={idx} className="text-xs bg-indigo-500 text-white rounded-full px-3 py-1 w-fit">{t.name}</div>
                            ))}
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export const Card = ({
    className,
    children,
    link,
}: {
    className?: string;
    children: React.ReactNode;
    link: string;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full p-4 overflow-hidden bg-gray-800 border border-white/[0.2] group-hover:border-slate-700 relative z-20",
                className
            )}
        >
            <div className="relative z-30">
                <div className="p-4">{children}</div>
            </div>
            <a href={link} target="_blank" rel="noreferrer" className="absolute top-3 z-30 right-3 bg-indigo-400 rounded-lg p-1">
                <ArrowUpRightIcon className="w-4 text-white hover:text-gray-300 transition-all duration-300" />
            </a>
        </div>
    );
};
export const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn("text-slate-100 font-bold tracking-wide mt-4", className)}>
            {children}
        </h4>
    );
};
export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                "mt-8 text-slate-400 tracking-wide leading-relaxed text-sm",
                className
            )}
        >
            {children}
        </p>
    );
};
