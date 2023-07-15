'use client';

export default function Milestone({ milestoneDefinition }) {
  return (
    <div>
      <p>Milestone: {milestoneDefinition.displayProperties.name}</p>
      <p>
        Milestone description:
        {milestoneDefinition.displayProperties.description}
      </p>
      <img
        src={`https://www.bungie.net${milestoneDefinition.displayProperties.icon}`}
        alt=""
      />
    </div>
  );
}
