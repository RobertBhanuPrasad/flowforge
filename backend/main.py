from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any
from collections import deque

app = FastAPI()

# ── CORS ──────────────────────────────────────────────────────────────────────
# Frontend runs on localhost:3000, backend on localhost:8000.
# Without this middleware the browser blocks every fetch call (CORS error).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request schema ─────────────────────────────────────────────────────────────
# ReactFlow sends nodes as objects with at minimum an "id" field.
# Edges have "source" and "target" fields pointing to node ids.
class PipelineRequest(BaseModel):
    nodes: list[dict[str, Any]]
    edges: list[dict[str, Any]]


# ── DAG detection — Kahn's Algorithm (BFS topological sort) ───────────────────
# A Directed Acyclic Graph has no cycles.
# Steps:
#   1. Build adjacency list  (source -> list of targets)
#   2. Count in-degree       (how many edges point INTO each node)
#   3. BFS from all zero-in-degree nodes
#   4. If every node gets visited -> no cycle -> is_dag = True
#      If any node is never visited -> it is inside a cycle -> is_dag = False
def check_is_dag(nodes: list[dict], edges: list[dict]) -> bool:
    node_ids = [n["id"] for n in nodes]

    # Build in-degree map — start every node at 0
    in_degree: dict[str, int] = {nid: 0 for nid in node_ids}

    # Build adjacency list
    adj: dict[str, list[str]] = {nid: [] for nid in node_ids}

    for edge in edges:
        src = edge.get("source")
        tgt = edge.get("target")
        # Only count edges whose source and target are known nodes
        if src in in_degree and tgt in in_degree:
            adj[src].append(tgt)
            in_degree[tgt] += 1

    # Start BFS queue with all nodes that have no incoming edges
    queue = deque([nid for nid, deg in in_degree.items() if deg == 0])
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If visited count equals total nodes, no cycle exists
    return visited == len(node_ids)


# ── Health check ───────────────────────────────────────────────────────────────
@app.get("/")
def read_root():
    return {"Ping": "Pong"}


# ── Pipeline parse endpoint ────────────────────────────────────────────────────
# Receives the full pipeline (nodes + edges) from the frontend.
# Returns: number of nodes, number of edges, and whether the graph is a DAG.
@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineRequest):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = check_is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag,
    }
