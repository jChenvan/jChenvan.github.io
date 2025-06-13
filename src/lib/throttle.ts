export default function throttle<T extends (...args: any[]) => void>(callback: T, limit: number): (...args: Parameters<T>) => void {
    let isOnCooldown = false;

    return (...args: Parameters<T>) => {
        if (!isOnCooldown) {
            callback(...args);
            isOnCooldown = true;

            setTimeout(() => {
                isOnCooldown = false;
            }, limit);
        }
    };
}
