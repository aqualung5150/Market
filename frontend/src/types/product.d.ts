import { PublicUser } from "./user";

interface ImageSelectorProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  newFiles: File[];
  setNewFiles: React.Dispatch<React.SetStateAction<File[]>>;
  prevToDelete: string[];
  setPrevToDelete: React.Dispatch<React.SetStateAction<string[]>>;
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
  condition: number;
  description: string;
  price: number;
  createdAt: Date;
  userId: number;
  categoryId: number;
  images: ProductImageData[];
  user: PublicUser;
}

interface CategoryData {
  id: number;
  label: string;
}

interface ProductDescriptionProps {
  data: ProductData;
}

interface ProductTitleProps extends ProductDescriptionProps {
  paramId: string | undefined;
}

interface ProductImageProps extends ProductDescriptionProps {}

interface ConfirmDelteProps {
  paramId: string | undefined;
  category: CategoryData | undefined;
  openConfirmDelete: boolean;
  setOpenConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
