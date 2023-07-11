import FetchManifest from './_components/FetchManifest';
import FetchMilestones from './_components/FetchMilestones';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24">
      <p>hi 👋</p>
      <FetchManifest />
      <FetchMilestones />
    </main>
  );
}
