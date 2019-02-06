const solution = function(graph, start, finish) {
  const used = {};
  const connection = {};
  const distance = {};
  const queue = [];

  used[start] = true;
  connection[start] = start;
  distance[start] = 0;
  queue.push(start);

  while (queue.length) {
    const peak = queue[0];
    const points = Object.keys(graph[peak]);
    let len = Object.keys(graph[peak]).length;

    queue.shift();

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (graph[peak][points[j]] > graph[peak][points[j + 1]]) {
          const tmp = points[j];
          points[j] = points[j + 1];
          points[j + 1] = tmp;
        }
      }
      len--;
    }

    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      if (!used[point]) {
        used[point] = true;
        connection[point] = peak;
        distance[point] = distance[peak] + graph[peak][point];
        queue.push(point);
      } else {
        if (distance[point] > distance[peak] + graph[peak][point]) {
          distance[point] = distance[peak] + graph[peak][point];
          connection[point] = peak;
        }
      }
    }
  }
  const calculateRoute = (finish, connection) => {
    const route = [];
    route.push(finish);
    while (connection[finish] !== finish) {
      route.push(connection[finish]);
      finish = connection[finish];
    }
    route.reverse();
    return route;
  };

  const result = {
    distance: distance[finish],
    path: calculateRoute(finish, connection),
  };

  return result;
};
