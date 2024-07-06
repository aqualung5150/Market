const Loading = ({ text }: { text: string }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-amber-400 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <strong className="mt-4 text-2xl">{text}</strong>
    </div>
  );
};

export default Loading;
