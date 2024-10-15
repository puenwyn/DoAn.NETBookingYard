export function transferText(text) {
    const vietnameseTones = [
        'à', 'á', 'ả', 'ã', 'ạ',
        'è', 'é', 'ẻ', 'ẽ', 'ẹ',
        'ì', 'í', 'ỉ', 'ĩ', 'ị',
        'ò', 'ó', 'ỏ', 'õ', 'ọ',
        'ù', 'ú', 'ủ', 'ũ', 'ụ',
        'ỳ', 'ý', 'ỷ', 'ỹ', 'ỵ',
        'đ'
    ];

    const noTones = [
        'a', 'a', 'a', 'a', 'a',
        'e', 'e', 'e', 'e', 'e',
        'i', 'i', 'i', 'i', 'i',
        'o', 'o', 'o', 'o', 'o',
        'u', 'u', 'u', 'u', 'u',
        'y', 'y', 'y', 'y', 'y',
        'd'
    ];

    return text.split('').map(char => {
        if (char === ' ') return '-';
        const index = vietnameseTones.indexOf(char);
        return index !== -1 ? noTones[index] : char;
    }).join('');
}
