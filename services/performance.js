function estimatePerformance(oldRating, newRating) {
    const delta = newRating - oldRating;

    return Math.max(
        0,
        Math.round(newRating + delta * 2)
    );
}

module.exports = estimatePerformance;