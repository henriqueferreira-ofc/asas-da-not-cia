import { ReactNode } from "react";

interface ImpactItem {
    title: string;
    description: string;
}

interface ImpactSectionProps {
    title: string;
    items: ImpactItem[];
    icons: ReactNode[];
    bgColors: string[];
}

export function ImpactSection({
    title,
    items,
    icons,
    bgColors
}: ImpactSectionProps) {
    return (
        <section className="text-center">
            <h2 className="text-2xl font-serif font-bold text-headline mb-6">
                {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item, i) => (
                    <div key={i} className="bg-card rounded-xl border border-border p-6">
                        <div className={`w-12 h-12 rounded-full ${bgColors[i]} flex items-center justify-center mx-auto mb-4`}>
                            {icons[i]}
                        </div>
                        <h3 className="font-bold text-headline mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
