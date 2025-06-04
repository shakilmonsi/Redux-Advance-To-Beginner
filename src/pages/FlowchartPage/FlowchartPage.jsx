import React, { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlowchartPage = () => {
  // Flowchart data structure
  const initialNodes = [
    // Experiment & Design (Entry point)
    {
      id: "experiment",
      label: "Experiment & Design",
      type: "entry",
      level: "entry",
      x: 50,
      y: 350,
      hidden: false,
    },

    // PACE 21 (Main interactive nodes)
    {
      id: "p21_1",
      label: "Could you survive a natural disaster?",
      type: "red",
      level: "pace21",
      x: 250,
      y: 50,
      hidden: true,
    },
    {
      id: "p21_2",
      label: "How do we grow healthy communities?",
      type: "red",
      level: "pace21",
      x: 250,
      y: 120,
      hidden: true,
    },
    {
      id: "p21_3",
      label: "How can I become better, faster, stronger?",
      type: "red",
      level: "pace21",
      x: 250,
      y: 190,
      hidden: true,
    },
    {
      id: "p21_4",
      label: "What on Earth?",
      type: "blue",
      level: "pace21",
      x: 250,
      y: 260,
      hidden: true,
    },
    {
      id: "p21_5",
      label: "What creates a criminal?",
      type: "blue",
      level: "pace21",
      x: 250,
      y: 330,
      hidden: true,
    },
    {
      id: "p21_6",
      label: "Can you be a sporting superstar?",
      type: "purple",
      level: "pace21",
      x: 250,
      y: 400,
      hidden: true,
    },
    {
      id: "p21_7",
      label: "What is the journey from farm to fork?",
      type: "purple",
      level: "pace21",
      x: 250,
      y: 470,
      hidden: true,
    },
    {
      id: "p21_8",
      label: "How do we use technology to improve our lives?",
      type: "green",
      level: "pace21",
      x: 250,
      y: 540,
      hidden: true,
    },
    {
      id: "p21_9",
      label: "Why does it taste like that?",
      type: "green",
      level: "pace21",
      x: 250,
      y: 610,
      hidden: true,
    },

    // PACE 21 REACH
    {
      id: "p21r_1",
      label: "Where do I come from?",
      type: "orange",
      level: "reach",
      x: 450,
      y: 50,
      hidden: true,
    },
    {
      id: "p21r_2",
      label: "How does sports science improve performance?",
      type: "orange",
      level: "reach",
      x: 450,
      y: 120,
      hidden: true,
    },
    {
      id: "p21r_3",
      label: "What does it mean to be human?",
      type: "orange",
      level: "reach",
      x: 450,
      y: 190,
      hidden: true,
    },
    {
      id: "p21r_4",
      label: "Are we eating our environment?",
      type: "orange",
      level: "reach",
      x: 450,
      y: 260,
      hidden: true,
    },
    {
      id: "p21r_5",
      label: "How can we explore the stars?",
      type: "orange",
      level: "reach",
      x: 450,
      y: 330,
      hidden: true,
    },
    {
      id: "p21r_6",
      label: "Pre-VCE Physical Sciences",
      type: "orange",
      level: "reach",
      x: 450,
      y: 400,
      hidden: true,
    },
    {
      id: "p21r_7",
      label: "Pre-VCE Human Sciences",
      type: "orange",
      level: "reach",
      x: 450,
      y: 470,
      hidden: true,
    },
    {
      id: "p21r_8",
      label: "VET Conservation and Ecosystem Management",
      type: "orange",
      level: "reach",
      x: 450,
      y: 540,
      hidden: true,
    },
    {
      id: "p21r_9",
      label: "VET Animal Care",
      type: "orange",
      level: "reach",
      x: 450,
      y: 610,
      hidden: true,
    },

    // VCE/VCE-VM/VET
    {
      id: "vce_1",
      label: "VCE Health & Human Development",
      type: "orange",
      level: "vce",
      x: 650,
      y: 50,
      hidden: true,
    },
    {
      id: "vce_2",
      label: "VCE PE",
      type: "orange",
      level: "vce",
      x: 650,
      y: 120,
      hidden: true,
    },
    {
      id: "vce_3",
      label: "VCE Psychology",
      type: "green",
      level: "vce",
      x: 650,
      y: 190,
      hidden: true,
    },
    {
      id: "vce_4",
      label: "VCE Physics",
      type: "green",
      level: "vce",
      x: 650,
      y: 260,
      hidden: true,
    },
    {
      id: "vce_5",
      label: "VCE Chemistry",
      type: "green",
      level: "vce",
      x: 650,
      y: 330,
      hidden: true,
    },
    {
      id: "vce_6",
      label: "VCE Biology",
      type: "green",
      level: "vce",
      x: 650,
      y: 400,
      hidden: true,
    },
    {
      id: "vce_7",
      label: "VCE Environmental Science",
      type: "green",
      level: "vce",
      x: 650,
      y: 470,
      hidden: true,
    },
  ];

  // Connection mapping between nodes
  const connectionMap = {
    experiment: [
      "p21_1",
      "p21_2",
      "p21_3",
      "p21_4",
      "p21_5",
      "p21_6",
      "p21_7",
      "p21_8",
      "p21_9",
    ],

    p21_1: ["p21r_1", "p21r_2"],
    p21_2: ["p21r_1", "p21r_2"],
    p21_3: ["p21r_3", "p21r_4"],
    p21_4: ["p21r_5", "p21r_6"],
    p21_5: ["p21r_5", "p21r_6"],
    p21_6: ["p21r_3", "p21r_4"],
    p21_7: ["p21r_7", "p21r_8"],
    p21_8: ["p21r_9"],
    p21_9: ["p21r_7", "p21r_8"],

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
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedPath, setSelectedPath] = useState([]);

  // Helper to get node CSS classes
  const getNodeClasses = (node) => {
    let classes = `node node-${node.type}`;
    if (node.hidden) classes += " hidden";
    if (node.disabled) classes += " disabled";
    if (node.isSelected) classes += " selected";
    return classes;
  };

  // Handle node clicks
  const handleNodeClick = useCallback(
    (node) => {
      // Entry node click - show PACE 21 options
      if (node.level === "entry") {
        const pace21Nodes = connectionMap[node.id] || [];

        setNodes((prev) =>
          prev.map((n) => ({
            ...n,
            hidden: pace21Nodes.includes(n.id) ? false : n.hidden,
            disabled: false,
            isSelected: false,
          }))
        );

        setEdges(
          pace21Nodes.map((targetId) => ({
            id: `edge-${node.id}-${targetId}`,
            source: node.id,
            target: targetId,
          }))
        );

        setSelectedNode(node.id);
        setSelectedPath([node.id]);
        return;
      }

      // PACE 21 node click - show popup for red boxes
      if (
        node.level === "pace21" &&
        node.type === "red" &&
        !selectedPath.includes(node.id)
      ) {
        toast.info("Please choose one from the red boxes under Pace 21!");
        return;
      }

      // If clicking the same node, deselect it
      if (selectedNode === node.id) {
        // Find the node's position in the path
        const nodeIndex = selectedPath.indexOf(node.id);

        // Reset all nodes after this one in the path
        setNodes((prev) =>
          prev.map((n) => ({
            ...n,
            hidden: selectedPath.slice(nodeIndex + 1).includes(n.id)
              ? true
              : n.hidden,
            disabled: false,
            isSelected: false,
          }))
        );

        // Remove edges for deselected path
        setEdges((prev) =>
          prev.filter(
            (e) =>
              !selectedPath.slice(nodeIndex + 1).includes(e.source) &&
              !selectedPath.slice(nodeIndex + 1).includes(e.target)
          )
        );

        // Update selected path
        setSelectedPath((prev) => prev.slice(0, nodeIndex));
        setSelectedNode(nodeIndex > 0 ? selectedPath[nodeIndex - 1] : null);
        return;
      }

      // Normal node selection
      const connectedNodes = connectionMap[node.id] || [];

      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          hidden: connectedNodes.includes(n.id)
            ? false
            : n.level === node.level
            ? false
            : n.hidden,
          disabled: n.level === node.level && n.id !== node.id,
          isSelected: n.id === node.id,
        }))
      );

      // Add edges to connected nodes
      const newEdges = connectedNodes.map((targetId) => ({
        id: `edge-${node.id}-${targetId}`,
        source: node.id,
        target: targetId,
      }));

      setEdges((prev) => [
        ...prev.filter((e) => e.source !== node.id),
        ...newEdges,
      ]);
      setSelectedNode(node.id);
      setSelectedPath((prev) => [
        ...prev.filter((id) => id !== node.id),
        node.id,
      ]);
    },
    [selectedNode, selectedPath]
  );

  // Draw the flowchart with D3
  const drawFlowchart = useCallback(() => {
    const svg = d3.select(svgRef.current);
    const visibleNodes = nodes.filter((n) => !n.hidden);

    // Draw nodes
    const nodeGroups = svg
      .selectAll(".node-group")
      .data(visibleNodes, (d) => d.id);

    // Enter new nodes
    const newNodeGroups = nodeGroups
      .enter()
      .append("g")
      .attr("class", (d) => `node-group ${getNodeClasses(d)}`)
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .on("click", (event, d) => handleNodeClick(d));

    newNodeGroups
      .append("rect")
      .attr("width", 180)
      .attr("height", 60)
      .attr("rx", 8);

    newNodeGroups
      .append("text")
      .attr("x", 90)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .text((d) => d.label);

    // Update existing nodes
    nodeGroups
      .merge(newNodeGroups)
      .transition()
      .duration(300)
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("class", (d) => `node-group ${getNodeClasses(d)}`);

    // Remove exited nodes
    nodeGroups.exit().transition().duration(300).style("opacity", 0).remove();

    // Draw edges
    const edgePaths = svg.selectAll(".edge").data(edges, (d) => d.id);

    edgePaths
      .enter()
      .append("path")
      .attr("class", "edge")
      .attr("fill", "none")
      .attr("stroke", "#666")
      .attr("stroke-width", 2)
      .merge(edgePaths)
      .transition()
      .duration(300)
      .attr("d", (d) => {
        const source = nodes.find((n) => n.id === d.source);
        const target = nodes.find((n) => n.id === d.target);
        if (!source || !target) return "";

        // Create a curved path
        const midX = (source.x + 180 + target.x) / 2;
        return `M${source.x + 180},${source.y + 30} 
                Q${midX},${source.y + 30} ${midX},${target.y + 30}
                T${target.x},${target.y + 30}`;
      });

    edgePaths.exit().transition().duration(300).style("opacity", 0).remove();
  }, [nodes, edges, handleNodeClick]);

  useEffect(() => {
    drawFlowchart();
  }, [drawFlowchart]);

  return (
    <div className="flowchart-container m-auto">
      <h1>Science & Innovation Pathways</h1>
      <svg ref={svgRef} width="800" height="700"></svg>
      <ToastContainer position="top-center" />

      <style jsx>{`
        .flowchart-container {
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
          font-size: 24px;
          font-weight: bold;
        }
        .node rect {
          stroke: #333;
          stroke-width: 1.5px;
          fill: white;
        }
        .node-entry rect {
          fill: #2ecc71;
        }
        .node-red rect {
          fill: #ff6b6b;
        }
        .node-blue rect {
          fill: #74b9ff;
        }
        .node-purple rect {
          fill: #a55eea;
        }
        .node-green rect {
          fill: #2ecc71;
        }
        .node-orange rect {
          fill: #f39c12;
        }
        .node text {
          font-size: 12px;
          fill: white;
          pointer-events: none;
          font-weight: bold;
        }
        .node.disabled rect {
          fill: #ddd;
          stroke: #999;
        }
        .node.selected rect {
          stroke: #f1c40f;
          stroke-width: 3px;
          filter: drop-shadow(0 0 5px rgba(241, 196, 15, 0.7));
        }
        .node.hidden {
          display: none;
        }
        .edge {
          stroke-dasharray: 5;
          animation: dash 1s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 10;
          }
        }
      `}</style>
    </div>
  );
};

export default FlowchartPage;
