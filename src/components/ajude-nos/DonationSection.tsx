import { Gift } from "lucide-react";

interface DonationValue {
    value: string;
    pixCode: string;
}

interface DonationSectionProps {
    title: string;
    description: string;
    footer: string;
    values: DonationValue[];
    onDonate: (value: string, pixCode: string) => void;
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
                    {values.map((donation) => (
                        <button
                            key={donation.value}
                            onClick={() => onDonate(donation.value, donation.pixCode)}
                            className="group relative px-8 py-4 bg-card border-2 border-accent/30 rounded-xl hover:border-accent hover:bg-accent/5 transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                            <span className="text-2xl font-bold text-headline group-hover:text-accent transition-colors">
                                R$ {donation.value}
                            </span>
                        </button>
                    ))}
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    {footer}
                </p>
            </div>
        </section>
    );
}
