export function generateOrderId(prefix: string) {
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${timestamp}-${randomPart}`;
}