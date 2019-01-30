function rems(px) {
    return `${px / 16}rem`
}

export default {
    maxLineLength: rems(540),
    spacing: {
        xs: rems(2),
        sm: rems(4),
        md: rems(8),
        lg: rems(16),
        xl: rems(28),
    },
}
