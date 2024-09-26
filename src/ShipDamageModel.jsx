import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedPieChart = ({ percentage, color, label }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="inline-block mx-2 text-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#e6e6e6"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
        <text x="60" y="65" textAnchor="middle" fontSize="20" fill={color}>
          {`${Math.round(progress)}%`}
        </text>
      </svg>
      <p className="mt-2 text-sm font-semibold">{label}</p>
    </div>
  );
};

const ShipDamageInfo = ({ damageInfo }) => {
  return (
    <div className="absolute top-0 left-0 m-4 p-4 bg-white bg-opacity-80 rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-bold mb-2">Cargo Ship: MV Oceanic Explorer</h3>
      <p><span className="font-semibold">Type:</span> Container Ship</p>
      <p><span className="font-semibold">Length:</span> 300 meters</p>
      <p><span className="font-semibold">Capacity:</span> 10,000 TEU</p>
      <p><span className="font-semibold">Damage:</span> Hull breach on starboard side</p>
      <p><span className="font-semibold">Incident Date:</span> September 15, 2024</p>
      <p><span className="font-semibold">Oil Leak:</span> Potential fuel oil leak from damaged area</p>

      {damageInfo && (
        <div className="mt-4">
          <h4 className="text-md font-bold">Damage Details:</h4>
          <p>{damageInfo}</p>
        </div>
      )}
    </div>
  );
};

