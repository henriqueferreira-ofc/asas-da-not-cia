/**
 * Utility to convert Google Drive sharing/view links into direct image URLs
 * that can be used in <img> tags.
 */
export const getGoogleDriveDirectUrl = (url: string | undefined): string | undefined => {
    if (!url) return undefined;

    // If it's already a direct lh3.googleusercontent.com link, return as is
    if (url.includes('lh3.googleusercontent.com')) return url;

    // Extract ID from various Google Drive URL formats
    let id = null;

    // Try /d/ID format (standard sharing link)
    const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (dMatch) {
        id = dMatch[1];
    } else {
        // Try id=ID format (legacy/other links)
        const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (idMatch) {
            id = idMatch[1];
        }
    }

    if (id) {
        // Use the thumbnail endpoint which is very reliable for public/shared images
        // sz=w1000 requests a width of 1000px, but it will serve smaller if original is smaller
        return `https://lh3.googleusercontent.com/d/${id}=w1000`;
    }

    return url;
};
