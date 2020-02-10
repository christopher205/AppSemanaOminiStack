module.exports = function parseStringparseArray(vetorAsString) {
    return vetorAsString.split(",").map(skills => skills.trim());
}