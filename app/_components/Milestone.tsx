'use client';

type Props = {
  milestoneDefinition: {
    displayProperties: {
      name: string;
      description: string;
      icon: string;
    };
  };
};

export default function Milestone({ milestoneDefinition }: Props) {
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
