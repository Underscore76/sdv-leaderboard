export default function ChickenSpinner() {
  return (
    <div
      role="status"
      className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2"
    >
      <img
        src="/spinner.png"
        className="animate-reverse-spin mr-2 h-24 w-24 fill-blue-600 text-gray-200 dark:text-gray-600"
      />
    </div>
  );
}
