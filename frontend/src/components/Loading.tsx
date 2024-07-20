const Loading = ({ text }: { text: string }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="h-12 w-12 animate-spin rounded-full border-4 border-black border-b-transparent" />
      <strong className="mt-4 text-2xl">{text}</strong>
    </div>
  );
};

export default Loading;
