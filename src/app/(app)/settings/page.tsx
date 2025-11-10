export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <ul className="list-disc pl-5">
        <li>Auth mode: cookie</li>
        <li>API base: {process.env.NEXT_PUBLIC_API_BASE}</li>
      </ul>
    </div>
  );
}
