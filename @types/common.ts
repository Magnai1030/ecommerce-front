import { ReactNode } from "react";

export interface Session {
  expires: string;
  user: UserFromApi;
}

export interface ChildProps {
  children: ReactNode;
}

export interface Paging<PaginationEntity> {
  results: PaginationEntity[];
  total: number;
}

export interface PaginationResult<PaginationEntity>
  extends Paging<PaginationEntity> {
  page: number;
  nextPage?: number;
  previousPage?: number;
  results: PaginationEntity[];
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export enum Operator {
  LESSER_THAN = "<",
  GREATER_THAN = ">",
  EQUAL = "=",
  NOT_EQUAL = "!=",
  LIKE = "like",
  NOT_LIKE = "notLike",
  IN = "in",
  NOT_IN = "notIn",
  IS_NULL = "isNull",
  IS_NOT_NULL = "isNotNull",
  LEFT_JSON_COMPARE = "@>",
  OVERLAP = "&&",
  SIMILAR_TO = "similarTo",
  IS_AFTER = "isAfter",
  IS_BEFORE = "isBefore",
  IS_SAME_OR_AFTER = "isSameOrAfter",
  IS_SAME_OR_BEFORE = "isSameOrBefore",
  ANY = "any",
}

export interface Filter {
  field: string | number;
  value: string | boolean | number | null;
  operator: Operator;
}

export interface Sort {
  field: string;
  direction: SortDirection;
}

export interface Search {
  filters: Filter[];
  sorts: Sort[];
  perPage: number;
  currentPage: number;
  fetchAll: boolean;
  searchKey: string;
}

export type Identified = {
  id: string | number;
};

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  CONTRIBUTOR = "CONTRIBUTOR",
  SALES = "SALES",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface UserFromApi {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  loyaltyBonus: number;
  blockedAmount: number;
  roles: Role[];
  avatarUrl: string | null;
  isActive: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  updatedAt: string;
  createdAt: string;
  addresses: ShipmentAddress[] | undefined;
}

export type UserCreateDTO = Pick<
  UserFromApi,
  | "firstName"
  | "lastName"
  | "phone"
  | "gender"
  | "isActive"
  | "email"
  | "avatarUrl"
> & {
  pinCode: string;
};

export type UserUpdateDTO = Partial<UserCreateDTO>;

export interface BrandFromApi {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFromApi {
  id: string;
  name: string;
  slug: string;
  iconUrl: string;
  description: string;
  coverImageUrl: string;
  isActive: boolean;
  order: number;
  parentId: string;
  createdAt: string;
  updatedAt: string;
  children?: CategoryFromApi[];
}

export type CategoryCreateDTO = Omit<
  CategoryFromApi,
  | "createdAt"
  | "updatedAt"
  | "id"
  | "order"
  | "isActive"
  | "parentId"
  | "children"
> & {
  previousCategoryId: string | null;
  parentId: string | null;
};

export type CategoryUpdateDTO = Partial<CategoryCreateDTO>;

export enum BannerType {
  HOME_SMALL_SLIDER = "HOME_SMALL_SLIDER",
  HOME_BIG_SLIDER = "HOME_BIG_SLIDER",
  CATEGORY_SLIDER = "CATEGORY_SLIDER",
  HOME_FIXED_LONG = "HOME_FIXED_LONG",
}

export interface BannerFromApi {
  id: string;
  description: string;
  bannerType: BannerType;
  mobileLinkType: BannerMobileLink;
  productId?: string;
  imageUrl: string;
  link: string;
  order: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
export interface CollectionFromApi {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  results: ProductFromApi[];
  total: number;
}

export enum Trigger {
  ORDER_CREATED = "ORDER_CREATED",
  ORDER_PAID = "ORDER_PAID",
  ORDER_FAILED = "ORDER_FAILED",
  ORDER_DELIVERED = "ORDER_DELIVERED",
}

export const triggerTranslation: { [key in Trigger]: string } = {
  ORDER_CREATED: "Шинэ захиалга ирэх үед",
  ORDER_PAID: "Төлбөр төлөгдөх үед",
  ORDER_FAILED: "Захиалга цуцлагдах үед",
  ORDER_DELIVERED: "Захиалга хүргэгдэх үед",
};

export enum Action {
  SEND_SMS = "SEND_SMS",
}

export const actionTranslation: { [key in Action]: string } = {
  SEND_SMS: "Мессэж илгээх",
};

export interface ZapFromApi {
  id: string;
  name: string;
  trigger: Trigger;
  action: Action;
  to: string[];
  body: string;
  isActive: boolean;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

export type ZapCreateDTO = Pick<
  ZapFromApi,
  "action" | "trigger" | "to" | "body" | "name" | "isActive"
>;

export type ZapUpdateDTO = Partial<ZapCreateDTO & { isActive: boolean }>;

export type BannerCreateDTO = Omit<
  BannerFromApi,
  "createdAt" | "updatedAt" | "id" | "order"
> & {
  previousBannerId: string | null;
};

export enum FilterBy {
  All = "all",
  Active = "active",
  InActive = "inActive",
}

export const filterTranslation: { [key in FilterBy]: string } = {
  all: "Бүгд",
  active: "Идэвхтэй",
  inActive: "Идэвхгүй",
};

export type BannerUpdateDTO = Partial<BannerCreateDTO>;

export enum ProductStatus {
  NEW = "NEW",
  USED = "USED",
  USED_LIKE_NEW = "USED_LIKE_NEW",
  OPEN_BOX = "OPEN_BOX",
}

export const PRODUCT_CONDITIONS: { [key in ProductStatus]: string } = {
  NEW: "Шинэ",
  USED: "Хуучин",
  USED_LIKE_NEW: "Шинэвтэр",
  OPEN_BOX: "Хайрцаг онгойсон",
};

export interface MediaFromApi {
  file?: {
    id: string;
    smallUrl: string;
    mediumUrl: string;
    originalAccessUrl?: string;
    fileType: "IMAGE" | "VIDEO_URL";
    alt?: string;
  };
  fileId?: string;
  position: number;
}

export interface ProductFromApi {
  id: string;
  name: string;
  description: string;
  shortDescription: string | null;
  unitPrice: number | string;
  status: ProductStatus | string;
  hasDelivery: boolean;
  weight: number | string;
  stock: number;
  createdById: string;
  createdBy: UserFromApi;
  brandId: string;
  categoryId: string;
  isActive: boolean;
  isDraft: boolean;
  unitCost: number;
  sellEmptyStock: boolean;
  tags: string[];
  salePrice: number | null;
  saleStartDate: string;
  saleEndDate: string;
  isSpecial: boolean;
  specialStartDate: string | null;
  specialEndDate: string | null;
  brand: BrandFromApi;
  category: CategoryFromApi;
  createdAt: string;
  updatedAt: string;
  emailBody: string;
  medias: MediaFromApi[];
  variants: ProductVariantFromApi[];
  properties: ProductPropertyFromApi[];
  options: ProductAttributeOption[];
  wishlist: WishlistItem[];
  backgroundImageUrl: string | null;
  footerImages: string[];
}

export type WishlistItem = {
  productId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductIndex = Omit<ProductFromApi, "medias"> & {
  medias: (Pick<MediaFromApi, "position"> & {
    smallUrl: string;
    mediumUrl: string;
    originalAccessUrl: string;
  })[];
};

export interface ProductVariantFromApi {
  id: string;
  name: string;
  isActive: boolean;
  productId: string;
  salePrice: number;
  saleEndDate: string;
  saleStartDate: string;
  stock: number;
  unitPrice: number;
  unitCost: number;
  emailBody: string;
  options: {
    productAttributeValue: ProductAttributeValue;
    productAttributeValueId: string;
  }[];
  createdAt: string;
  updatedAt: string;
  medias: MediaFromApi[];
}

export type ProductVariantCreateDTO = Omit<
  ProductVariantFromApi,
  | "options"
  | "createdAt"
  | "updatedAt"
  | "id"
  | "saleStartDate"
  | "saleEndDate"
  | "unitPrice"
  | "medias"
  | "emailBody"
> & {
  saleStartDate?: string;
  saleEndDate?: string;
  unitPrice?: number;
  optionValues: VariantOptionRow[];
  mediaIds: string[];
};

export interface ProductAttributeValue {
  id: string;
  isActive: boolean;
  name: string;
  persentation: string;
  productAttributeId: string;
  isSelected?: boolean;
  productAttribute: {
    id: string;
    name: string;
  };
}

export interface ProductAttributeFromApi {
  id: string;
  name: string;
}

export interface StatisticsFromApi {
  brandCount: number;
  productCount: number;
  variantCount: number;
  categoryCount: number;
  userCount: number;
  order: {
    total: number;
    today: number;
  };
}

export enum OrderBy {
  Android = "ANDROID",
  IOS = "IOS",
  Web = "WEB",
}

export enum OrderStatisticsBy {
  Total = "total",
  Success = "success",
  Failed = "failed",
  Processing = "processing",
}

export interface OrderStatisticsFromApi {
  total: {
    [key in OrderStatisticsBy]: { count: number; income: number };
  };
  by: {
    [key in OrderBy]: { count: number; income: number };
  };
}

export type ProductAttributeCreateDTO = {
  name: ProductAttributeFromApi["name"];
  categoryId: string;
};

export type ProductCreateDTO = Pick<
  ProductFromApi,
  | "name"
  | "description"
  | "unitPrice"
  | "status"
  | "stock"
  | "weight"
  | "brandId"
  | "categoryId"
  | "isDraft"
  | "unitCost"
  | "sellEmptyStock"
  | "tags"
  | "salePrice"
  | "saleStartDate"
  | "saleEndDate"
  | "emailBody"
> & {
  mediaIds: string[];
  properties: (Pick<ProductPropertyFromApi, "unit" | "value"> & {
    propertyId: string;
  })[];
  variants: VariantTableRow[];
};

export type ProductUpdateDTO = Partial<ProductCreateDTO>;

export interface PropertyFromApi {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PropertyCreateDTO = Omit<
  PropertyFromApi,
  "id" | "createdAt" | "updatedAt" | "isActive"
>;

export enum Unit {
  GB = "GB",
  TB = "TB",
  INCH = "INCH",
}

export interface ProductPropertyFromApi {
  property: Pick<PropertyFromApi, "id" | "name">;
  value: string;
  unit: Unit;
  productId?: ProductFromApi["id"];
}

export interface FileFromApi {
  id: string;
  description: string;
  alt: string;
  extention: string;
  mimeType: string;
  physicalDetails: { key: string }[];
  smallUrl: string;
  mediumUrl: string;
  size: number;
  originalAccessUrl: string;
  createdAt: string;
  updatedAt: string;
  fileType: "IMAGE" | "VIDEO_URL";
}

export interface CartItem {
  id: string;
  quantity: number;
  productId: string;
  variantId: string;
  product: ProductFromApi;
  variant: ProductVariantFromApi;
  createdAt: string;
  updateAt: string;
}

export type CreateCartItemDTO = Pick<CartItem, "quantity" | "productId"> & {
  variantId?: CartItem["variantId"];
};

export type UpdateCartItemDTO = Pick<CartItem, "quantity">;

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  shippingPrice: number;
  currency: "MNT";
  totalItems: number;
}

export type PaymentUrl = {
  name: string;
  logo: string;
  link: string;
  description: string;
};

export interface OrderPayment {
  id: string;
  totalPrice: number;
  isPaid: boolean;
  type: string;
  paidAt: string | null;
  bonusPayment: string;
  createdAt: string;
  updatedAt: string;
  invoices: Invoice[];
  urls?: PaymentUrl[];
}

export interface Invoice {
  invoiceId: string;
  qrImage: string;
  urls: PaymentUrl[];
}

export interface LocationDictionary {
  id: string;
  locationType: LocationType;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export enum LocationType {
  CITY = "CITY",
  DISTRICT = "DISTRICT",
  QUARTER = "QUARTER",
}

export interface ShipmentAddress {
  id: string;
  name: string;
  address: string;
  what3words: string | null;
  city: LocationDictionary;
  district: LocationDictionary;
  quarter: LocationDictionary;
  quarterId: string;
  cityId: string;
  districtId: string;
  userId: string;
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateShipmentAddressDTO = Pick<
  ShipmentAddress,
  | "name"
  | "address"
  | "cityId"
  | "districtId"
  | "quarterId"
  | "isDefault"
  | "what3words"
>;

export type UpdateShipmentAddressDTO = Partial<CreateShipmentAddressDTO>;

export interface OrderShipment {
  id: string;
  shippingPrice: number;
  isCompleted: boolean;
  shippingAddressId: string;
  deliveredAt: string | null;
  what3words: string | null;
  createdAt: string;
  updatedAt: string;
  shippingAddress: ShipmentAddress;
}

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  orderId: string;
  productId: string;
  productVariantId: null;
  createdAt: string;
  updatedAt: string;
  product: ProductFromApi;
  productVariant: ProductVariantFromApi;
}

export interface OrderFromApi {
  id: string;
  totalPrice: number;
  note: string;
  contact: string;
  isIndividual: boolean;
  isRefunded: boolean;
  citizenName: string;
  citizenRegister: string;
  user: UserFromApi;
  userId: string;
  shipmentId: string;
  paymentId: string;
  orderReference: number;
  status: OrderStatus;
  loyaltyBonus: string;
  expireAt: string;
  createdAt: string;
  updatedAt: string;
  payment: OrderPayment;
  shipment: OrderShipment;
  orderItems: OrderItem[];
}

export type CreateOrderDTO = Partial<
  Pick<OrderFromApi, "citizenName" | "citizenRegister" | "contact" | "note">
> & {
  cartItems: CreateCartItemDTO[];
  addressId: string;
  bonusPayment?: number;
  by: "WEB";
  isIndividual: boolean;
};
export type OrderUpdateStatusDTO = {
  status: string;
};

export enum OrderStatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PROCESSING = "PROCESSING",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum StatusWay {
  INCREASE = "INCREASE",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export const WAYOFSTATUS = [
  OrderStatus.PENDING_PAYMENT,
  OrderStatus.PROCESSING,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.COMPLETED,
];

export const orderStepMap: { [key in OrderStatus]: number } = {
  PENDING_PAYMENT: 1,
  PROCESSING: 2,
  OUT_FOR_DELIVERY: 3,
  COMPLETED: 4,
  FAILED: 4,
  REFUNDED: 4,
};

export const statusTranslation: { [key in OrderStatus]: string } = {
  PENDING_PAYMENT: "ТӨЛБӨР ХҮЛЭЭХ",
  PROCESSING: "ТӨЛБӨР ТӨЛӨГДСӨН",
  OUT_FOR_DELIVERY: "ХҮРГЭЛТЭНД ГАРСАН",
  COMPLETED: "АМЖИЛТТАЙ ДУУССАН",
  FAILED: "ЗАХИАЛГА ЦУЦЛАГДСАН",
  REFUNDED: "ЗАХИАЛГА БУЦААГДСАН",
};

export enum OrderFilterBy {
  ALL = "ALL",
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PROCESSING = "PROCESSING",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export const orderStatusTranslation: { [key in OrderFilterBy]: string } = {
  ALL: "Бүгд",
  PENDING_PAYMENT: "Төлбөр хүлээх",
  PROCESSING: "Төлбөр төлөгдсөн",
  OUT_FOR_DELIVERY: "Хүргэлтэнд гарсан",
  COMPLETED: "Амжилттай дууссан",
  FAILED: "Захиалга цуцлагдсан",
  REFUNDED: "Захиалга буцаагдсан",
};

export type ProductAttributeOption = ProductAttributeFromApi & {
  values: Pick<
    ProductAttributeValue,
    "id" | "name" | "persentation" | "isSelected"
  >[];
};

export type VariantTableRow = Pick<
  ProductVariantFromApi,
  "name" | "isActive" | "unitPrice" | "stock"
> & {
  id?: string;
  optionValues: VariantOptionRow[];
  productId?: string;
};

export type VariantOptionRow = Pick<
  ProductAttributeValue,
  "id" | "name" | "persentation" | "productAttributeId"
> & { productAttributeName: string };

export type ProductFormData = Omit<
  ProductFromApi,
  | "saleStartDate"
  | "saleEndDate"
  | "medias"
  | "id"
  | "createdById"
  | "createdBy"
  | "categoryId"
  | "isActive"
  | "isSpecial"
  | "specialStartDate"
  | "specialEndDate"
  | "createdAt"
  | "updatedAt"
  | "brand"
  | "category"
  | "salePrice"
  | "unitPrice"
  | "shortDescription"
  | "variants"
> & {
  id?: string;
  category?: Pick<CategoryFromApi, "id" | "name">;
  saleStartDate: Date;
  saleEndDate: Date;
  medias: FileFromApi[];
  options: ProductAttributeOption[];
  salePrice: undefined | number;
  unitPrice: undefined | number;
  variants: VariantTableRow[];
  errors: { [key in keyof ProductUpdateDTO]: boolean };
};

export type CategoryNode = Pick<CategoryFromApi, "slug"> & {
  value: CategoryFromApi["id"];
  label: CategoryFromApi["name"];
  children: CategoryNode[];
  checked: boolean;
};

export enum BannerMobileLink {
  SEARCH = "SEARCH",
  PRODUCT = "PRODUCT",
}

export const bannerMobileLinkTranslation: {
  [key in BannerMobileLink]: string;
} = {
  SEARCH: "Хайлтын хуудас",
  PRODUCT: "Бүтээгдэхүүн",
};

export type DeviceType = {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
};

export const authTypes = {
  SET_USER_INFO: "SET_USER_INFO",
  SET_ADDRESSES: "SET_ADDRESSES",
  ADD_ADDRESSES: "ADD_ADDRESSES",
  REMOVE_ADDRESS_BY_ID: "REMOVE_ADDRESS_BY_ID",
  UPDATE_ADDRESS: "UPDATE_ADDRESS",
};

export enum AuthFormType {
  SIGNIN = "SIGNIN",
  SIGNUP = "SIGNUP",
  SUCCESS = "SUCCESS",
  FORGOTPIN = "FORGOTPIN",
  VERIFYPHONE = "VERIFYPHONE",
  VERIFYEMAIL = "VERIFYEMAIL",
  CHANGEPIN = "CHANGEPIN",
}

export enum ProductDetailsType {
  SELECT = "SELECT",
  CART = "CART",
}