const DetailedShipOutline = ({ onDamageClick }) => {
	 const shipRef = useRef();
  const [hovered, setHovered] = useState(false);

  const createHullShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-10, 0); // Start at the front of the ship (pointy part)
    shape.lineTo(10, 0); // Straight across the bottom of the ship
    shape.lineTo(8, 3); // Slope upwards towards the back
    shape.lineTo(-8, 3); // Mirror slope on the other side
    shape.lineTo(-10, 0); // Close the shape
    return shape;
  }, []);

  const createHullExtrusion = useMemo(() => {
    const extrudeSettings = { depth: 5, bevelEnabled: false };
    return new THREE.ExtrudeGeometry(createHullShape, extrudeSettings);
  }, [createHullShape]);

  const createDeckLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 5; i++) {
      lines.push(
        new THREE.Vector3(-10, 2 + i * 0.5, 5),
        new THREE.Vector3(10, 2 + i * 0.5, 5),
        new THREE.Vector3(10, 2 + i * 0.5, -5),
        new THREE.Vector3(-10, 2 + i * 0.5, -5),
        new THREE.Vector3(-10, 2 + i * 0.5, 5)
      );
    }
    return lines;
  }, []);

  const createContainers = useMemo(() => {
    const containers = [];
    for (let x = -8; x <= 8; x += 2) {
      for (let y = 2; y <= 6; y += 1) {
        containers.push(
          new THREE.Vector3(x, y, 5), new THREE.Vector3(x + 1.8, y, 5),
          new THREE.Vector3(x + 1.8, y + 0.9, 5), new THREE.Vector3(x, y + 0.9, 5),
          new THREE.Vector3(x, y, 5)
        );
      }
    }
    return containers;
  }, []);

  const createCraneOutline = useMemo(() => [
    new THREE.Vector3(5, 2, 5), new THREE.Vector3(5, 10, 5),
    new THREE.Vector3(7, 10, 5), new THREE.Vector3(7, 2, 5),
    new THREE.Vector3(5, 2, 5), new THREE.Vector3(5, 10, 0),
    new THREE.Vector3(5, 10, 6), new THREE.Vector3(5, 2, 6),
    new THREE.Vector3(7, 2, 6), new THREE.Vector3(7, 10, 6),
    new THREE.Vector3(5, 10, 0),
  ], []);

  const createSmokestack = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 16);
    const material = new THREE.MeshStandardMaterial({ color: 'lightgrey' });
    return { geometry, material };
  }, []);

  const createLifeboat = useMemo(() => {
    const geometry = new THREE.BoxGeometry(1.5, 0.5, 0.5);
    const material = new THREE.MeshStandardMaterial({ color: 'coral' });
    return { geometry, material };
  }, []);

  const bridgePoints = useMemo(() => [
    new THREE.Vector3(-9, 2, 4), new THREE.Vector3(-5, 2, 4),
    new THREE.Vector3(-5, 7, 4), new THREE.Vector3(-9, 7, 4),
    new THREE.Vector3(-9, 2, 4), new THREE.Vector3(-9, 2, -4),
    new THREE.Vector3(-5, 2, -4), new THREE.Vector3(-5, 7, -4),
    new THREE.Vector3(-9, 7, -4), new THREE.Vector3(-9, 2, -4),
    new THREE.Vector3(-5, 2, -4), new THREE.Vector3(-5, 2, 4),
    new THREE.Vector3(-5, 7, 4), new THREE.Vector3(-5, 7, -4),
    new THREE.Vector3(-9, 7, -4), new THREE.Vector3(-9, 7, 4),
  ], []);

  const damageShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(2, 0);
    shape.lineTo(4, 0);
    shape.lineTo(4, 2);
    shape.lineTo(2, 2);
    shape.lineTo(2, 0);
    shape.lineTo(2.5, 0.5);
    shape.lineTo(3, 1);
    shape.lineTo(3.5, 0.7);
    shape.lineTo(4, 1.2);
    shape.lineTo(3.7, 1.8);
    shape.lineTo(3.2, 1.5);
    shape.lineTo(2.8, 1.9);
    shape.lineTo(2.3, 1.6);
    return shape;
  }, []);

  useFrame(() => {
    if (shipRef.current) {
      shipRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={shipRef} position={[0, 0, 0]}>
      {/* Ship Hull */}
      <mesh geometry={createHullExtrusion}>
        <meshStandardMaterial color="lightblue" />
      </mesh>

      {/* Deck, Containers, and Bridge */}
      <Line points={createDeckLines} color="#000000" lineWidth={2} />
      <Line points={createContainers} color="#000000" lineWidth={2} />
      <Line points={createCraneOutline} color="#000000" lineWidth={2} />
      <Line points={bridgePoints} color="#000000" lineWidth={2} />

      {/* Crane */}
      <mesh position={[6, 5, 5]}>
        <mesh {...createCraneOutline} />
        <meshStandardMaterial color="grey" />
      </mesh>

      {/* Smokestack */}
      <mesh position={[0, 6, 5]}>
        <mesh {...createSmokestack} />
      </mesh>

      {/* Lifeboat */}
      <mesh position={[-6, 2, 5]}>
        <mesh {...createLifeboat} />
      </mesh>

      {/* Damage Area */}
      <mesh
        position={[0, 0, 5.01]}
        onClick={() => onDamageClick('A hull breach on a cargo ship is a serious structural damage that compromises the integrity of the vessel. This type of damage can occur due to various reasons, including collisions, grounding, severe weather, or structural failures. The following description covers the essential aspects and implications of a damaged hull on a cargo ship.Puncture: A small but deep penetration often caused by sharp objects, such as debris or collision with a pier.Fracture: A crack or break in the hull structure, which can be caused by stress, fatigue, or impact.Deformation: Bending or warping of the hull, typically resulting from collisions or grounding.Corrosion: Gradual deterioration of the hull material due to exposure to seawater, often leading to thinning and weakening of the structure.')}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <shapeGeometry args={[damageShape]} />
        <meshBasicMaterial color={hovered ? 'darkred' : 'red'} />
      </mesh>

      {/* Text Annotations */}
      <Text position={[-9, 6, 5]} fontSize={0.5} color="black">
        Bridge
        <meshBasicMaterial color="#000000" />
      </Text>
      <Text position={[6, 11, 1]} fontSize={0.5} color="black">
        Crane
        <meshBasicMaterial color="#000000" />
      </Text>
      <Text position={[-6, 4, 1]} fontSize={0.5} color="black">
        Lifeboat
        <meshBasicMaterial color="#000000" />
      </Text>
      <Text position={[0, 0, 5.5]} fontSize={0.5} color="black">
        Damage Area
        <meshBasicMaterial color="#000000" />
      </Text>
    </group>
  );

};

const ThreeDShipModel = () => {
  const [damageInfo, setDamageInfo] = useState(null);

  const handleDamageClick = (info) => {
    setDamageInfo(info);
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      <div className="w-3/4 h-2/3">
        <Canvas camera={{ position: [0, 10, 20], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <DetailedShipOutline onDamageClick={handleDamageClick} />
          <OrbitControls />
        </Canvas>
      </div>
      <div className="mt-4 flex justify-center">
        <AnimatedPieChart percentage={75} color="#4CAF50" label="Structural Integrity" />
        <AnimatedPieChart percentage={60} color="#2196F3" label="Cargo Safety" />
        <AnimatedPieChart percentage={85} color="#FFC107" label="Fuel Containment" />
      </div>
      <ShipDamageInfo damageInfo={damageInfo} />
    </div>
  );
};

export default ThreeDShipModel;
