/**
 * Utility to convert Google Drive sharing/view links into direct image URLs
 * that can be used in <img> tags.
 */
export const getGoogleDriveDirectUrl = (url: string | undefined, type: 'image' | 'video' | 'embed' = 'image'): string | undefined => {
    if (!url) return undefined;

    // If it's already a direct lh3.googleusercontent.com link, return as is (only for images)
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
        } else {
            // Try file/d/ID/view format
            const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (fileMatch) {
                id = fileMatch[1];
            }
        }
    }

    if (id) {
        // For embed type, return the preview page link
        if (type === 'embed') {
            return `https://drive.google.com/file/d/${id}/preview`;
        }

        // For videos, we use the drive.usercontent.google.com domain which is often 
        // more reliable for direct streaming/embedding than the standard uc endpoint.
        if (type === 'video') {
            return `https://drive.usercontent.com/download?id=${id}&export=download`;
        }

        // Use the standard Google Drive image content provider. This is the most 
        // reliable way for simple cross-origin image embedding as long as we don't 
        // force CORS checks with crossOrigin="..." attributes.
        return `https://lh3.googleusercontent.com/d/${id}`;
    }

    return url;
};
