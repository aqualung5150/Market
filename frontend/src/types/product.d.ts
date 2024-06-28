import { PublicUser } from "./user";

interface ImageSelectorProps {
  files: File[];
  urls: string[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
  handleFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ProductImageData {
  id: number;
  url: string;
  order: number;
  main: boolean;
  productId: number;
}

interface ProductData {
  id: number;
  title: string;
  status: number;
  description: string;
  price: number;
  createdAt: Date;
  userId: number;
  categoryId: number;
  images: ProductImageData[];
  user: PublicUser;
}
