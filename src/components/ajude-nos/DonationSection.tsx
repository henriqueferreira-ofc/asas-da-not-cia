import { Gift } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DonationOption } from "@/lib/donations";

interface DonationSectionProps {
    title: string;
    description: string;
    footer: string;
    values: DonationOption[];
    onDonate: (value: string, pixCode: string, link: string) => void;
}

export function DonationSection({
    title,
    description,
    footer,
    values,
    onDonate
}: DonationSectionProps) {
    return (
        <section className="mb-16">
            <div className="bg-gradient-to-br from-accent/5 via-accent/10 to-accent/5 rounded-2xl p-8 md:p-12 border border-accent/20">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 mb-4">
                        <Gift className="w-7 h-7 text-accent" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-headline mb-3">
                        {title}
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {values.map((donation, index) => (
                        <Button
                            variant="outline"
                            key={index}
                            onClick={() => onDonate(donation.value, donation.pixCode, donation.link)}
                            className="group relative h-auto min-h-16 max-w-full whitespace-normal break-words px-8 py-4 bg-card border-2 border-accent/30 rounded-xl hover:border-accent hover:bg-accent/5 transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                            <span className="text-2xl font-bold text-headline group-hover:text-accent transition-colors">
                                R$ {donation.value}
                            </span>
                        </Button>
                    ))}
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    {footer}
                </p>
            </div>
        </section>
    );
}
