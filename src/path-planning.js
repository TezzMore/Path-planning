const XLSX = require('xlsx');

const workbook = XLSX.readFile('./data/Waypoints_collections.xlsx');
const sheetName = workbook.SheetNames[0];

const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

let collections = [];

for (let i = 0; i < 8; i++) {
  collections[i] = [];
}

for (let i = 2; i < jsonData.length; i++) {
  for (let j = 0; j < jsonData[i].length / 2; j++) {
    collections[j].push([jsonData[i][2 * j], jsonData[i][2 * j + 1]]);
  }
}

// Code for Dijkstra's algorithm to find shortest paths for each set of coordinates in `collections`

function dijkstra(graph, source) {
  const distances = {};
  const visited = {};
  const previous = {};
  const queue = [];

  for (const vertex in graph) {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  }

  distances[source] = 0;

  for (const vertex in graph) {
    queue.push(vertex);
  }

  while (queue.length > 0) {
    let currentVertex = queue[0];

    for (let i = 1; i < queue.length; i++) {
      if (distances[queue[i]] < distances[currentVertex]) {
        currentVertex = queue[i];
      }
    }

    queue.splice(queue.indexOf(currentVertex), 1);
    visited[currentVertex] = true;

    const neighbors = graph[currentVertex];

    for (const neighbor in neighbors) {
      const currentDistance = distances[currentVertex] + neighbors[neighbor];

      if (currentDistance < distances[neighbor]) {
        distances[neighbor] = currentDistance;
        previous[neighbor] = currentVertex;
      }
    }
  }

  return { distances, previous };
}

// Find shortest paths for each set of coordinates in `collections`
const shortestPaths = [];

for (const collection of collections) {
  const graph = {};

  for (let i = 0; i < collection.length; i++) {
    const vertex = collection[i].join(',');
    graph[vertex] = {};

    for (let j = 0; j < collection.length; j++) {
      if (i !== j) {
        const otherVertex = collection[j].join(',');
        const distance = Math.abs(collection[i][0] - collection[j][0]) + Math.abs(collection[i][1] - collection[j][1]);
        graph[vertex][otherVertex] = distance;
      }
    }
  }

  const source = collection[0].join(',');
  const { distances } = dijkstra(graph, source);
  shortestPaths.push(distances);
}

console.log(shortestPaths);
