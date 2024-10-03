export default function AccessNotFound() {
  return (
    <div className="w-[100%]">
      <div className="h-screen w-[100%] flex flex-col items-center justify-center text-2xl">
        You do not have access to this page
        <div className="text-sm">
          please upgrade to a different account type
        </div>
      </div>
    </div>
  );
}
