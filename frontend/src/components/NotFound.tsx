import { ReactComponent as ErrorIcon } from "assets/error.svg";

const NotFound = ({ title, description }: NotFoundProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <ErrorIcon className="h-56 w-56 fill-black" />
      {title && <span className="text-2xl font-bold">{title}</span>}
      {description && <p className="text-lg">{description}</p>}
    </div>
  );
};

export default NotFound;
