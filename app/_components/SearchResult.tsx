type Props = {
  displayName: string;
  displayNameCode: string;
};

export default function SearchComponent({
  displayName,
  displayNameCode,
}: Props) {
  return (
    <>
      <p>
        {displayName} #{displayNameCode}
      </p>
    </>
  );
}
