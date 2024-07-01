const Loading = ({ text }: { text: string }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-amber-400 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <strong className="mt-4 text-2xl">{text}</strong>
    </div>
  );
};

export default Loading;
