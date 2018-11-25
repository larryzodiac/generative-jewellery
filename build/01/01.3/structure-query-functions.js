// ------------------------------------------------- //
// Evan MacHale - N00150552
// 24.11.18
// Three.js
// Functions used to setup an object to query our geometry.
// Taken from Threejs.org + rewritten.
// ------------------------------------------------- //

//
const generateLookups = (sourceVertices, sourceFaces, oldVerticesRelationships, sourceEdges) => {
  // for every vertex, add a new object w/ array of objects.
  for (let i = 0; i < sourceVertices.length; i++) {
    oldVerticesRelationships[i] = {vertex:sourceVertices[i], edges:[]};
  }
  for (let i = 0; i < sourceFaces.length; i++) {
    // Three edges of traingle.
    processEdge(sourceFaces[i].a, sourceFaces[i].b, sourceVertices, sourceEdges, sourceFaces[i], oldVerticesRelationships);
    processEdge(sourceFaces[i].b, sourceFaces[i].c, sourceVertices, sourceEdges, sourceFaces[i], oldVerticesRelationships);
    processEdge(sourceFaces[i].c, sourceFaces[i].a, sourceVertices, sourceEdges, sourceFaces[i], oldVerticesRelationships);
  }
}

// processEdge puts all edge objects into metaVertices
// Each edge object holds vertices of the edge and the two faces.
const processEdge = (v1, v2, sourceVertices, sourceEdges, currentFace, metaVertices) => {
  const vertexIndexA = Math.min(v1, v2);
  const vertexIndexB = Math.max(v1, v2);
  const key = vertexIndexA + "_" + vertexIndexB;
  let edge;
  // If edge already exists... our edge var equals that edge.
  // Remember, each edge has two faces...
  // We cross-reference sourceEges with our current vertices.
  if (key in sourceEdges) { // key:value
    edge = sourceEdges[key];
  } else {
    const vertexA = sourceVertices[vertexIndexA];
    const vertexB = sourceVertices[vertexIndexB];
    edge = {
      a: vertexA, // pointer reference
      b: vertexB,
      edgePoint: null,
      // aIndex: a, // numbered reference
      // bIndex: b,
      faces: [] // pointers to faces
    };
    // Give the edge the info
    sourceEdges[key] = edge;
  }
  // Setup facePoint
  const triangle = new THREE.Triangle(sourceVertices[currentFace.a], sourceVertices[currentFace.b], sourceVertices[currentFace.c]);
  let facePoint = new THREE.Vector3();
  triangle.getMidpoint(facePoint); // Result copied into facePoint.
  edge.faces.push({currentFace, facePoint});
  // edge.faces.push(currentFace);
  // For both points on the edge, give them the edge info.
  metaVertices[v1].edges.push(edge);
  // Below ends up with duplicates in metaVertices.edges
  // metaVertices[v2].edges.push(edge);
}
