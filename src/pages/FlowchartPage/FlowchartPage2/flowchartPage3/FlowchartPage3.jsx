import React, { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { toast, ToastContainer } from "react-toastify";

const FlowchartPage = () => {
  const NODE_WIDTH = 180;
  const NODE_HEIGHT = 60;
  const COLUMN_GAP = 70; // Gap between columns
  const ROW_GAP = 20; // Gap between nodes in a column

  // Node positioning helper
  const getX = (levelIndex) => 50 + levelIndex * (NODE_WIDTH + COLUMN_GAP);
  const getY = (nodeIndex) => 50 + nodeIndex * (NODE_HEIGHT + ROW_GAP);

  // Flowchart data structure
  const initialNodes = [
    // Left Column (Static information)
    {
      id: "left_1",
      label: "Experiment & Design",
      type: "specialist",
      level: "left",
      x: getX(0),
      y: getY(0),
      hidden: false, // Initially visible
      isAlwaysVisible: true,
      initiallySelected: true, // This node is selected by default at start
    },
    {
      id: "left_2",
      label: "Specialist subjects",
      type: "specialist",
      level: "left",
      x: getX(0),
      y: getY(1),
      hidden: true, // Initially hidden, shown when left_1 is active
      isAlwaysVisible: false,
    },
    {
      id: "left_3",
      label: "Human Sciences",
      type: "green-light",
      level: "left",
      x: getX(0),
      y: getY(2),
      hidden: true, // Initially hidden, shown when left_1 is active
      isAlwaysVisible: false,
    },
    {
      id: "left_4",
      label: "Physical Sciences",
      type: "green-light",
      level: "left",
      x: getX(0),
      y: getY(3),
      hidden: true, // Initially hidden, shown when left_1 is active
      isAlwaysVisible: false,
    },
    {
      id: "left_5",
      label: "Working with Wilderness",
      type: "green-light",
      level: "left",
      x: getX(0),
      y: getY(4),
      hidden: true, // Initially hidden, shown when left_1 is active
      isAlwaysVisible: false,
    },
    {
      id: "left_6",
      label: "CHESS Research Matters",
      type: "darkgreen",
      level: "left",
      x: getX(0),
      y: getY(5),
      hidden: true, // Initially hidden, shown when left_1 is active
      isAlwaysVisible: false,
    },

    // PACE 21 (Main interactive nodes)
    {
      id: "p21_1",
      label: "Could you survive a natural disaster?",
      type: "red",
      level: "pace21",
      x: getX(1),
      y: getY(0),
      hidden: true, // Initially hidden, shown by left_1
    },
    {
      id: "p21_2",
      label: "How do we grow healthy communities?",
      type: "red",
      level: "pace21",
      x: getX(1),
      y: getY(1),
      hidden: true, // Initially hidden, shown by left_1
    },
    {
      id: "p21_3",
      label: "How can I become better, faster, stronger?",
      type: "red",
      level: "pace21",
      x: getX(1),
      y: getY(2),
      hidden: true, // Initially hidden, shown by left_1
    },
    {
      id: "p21_4",
      label: "What on Earth?",
      type: "blue",
      level: "pace21",
      x: getX(1),
      y: getY(3),
      hidden: true, // Initially hidden, shown by left_1
    },
    {
      id: "p21_5",
      label: "What creates a criminal?",
      type: "blue",
      level: "pace21",
      x: getX(1),
      y: getY(4),
      hidden: true, // Initially hidden, shown by left_1
    },
    {
      id: "p21_6",
      label: "Can you be a sporting superstar?",
      type: "purple",
      level: "pace21",
      x: getX(1),
      y: getY(5),
      hidden: true, // Initially hidden, shown by left_1
    },
    {
      id: "p21_7",
      label: "What is the journey from farm to fork?",
      type: "purple",
      level: "pace21",
      x: getX(1),
      y: getY(6),
      hidden: true, // Initially hidden, shown by left_1
    },
    {
      id: "p21_8",
      label: "How do we use technology to improve our lives?",
      type: "green",
      level: "pace21",
      x: getX(1),
      y: getY(7),
      hidden: true, // Initially hidden, shown by left_1
    },
    {
      id: "p21_9",
      label: "Why does it taste like that?",
      type: "green",
      level: "pace21",
      x: getX(1),
      y: getY(8),
      hidden: true, // Initially hidden, shown by left_1
    },

    // PACE 21 REACH (Initially hidden)
    {
      id: "p21r_1",
      label: "Where do I come from?",
      type: "orange",
      level: "reach",
      x: getX(2),
      y: getY(0),
      hidden: true,
    },
    {
      id: "p21r_2",
      label: "How does sports science improve performance?",
      type: "orange",
      level: "reach",
      x: getX(2),
      y: getY(1),
      hidden: true,
    },
    {
      id: "p21r_3",
      label: "What does it mean to be human?",
      type: "orange",
      level: "reach",
      x: getX(2),
      y: getY(2),
      hidden: true,
    },
    {
      id: "p21r_4",
      label: "Are we eating our environment?",
      type: "orange",
      level: "reach",
      x: getX(2),
      y: getY(3),
      hidden: true,
    },
    {
      id: "p21r_5",
      label: "How can we explore the stars?",
      type: "orange",
      level: "reach",
      x: getX(2),
      y: getY(4),
      hidden: true,
    },
    {
      id: "p21r_6",
      label: "Pre-VCE Physical Sciences",
      type: "orange",
      level: "reach",
      x: getX(2),
      y: getY(5),
      hidden: true,
    },
    {
      id: "p21r_7",
      label: "Pre-VCE Human Sciences",
      type: "orange",
      level: "reach",
      x: getX(2),
      y: getY(6),
      hidden: true,
    },
    {
      id: "p21r_8",
      label: "VET Conservation and Ecosystem Management",
      type: "orange",
      level: "reach",
      x: getX(2),
      y: getY(7),
      hidden: true,
    },
    {
      id: "p21r_9",
      label: "VET Animal Care",
      type: "orange",
      level: "reach",
      x: getX(2),
      y: getY(8),
      hidden: true,
    },

    // VCE/VCE-VM/VET (Initially hidden)
    {
      id: "vce_1",
      label: "VCE Health & Human Development",
      type: "vce-node",
      level: "vce",
      x: getX(3),
      y: getY(0),
      hidden: true,
    },
    {
      id: "vce_2",
      label: "VCE PE",
      type: "vce-node",
      level: "vce",
      x: getX(3),
      y: getY(1),
      hidden: true,
    },
    {
      id: "vce_3",
      label: "VCE Psychology",
      type: "vce-node",
      level: "vce",
      x: getX(3),
      y: getY(2),
      hidden: true,
    },
    {
      id: "vce_4",
      label: "VCE Physics",
      type: "vce-node",
      level: "vce",
      x: getX(3),
      y: getY(3),
      hidden: true,
    },
    {
      id: "vce_5",
      label: "VCE Chemistry",
      type: "vce-node",
      level: "vce",
      x: getX(3),
      y: getY(4),
      hidden: true,
    },
    {
      id: "vce_6",
      label: "VCE Biology",
      type: "vce-node",
      level: "vce",
      x: getX(3),
      y: getY(5),
      hidden: true,
    },
    {
      id: "vce_7",
      label: "VCE Environmental Science",
      type: "vce-node",
      level: "vce",
      x: getX(3),
      y: getY(6),
      hidden: true,
    },
  ];

  // Connection mapping between nodes
  const connectionMap = {
    // Left column connections to PACE 21 (These are the base edges for the initial state)
    left_3: ["p21_1", "p21_2", "p21_3"], // Human Sciences to related PACE 21
    left_4: ["p21_4", "p21_5"], // Physical Sciences to related PACE 21
    left_5: ["p21_6", "p21_7"], // Working with Wilderness to related PACE 21
    left_6: ["p21_8", "p21_9"], // CHESS Research Matters to related PACE 21

    // PACE 21 to PACE 21 REACH
    p21_1: ["p21r_1", "p21r_2"],
    p21_2: ["p21r_1", "p21r_2"],
    p21_3: ["p21r_3", "p21r_4"],
    p21_4: ["p21r_5", "p21r_6"],
    p21_5: ["p21r_5", "p21r_6"],
    p21_6: ["p21r_3", "p21r_4"],
    p21_7: ["p21r_7", "p21r_8"],
    p21_8: ["p21r_9"],
    p21_9: ["p21r_7", "p21r_8"],

    // PACE 21 REACH to VCE/VCE-VM/VET
    p21r_1: ["vce_1", "vce_2", "vce_3"],
    p21r_2: ["vce_4", "vce_5"],
    p21r_3: ["vce_6", "vce_7"],
    p21r_4: ["vce_3", "vce_6"],
    p21r_5: ["vce_4", "vce_5", "vce_7"],
    p21r_6: ["vce_4", "vce_5"],
    p21r_7: ["vce_1", "vce_3", "vce_6"],
    p21r_8: ["vce_7"],
    p21r_9: ["vce_6"],
  };

  const svgRef = useRef();
  const [nodes, setNodes] = useState([]); // Initialize as empty array
  const [edges, setEdges] = useState([]);
  const [selectedPace21, setSelectedPace21] = useState(null);
  const [selectedReach, setSelectedReach] = useState(null);

  // Helper to get node CSS classes
  const getNodeClasses = useCallback((node) => {
    let baseClasses = `node group transition-all duration-300 ease-in-out`;
    let typeClasses = "";

    // Node color classes based on type
    switch (node.type) {
      case "specialist":
        typeClasses = "bg-green-600 text-white"; // Experiment & Design, Specialist subjects
        break;
      case "green-light":
        typeClasses = "bg-green-400 text-gray-800"; // Human Sciences, Physical Sciences, etc.
        break;
      case "darkgreen":
        typeClasses = "bg-green-800 text-white"; // CHESS Research Matters
        break;
      case "red":
        typeClasses = "bg-red-500 text-white";
        break;
      case "blue":
        typeClasses = "bg-blue-500 text-white";
        break;
      case "purple":
        typeClasses = "bg-purple-500 text-white";
        break;
      case "green": // PACE 21 green nodes
        typeClasses = "bg-emerald-500 text-white";
        break;
      case "orange": // PACE 21 REACH nodes
        typeClasses = "bg-orange-500 text-white";
        break;
      case "vce-node": // VCE/VCE-VM/VET nodes
        typeClasses = "bg-lime-600 text-white";
        break;
      default:
        typeClasses = "bg-gray-600 text-white";
    }

    // State-based classes
    if (node.hidden) {
      baseClasses += " opacity-0 pointer-events-none"; // Hidden with Tailwind
    } else {
      baseClasses += " opacity-100";
    }

    if (node.disabled) {
      baseClasses += " opacity-50 cursor-not-allowed"; // Disabled state
    } else {
      baseClasses += " cursor-pointer hover:scale-105 hover:shadow-lg"; // Re-add hover scale for non-disabled
    }

    if (node.isSelected) {
      baseClasses += " ring-4 ring-yellow-400 transform scale-105 shadow-xl"; // Selected state with yellow ring and slight scale up
    }

    return `${baseClasses} ${typeClasses}`;
  }, []);

  // Handle node clicks
  const handleNodeClick = useCallback(
    (node) => {
      setNodes((prevNodes) => {
        let newNodes = prevNodes.map((n) => ({ ...n })); // Create a deep copy
        let currentEdges = [];

        // Find the clicked node in the newNodes array
        const clickedNode = newNodes.find((n) => n.id === node.id);
        if (!clickedNode) return prevNodes;

        // --- Logic for "Experiment & Design" (left_1) ---
        if (node.id === "left_1") {
          const isCurrentlySelected = clickedNode.isSelected;

          newNodes = newNodes.map((n) => ({ ...n, isSelected: false })); // Deselect all first

          if (
            isCurrentlySelected &&
            selectedPace21 === null &&
            selectedReach === null
          ) {
            // If left_1 was already selected and no other levels are active, deselect it
            // Reset to initial state: only left_1 visible, others hidden and disabled
            setSelectedPace21(null);
            setSelectedReach(null);
            newNodes = prevNodes.map((n) => ({
              ...n,
              hidden: !n.isAlwaysVisible, // Hide all except initially visible nodes
              disabled: n.id !== "left_1", // Disable all except left_1
              isSelected: n.id === "left_1" ? false : false, // Deselect left_1
            }));
            currentEdges = []; // Clear all dynamic edges
            toast.info("Click 'Experiment & Design' to begin!", {
              autoClose: 3000,
            });
          } else {
            // Select left_1: show all left column (always visible ones), and all PACE 21 nodes
            setSelectedPace21(null);
            setSelectedReach(null);
            newNodes = newNodes.map((n) => ({
              ...n,
              hidden: n.level === "reach" || n.level === "vce", // Hide reach/vce
              disabled: n.level === "left" && n.id !== "left_1" ? true : false, // Disable other left nodes
              isSelected: n.id === node.id,
            }));

            // Show relevant "Specialist subjects" (left column) nodes
            newNodes = newNodes.map((n) =>
              (n.level === "left" && !n.isAlwaysVisible) || n.level === "pace21"
                ? { ...n, hidden: false, disabled: false }
                : n
            );

            // Set edges from relevant left nodes to PACE 21 nodes
            const pace21NodesVisible = newNodes
              .filter((n) => n.level === "pace21" && !n.hidden)
              .map((n) => n.id);
            Object.keys(connectionMap).forEach((sourceId) => {
              if (
                sourceId.startsWith("left_") &&
                newNodes.find((n) => n.id === sourceId && !n.hidden)
              ) {
                connectionMap[sourceId].forEach((targetId) => {
                  if (pace21NodesVisible.includes(targetId)) {
                    currentEdges.push({
                      id: `edge-${sourceId}-${targetId}`,
                      source: sourceId,
                      target: targetId,
                    });
                  }
                });
              }
            });
            toast.info("Click a PACE 21 node to explore learning pathways!", {
              autoClose: 3000,
            });
          }
          setEdges(currentEdges);
          return newNodes;
        }

        // --- Logic for PACE 21 node click ---
        if (node.level === "pace21") {
          // If a PACE 21 node is disabled or left_1 is not selected, show toast and return
          if (
            clickedNode.disabled ||
            !newNodes.find((n) => n.id === "left_1")?.isSelected
          ) {
            toast.warn(
              "Please select 'Experiment & Design' first, then click a PACE 21 node.",
              { autoClose: 3000 }
            );
            return prevNodes;
          }

          if (selectedPace21 === node.id) {
            // Deselect PACE 21 node: Revert to state where left_1 is selected and all PACE21 nodes are visible
            setSelectedPace21(null);
            setSelectedReach(null);
            newNodes = prevNodes.map((n) => {
              // Re-enable/show all PACE21 nodes
              if (n.level === "pace21") {
                return {
                  ...n,
                  hidden: false,
                  disabled: false,
                  isSelected: false,
                };
              }
              // Hide REACH and VCE nodes
              if (n.level === "reach" || n.level === "vce") {
                return {
                  ...n,
                  hidden: true,
                  disabled: true,
                  isSelected: false,
                };
              }
              // Keep left column nodes as they were (left_1 selected, others disabled)
              if (n.level === "left") {
                return { ...n, isSelected: n.id === "left_1" };
              }
              return n;
            });
            // Re-draw edges from left to PACE 21
            Object.keys(connectionMap).forEach((sourceId) => {
              if (
                sourceId.startsWith("left_") &&
                newNodes.find((n) => n.id === sourceId && !n.hidden)
              ) {
                connectionMap[sourceId].forEach((targetId) => {
                  if (
                    newNodes.some(
                      (n) =>
                        n.id === targetId && n.level === "pace21" && !n.hidden
                    )
                  ) {
                    currentEdges.push({
                      id: `edge-${sourceId}-${targetId}`,
                      source: sourceId,
                      target: targetId,
                    });
                  }
                });
              }
            });
          } else {
            // Select new PACE 21 node:
            setSelectedPace21(node.id);
            setSelectedReach(null); // Clear any existing REACH selection

            const relatedReachNodes = connectionMap[node.id] || [];
            newNodes = newNodes.map((n) => {
              // Hide all other PACE 21 nodes (make them disabled, not hidden, based on image)
              if (n.level === "pace21" && n.id !== node.id) {
                return {
                  ...n,
                  hidden: false,
                  disabled: true,
                  isSelected: false,
                }; // Keep visible but disabled
              }
              // Show connected REACH nodes, hide others
              if (n.level === "reach") {
                return {
                  ...n,
                  hidden: !relatedReachNodes.includes(n.id),
                  disabled: !relatedReachNodes.includes(n.id),
                  isSelected: false,
                };
              }
              // Hide all VCE nodes
              if (n.level === "vce") {
                return {
                  ...n,
                  hidden: true,
                  disabled: true,
                  isSelected: false,
                };
              }
              // Keep left_1 selected, disable other left nodes
              if (n.level === "left" && n.id !== "left_1") {
                return { ...n, disabled: true, isSelected: false };
              }
              if (n.id === node.id) {
                return { ...n, isSelected: true, disabled: false };
              }
              return {
                ...n,
                isSelected: n.id === "left_1" ? true : n.isSelected,
              }; // Ensure left_1 remains selected
            });

            // Build edges: Left to selected Pace21, selected Pace21 to related Reach
            const pace21Node = newNodes.find((n) => n.id === node.id);
            if (pace21Node) {
              // Find source nodes for this pace21 node
              const leftSources = Object.keys(connectionMap).filter(
                (sourceId) =>
                  sourceId.startsWith("left_") &&
                  connectionMap[sourceId].includes(node.id)
              );
              leftSources.forEach((sourceId) => {
                currentEdges.push({
                  id: `edge-${sourceId}-${node.id}`,
                  source: sourceId,
                  target: node.id,
                });
              });
            }
            relatedReachNodes.forEach((reachId) => {
              if (newNodes.some((n) => n.id === reachId && !n.hidden)) {
                currentEdges.push({
                  id: `edge-${node.id}-${reachId}`,
                  source: node.id,
                  target: reachId,
                });
              }
            });
          }
        }
        // --- Logic for REACH node click ---
        else if (node.level === "reach") {
          // If no PACE 21 node is selected, or this REACH node is disabled, return
          if (!selectedPace21 || clickedNode.disabled) {
            toast.warn("Please select a PACE 21 node first.", {
              autoClose: 3000,
            });
            return prevNodes;
          }

          if (selectedReach === node.id) {
            // Deselect REACH node: revert to state where selected Pace21 is active, and all its connected REACH nodes are visible
            setSelectedReach(null);
            newNodes = prevNodes.map((n) => {
              const connectedToSelectedPace21 = connectionMap[
                selectedPace21
              ]?.includes(n.id);
              // Show connected REACH nodes, hide VCE
              if (n.level === "reach") {
                return {
                  ...n,
                  hidden: !connectedToSelectedPace21,
                  disabled: !connectedToSelectedPace21, // Enable visible ones
                  isSelected: false,
                };
              }
              if (n.level === "vce") {
                return {
                  ...n,
                  hidden: true,
                  disabled: true,
                  isSelected: false,
                };
              }
              // Keep other levels as they were (Pace21 selected, left_1 selected, others disabled)
              if (n.level === "pace21" && n.id === selectedPace21) {
                return { ...n, isSelected: true, disabled: false };
              }
              return {
                ...n,
                isSelected: n.id === "left_1" ? true : n.isSelected,
              };
            });

            // Rebuild edges: Left to selected Pace21, selected Pace21 to visible Reach
            const pace21Node = newNodes.find((n) => n.id === selectedPace21);
            if (pace21Node) {
              const leftSources = Object.keys(connectionMap).filter(
                (sourceId) =>
                  sourceId.startsWith("left_") &&
                  connectionMap[sourceId].includes(selectedPace21)
              );
              leftSources.forEach((sourceId) => {
                currentEdges.push({
                  id: `edge-${sourceId}-${selectedPace21}`,
                  source: sourceId,
                  target: selectedPace21,
                });
              });

              const relatedReachNodes = connectionMap[selectedPace21] || [];
              relatedReachNodes.forEach((reachId) => {
                if (newNodes.some((n) => n.id === reachId && !n.hidden)) {
                  currentEdges.push({
                    id: `edge-${selectedPace21}-${reachId}`,
                    source: selectedPace21,
                    target: reachId,
                  });
                }
              });
            }
          } else {
            // Select new REACH node: hide other REACH nodes, show connected VCE nodes
            setSelectedReach(node.id);

            const relatedVceNodes = connectionMap[node.id] || [];
            newNodes = newNodes.map((n) => {
              // Hide other REACH nodes (make them disabled)
              if (n.level === "reach" && n.id !== node.id) {
                return {
                  ...n,
                  hidden: false,
                  disabled: true,
                  isSelected: false,
                };
              }
              // Show connected VCE nodes, hide others
              if (n.level === "vce") {
                return {
                  ...n,
                  hidden: !relatedVceNodes.includes(n.id),
                  disabled: !relatedVceNodes.includes(n.id),
                  isSelected: false,
                };
              }
              // Disable other levels
              if (n.level === "left" && n.id !== "left_1") {
                return { ...n, disabled: true };
              }
              if (n.level === "pace21" && n.id !== selectedPace21) {
                return { ...n, disabled: true };
              }
              if (n.id === node.id) {
                return { ...n, isSelected: true, disabled: false }; // Select clicked REACH node
              }
              return {
                ...n,
                isSelected:
                  n.id === selectedPace21 || n.id === "left_1"
                    ? true
                    : n.isSelected,
              }; // Keep Pace21 and left_1 selected
            });

            // Build edges: Left to selected Pace21, selected Pace21 to selected Reach, selected Reach to related VCE
            const pace21Node = newNodes.find((n) => n.id === selectedPace21);
            if (pace21Node) {
              const leftSources = Object.keys(connectionMap).filter(
                (sourceId) =>
                  sourceId.startsWith("left_") &&
                  connectionMap[sourceId].includes(selectedPace21)
              );
              leftSources.forEach((sourceId) => {
                currentEdges.push({
                  id: `edge-${sourceId}-${selectedPace21}`,
                  source: sourceId,
                  target: selectedPace21,
                });
              });
              if (selectedReach) {
                currentEdges.push({
                  id: `edge-${selectedPace21}-${node.id}`,
                  source: selectedPace21,
                  target: node.id,
                });
              }
            }
            relatedVceNodes.forEach((vceId) => {
              if (newNodes.some((n) => n.id === vceId && !n.hidden)) {
                currentEdges.push({
                  id: `edge-${node.id}-${vceId}`,
                  source: node.id,
                  target: vceId,
                });
              }
            });
          }
        }
        // --- Logic for VCE node click (toggle selection only) ---
        else if (node.level === "vce") {
          if (!selectedReach || clickedNode.disabled) {
            toast.warn("Please select a REACH node first.", {
              autoClose: 3000,
            });
            return prevNodes;
          }
          newNodes = newNodes.map((n) =>
            n.id === node.id ? { ...n, isSelected: !n.isSelected } : n
          );
          // Rebuild edges based on current selected states
          const pace21Node = newNodes.find((n) => n.id === selectedPace21);
          if (pace21Node) {
            const leftSources = Object.keys(connectionMap).filter(
              (sourceId) =>
                sourceId.startsWith("left_") &&
                connectionMap[sourceId].includes(selectedPace21)
            );
            leftSources.forEach((sourceId) => {
              currentEdges.push({
                id: `edge-${sourceId}-${selectedPace21}`,
                source: sourceId,
                target: selectedPace21,
              });
            });
            if (selectedReach) {
              currentEdges.push({
                id: `edge-${selectedPace21}-${selectedReach}`,
                source: selectedPace21,
                target: selectedReach,
              });
              const relatedVceNodes = connectionMap[selectedReach] || [];
              relatedVceNodes.forEach((vceId) => {
                if (newNodes.some((n) => n.id === vceId && !n.hidden)) {
                  currentEdges.push({
                    id: `edge-${selectedReach}-${vceId}`,
                    source: selectedReach,
                    target: vceId,
                  });
                }
              });
            }
          }
        }

        setEdges(currentEdges);
        return newNodes;
      });
    },
    [selectedPace21, selectedReach, connectionMap]
  );

  // Draw the flowchart with D3
  const drawFlowchart = useCallback(() => {
    const svg = d3.select(svgRef.current);

    // Clear previous render
    svg.selectAll("*").remove();

    // Group for all elements for zoom/pan
    const g = svg.append("g");

    // Zoom and Pan functionality
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 2]) // Zoom range
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom);

    // Draw edges first (so they are underneath nodes)
    const edgePaths = g.selectAll(".edge").data(edges, (d) => d.id);

    edgePaths
      .enter()
      .append("path")
      .attr("class", "edge stroke-gray-400 stroke-[1.5] animate-dash") // Tailwind classes + custom animation
      .attr("fill", "none")
      .attr("d", (d) => {
        const sourceNode = nodes.find((n) => n.id === d.source);
        const targetNode = nodes.find((n) => n.id === d.target);
        if (
          !sourceNode ||
          !targetNode ||
          sourceNode.hidden ||
          targetNode.hidden
        )
          return "";
        // Smooth S-curve path for better aesthetics and avoiding node overlap
        return `M${sourceNode.x + NODE_WIDTH},${
          sourceNode.y + NODE_HEIGHT / 2
        } C${sourceNode.x + NODE_WIDTH + 50},${
          sourceNode.y + NODE_HEIGHT / 2
        } ${targetNode.x - 50},${targetNode.y + NODE_HEIGHT / 2} ${
          targetNode.x
        },${targetNode.y + NODE_HEIGHT / 2}`;
      })
      .style("opacity", 0) // Start hidden for fade-in
      .transition()
      .duration(500)
      .style("opacity", 1);

    edgePaths
      .transition()
      .duration(500)
      .attr("d", (d) => {
        const sourceNode = nodes.find((n) => n.id === d.source);
        const targetNode = nodes.find((n) => n.id === d.target);
        if (
          !sourceNode ||
          !targetNode ||
          sourceNode.hidden ||
          targetNode.hidden
        )
          return "";
        return `M${sourceNode.x + NODE_WIDTH},${
          sourceNode.y + NODE_HEIGHT / 2
        } C${sourceNode.x + NODE_WIDTH + 50},${
          sourceNode.y + NODE_HEIGHT / 2
        } ${targetNode.x - 50},${targetNode.y + NODE_HEIGHT / 2} ${
          targetNode.x
        },${targetNode.y + NODE_HEIGHT / 2}`;
      })
      .style("opacity", 1);

    edgePaths.exit().transition().duration(300).style("opacity", 0).remove();

    // Draw nodes
    const nodeGroups = g.selectAll(".node-group").data(nodes, (d) => d.id);

    // Enter new nodes
    const enterNodeGroups = nodeGroups
      .enter()
      .append("g")
      .attr("class", (d) => `${getNodeClasses(d)}`) // Tailwind classes via helper
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .on("click", (event, d) => handleNodeClick(d))
      .style("opacity", 0); // Start hidden for fade-in

    enterNodeGroups // Use enterNodeGroups for rect and text
      .append("rect")
      .attr("width", NODE_WIDTH)
      .attr("height", NODE_HEIGHT)
      .attr("rx", 10) // More rounded corners for modern look
      .attr("ry", 10)
      .attr(
        "class",
        "node-rect shadow-lg transition-all duration-300 ease-in-out"
      ); // Tailwind for shadow and transitions

    enterNodeGroups // Use enterNodeGroups for rect and text
      .append("text")
      .attr("x", NODE_WIDTH / 2)
      .attr("y", NODE_HEIGHT / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .text((d) => d.label)
      .attr("class", "node-text text-sm font-semibold pointer-events-none") // Tailwind for text style
      .call(wrapText, NODE_WIDTH - 20); // Wrap text if too long, with padding

    // Merge enter and update selections for common transitions
    const mergedNodeGroups = nodeGroups.merge(enterNodeGroups);

    mergedNodeGroups
      .transition()
      .duration(500) // Slower transition for a smoother feel
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("class", (d) => getNodeClasses(d)) // Update classes for hidden/disabled/selected
      .style("opacity", (d) => (d.hidden ? 0 : 1)); // Ensure opacity matches hidden state

    // Ensure text is re-wrapped on update if needed (though transition won't apply to wrap directly)
    mergedNodeGroups.select(".node-text").call(wrapText, NODE_WIDTH - 20);

    nodeGroups.exit().transition().duration(300).style("opacity", 0).remove();
  }, [nodes, edges, handleNodeClick, getNodeClasses]);

  // Text wrapping function for D3
  function wrapText(text, width) {
    text.each(function () {
      let text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = 0,
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", `${dy}em`);

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width && line.length > 1) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", `${++lineNumber * lineHeight + dy}em`)
            .text(word);
        }
      }

      // Adjust y position for vertical centering of multi-line text
      const totalLines = text.selectAll("tspan").size();
      if (totalLines > 1) {
        const initialY = parseFloat(text.attr("y")); // Original Y (middle of node)
        const textHeight =
          totalLines * lineHeight * parseFloat(text.style("font-size"));
        text
          .selectAll("tspan")
          .attr(
            "y",
            initialY -
              textHeight / 2 +
              (lineHeight * parseFloat(text.style("font-size"))) / 2
          );
      } else {
        text.selectAll("tspan").attr("y", y);
      }
    });
  }

  useEffect(() => {
    // Initial setup: "Experiment & Design" selected by default, and relevant nodes/edges displayed
    setNodes((prevNodes) =>
      initialNodes.map((n) => {
        if (n.id === "left_1") {
          return { ...n, isSelected: true, disabled: false }; // "Experiment & Design" is selected
        }
        return { ...n }; // Use initial hidden/visible state for other nodes
      })
    );

    // Initial toast message on load
    toast.info("Click 'Experiment & Design' to begin!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []); // Run once on mount to set initial state

  useEffect(() => {
    drawFlowchart();
  }, [drawFlowchart, nodes, edges]); // Redraw when nodes or edges change

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-gray-100 flex flex-col items-center p-6 font-sans">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-blue-400 drop-shadow-lg">
        Interactive Learning Pathways
      </h1>
      <div className="relative w-full max-w-7xl bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Adjusted SVG dimensions for a wider view */}
        <svg ref={svgRef} width="1200" height="700"></svg>
      </div>

      {/* Custom CSS for animations and D3 elements */}
      <style>{`
        /* Custom animation for dashed lines */
        .animate-dash {
          stroke-dasharray: 8 5; /* More visible dashes */
          animation: dash 1s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -13; /* Adjusted offset for smooth continuous motion */
          }
        }

        /* Node Rect styling (D3 rect, Tailwind on parent group) */
        .node-rect {
          stroke: #4a5568; /* Darker stroke for contrast */
          stroke-width: 2px;
          transition: stroke 0.3s ease-in-out;
        }

        /* Text inside nodes (D3 text, Tailwind on parent group) */
        .node-text {
          fill: white;
          pointer-events: none; /* Allows click to pass to the group */
          user-select: none; /* Prevent text selection */
        }
      `}</style>
      <ToastContainer />
    </div>
  );
};

export default FlowchartPage;
