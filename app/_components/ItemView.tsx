'use client';

type Props = {
  itemComponents: JSX.Element[];
};

export default function ItemView({ itemComponents }: Props) {
  return <>{itemComponents}</>;
}
