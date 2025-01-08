interface Window {
    log: <T>(message: T) => void;
}

declare function log<T>(message: T): void;