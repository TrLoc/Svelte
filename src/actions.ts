export function trapFocus(node: HTMLElement) {
    const previous = document.activeElement;

    function focusable(): HTMLElement[] {
        return Array.from(node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')) as HTMLElement[];
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key !== 'Tab') return;

        const current = document.activeElement;
        const elements = focusable();
        const first = elements[0];
        const last = elements[elements.length - 1]; // More idiomatic TypeScript array access

        if (event.shiftKey && current === first) {
            last.focus();
            event.preventDefault();
        }

        if (!event.shiftKey && current === last) {
            first.focus();
            event.preventDefault();
        }
    }

    focusable()[0]?.focus();

    node.addEventListener('keydown', handleKeydown);

    return {
        destroy() {
            node.removeEventListener('keydown', handleKeydown);
            // Optional type assertion for clarity
            previous?.focus();
        }
    };
}
