const solution = function(graph, start, finish) {
  const processed = [];
  const costs = [];
  const parents = {};

  const findLowestCostNode = (costs) =>{
    let lowestCost = Infinity;
    let lowestCostNode = null;
    for (let node in costs) {
      let cost = costs[node];
      if (cost < lowestCost && processed.indexOf(node) === -1) {
        lowestCost = cost;
        lowestCostNode = node;
      }
    }
    return lowestCostNode;
  };

  Object.keys(graph).forEach(node => {
    costs[node] = Infinity;
  });

  costs[start] = 0;

  let node = findLowestCostNode(costs);
  while (node) {
    const cost = costs[node];
    const neighbours = graph[node];
    for (let n in neighbours) {
      const newCost = cost + neighbours[n];
      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = findLowestCostNode(costs);
  }

  const path = [finish];
  let vertexParent = parents[finish];
  while (vertexParent !== start) {
    path.push(vertexParent);
    vertexParent = parents[vertexParent];
  }
  path.push(vertexParent);

  return {
    distance: costs[finish],
    path,
  };
};
