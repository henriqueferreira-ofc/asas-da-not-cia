import { Link, LinkProps } from "react-router-dom";
import { useCallback } from "react";

interface PrefetchLinkProps extends LinkProps {
    prefetch?: () => void;
}

/**
 * A wrapper around react-router-dom Link that triggers a pre-fetch
 * of the component/chunk when the user hovers over the link.
 */
export function PrefetchLink({ prefetch, onMouseEnter, ...props }: PrefetchLinkProps) {
    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        // Trigger the prefetch function provided
        if (prefetch) {
            prefetch();
        }

        // Call original onMouseEnter if exists
        if (onMouseEnter) {
            onMouseEnter(e);
        }
    }, [prefetch, onMouseEnter]);

    return <Link {...props} onMouseEnter={handleMouseEnter} />;
}
