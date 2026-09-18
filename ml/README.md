# ML Module (Planned)

This folder is reserved for the future Machine Learning component of MergeMiles.

The ML system will eventually predict trip-to-trip compatibility using route and travel features, such as:

- `route_overlap_ratio`
- `source_distance`
- `destination_distance`
- `departure_time_difference`
- `detour_distance`
- `shared_route_distance`
- `direction_similarity`

The target output will be a `compatibility_score` between `0` and `1`.

Example:

Trip A + Trip B features:

```text
[0.82, 1.4, 2.1, 8, 3.2, 11.5, 1]
```

Model output:

```text
0.91
```

Meaning approximately **91% compatibility**.

No model training is implemented in this phase.
