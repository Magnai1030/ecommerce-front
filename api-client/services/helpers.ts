import { Filter, Search, Sort } from "@types";
import { isEmpty, forEach, has, assign, isString } from "lodash";

export const DEFAULT_PER_PAGE = 20;
export const DEFAULT_SERVICE_ERROR = "Үйл гүйцэтгэхэд алдаа гарлаа.";

export const extractErrorMessage = (obj: {
  status: number;
  data: string;
}): string => (obj.status === 500 ? "Request failed" : obj.data);

export const errorHandler = (error: any) => {
  const response = error?.response;
  let errorMessage = "Something unexpected has happened, please try again.";

  if (response) {
    const { data, status } = response;
    if (status === 400) {
      const { message = [] } = data;

      errorMessage = Array.isArray(message) ? message.join("<br/>") : message;
    } else {
      errorMessage = JSON.stringify(data); // could be json or string
    }
  }
  return window !== undefined ? new Error(errorMessage) : error;
};

export const errorHandlerWithoutWindow = (error: any) => {
  const response = error?.response;
  let errorMessage = "Something unexpected has happened, please try again.";

  if (response) {
    const { data, status } = response;
    if (status === 400) {
      const { message = [] } = data;

      errorMessage = Array.isArray(message) ? message.join("<br/>") : message;
    } else {
      errorMessage = JSON.stringify(data); // could be json or string
    }
  }
  return new Error(errorMessage);
};

export const isFilterObject = (value: Filter) =>
  ["field", "value", "operator"].every((key) => has(value, key));

export const isSortObject = (value: Sort) =>
  ["field", "direction"].every((key) => has(value, key));

const converFilterToQueryParams = (
  { value, operator, field }: Filter,
  index = 0
) => {
  const filter: {
    [key: string]: string | number | boolean;
  } = {
    [`filtering[${index}][operator]`]: operator || "similarTo",
    [`filtering[${index}][value]`]: `${
      isString(value) ? encodeURIComponent(value.toString().trim()) : value
    }`,
    [`filtering[${index}][field]`]: field,
  };

  return filter;
};

const converSortToQueryParams = ({ field, direction }: Sort, index = 0) => {
  const sort: {
    [key: string]: string | number | boolean;
  } = {
    [`sorting[${index}][field]`]: field,
    [`sorting[${index}][direction]`]: direction,
  };

  return sort;
};

export const generateSearchParams = ($search?: Partial<Search>) => {
  const emptySearch = !$search || isEmpty($search);

  if (emptySearch) {
    return {};
  }

  const params: { [keys: string]: string | number | boolean } = {
    "paging[offset]": 0,
    "paging[limit]": DEFAULT_PER_PAGE,
  };

  if ($search.perPage && $search.currentPage) {
    params["paging[offset]"] = ($search.currentPage - 1) * $search.perPage;
    params["paging[limit]"] = $search.perPage;
  }

  let filterIndex = 0;
  forEach($search.filters, (item: Filter) => {
    if (isFilterObject(item)) {
      assign(params, converFilterToQueryParams(item, filterIndex));

      filterIndex += 1;
    }
  });

  let sortIndex = 0;
  forEach($search.sorts, (item: Sort) => {
    if (isSortObject(item)) {
      assign(params, converSortToQueryParams(item, sortIndex));

      sortIndex += 1;
    }
  });

  if ($search.fetchAll) {
    params.fetchAll = true;
  }

  if ($search.searchKey) {
    params.searchKey = $search.searchKey;
  }

  return params;
};
