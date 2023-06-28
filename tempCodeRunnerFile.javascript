const XLSX = require('xlsx');

const workbook = XLSX.readFile('./data/Waypoints_collections.xlsx');
const sheetName = workbook.SheetNames[0];

const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

const collections = [];

for (let i = 0; i < 8; i++) {
  collections[i] = [];
}

for (let i = 2; i < jsonData.length; i++) {
  for (let j = 0; j < jsonData[i].length / 2; j++) {
    const x = jsonData[i][2 * j];
    const y = jsonData[i][2 * j + 1];
    collections[j].push({ x, y });
  }
}

function calculateDistance(coord1, coord2) {
  if (!coord1 || !coord2) {
    return Infinity;
  }
  const xDiff = coord2.x - coord1.x;
  const yDiff = coord2.y - coord1.y;
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function findShortestPath(start, end) {
  const distances = {};
  const previous = {};
  const visited = new Set();

  for (let i = 0; i < collections.length; i++) {
    distances[i] = Infinity;
    previous[i] = null;
  }

  distances[start] = 0;

  while (visited.size < collections.length) {
    let minDistance = Infinity;
    let minIndex = null;

    for (let i = 0; i < collections.length; i++) {
      if (!visited.has(i) && distances[i] < minDistance) {
        minDistance = distances[i];
        minIndex = i;
      }
    }

    visited.add(minIndex);

    if (minIndex === end) {
      break;
    }

    for (let i = 0; i < collections.length; i++) {
      if (!visited.has(i) && i !== minIndex) {
        const distance = calculateDistance(
          collections[minIndex][collections[minIndex].length - 1],
          collections[i][0]
        );
        const alt = distances[minIndex] + distance;

        if (alt < distances[i]) {
          distances[i] = alt;
          previous[i] = minIndex;
        }
      }
    }
  }

  const shortestPaths = [];

  for (let i = 0; i < collections.length; i++) {
    const path = [];
    let currentIndex = i;

    while (previous[currentIndex] !== null) {
      const currentPath = collections[currentIndex];
      path.unshift(...currentPath.map(coord => [coord.x, coord.y]));
      currentIndex = previous[currentIndex];
    }

    if (path.length > 0) {
      path.unshift(...collections[currentIndex].map(coord => [coord.x, coord.y]));
      shortestPaths.push(path);
    } else {
      shortestPaths.push([]);
    }
  }

  return shortestPaths;
}

const shortestPaths = [];

for (let i = 0; i < collections.length; i++) {
  const startNode = 0;
  const endNode = i;

  const paths = findShortestPath(startNode, endNode);

  if (paths !== null) {
    shortestPaths.push({ name: `Collection ${i + 1}`, paths });
  } else {
    shortestPaths.push({ name: `Collection ${i + 1}`, paths: [] });
  }
}

console.log(shortestPaths);
