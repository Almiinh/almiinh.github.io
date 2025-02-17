function nextMove([x, y]) {
    return [
        [x+1, y+2],
        [x-1, y+2],
        [x+2, y+1],
        [x+2, y-1],
        [x+1, y-2],
        [x-1, y-2],
        [x-2, y-1],
        [x-2, y+1]
    ].filter(([a, b]) => 0 <= a && a <= 7 && 0 <= b && b <= 7)
}

function knightMoves(start, end) {
    // Uses BFS
    const q = [[start]]
    const explored = []
    while (q.length > 0) {
        const path = q.shift()
        if (path.at(-1).join() === end.join())
            return path
        const next = nextMove(path.at(-1))
        for (let i = 0; i < next.length; i++) {
            if (!explored.includes(next[i])) {
                explored.push(next[i])
                q.push([...path, next[i]])
            }
        }
    }
}

export { knightMoves };

const solution = knightMoves([3,3],[4,3])
console.log(`=> You made it in ${solution.length - 1} moves! Here is your path:`)
for (let cell of solution)
    console.log("  "+JSON.stringify(cell))
