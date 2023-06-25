export const bestStrategy = (n: number, m: number) => {
    let player2_pick = 0
    const maxPickValue = Math.max(n,m)
    if (m % 2 !== 0) {
        for (let i = 1; i <= maxPickValue; i += 2) {
            if ((n - i) % (m + 1) === 0) {
                player2_pick = i
                break;
            }
            if ((n - i - 1) % (m + 1) === 0) {
                player2_pick = i
                break;
            }
        }
    } else {
        for (let i = 1; i <= maxPickValue; i += 2) {
            if ((n - i) % ((m + 2) / 2) === 0) {
                player2_pick = i
                break;
            }
            if ((n - i - 1) % ((m + 2) / 2) === 0) {
                player2_pick = i
                break;
            }
        }
    }
    return player2_pick
}

