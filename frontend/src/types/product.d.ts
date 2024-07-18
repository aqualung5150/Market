import { PublicUser } from "./user";

interface ImageSelectorProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  newFiles: File[];
  setNewFiles: React.Dispatch<React.SetStateAction<File[]>>;
  // prevToDelete: string[];
  // setPrevToDelete: React.Dispatch<React.SetStateAction<string[]>>;
  existingFiles: string[];
  setExistingFiles: React.Dispatch<React.SetStateAction<string[]>>;
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

interface ProductsData {
  totalSize: number;
  products: ProductData[];
}

interface CategoryData {
  id: number;
  label: string;
}

interface ProductDescriptionProps {
  data: ProductData;
}

interface ProductTitleProps {
  data: ProductData;
  paramId: string | undefined;
}

interface ProductImageProps {
  data: ProductData;
}

interface ConfirmDelteProps {
  paramId: string | undefined;
  category: CategoryData | undefined;
  openConfirmDelete: boolean;
  setOpenConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SetStatusModalProps {
  data: ProductData;
  openSetStatus: boolean;
  setOpenSetStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SearchParamsProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

interface PaginationProps extends SearchParamsProps {
  totalSize: number;
  displaySize: number;
  interval: number;
}

interface ProductFilterProps extends SearchParamsProps {
  keyword: string | undefined;
}

interface SelectedFilter {
  name: string;
  text: string;
}

interface SellerInfoProps {
  seller: PublicUser;
}
