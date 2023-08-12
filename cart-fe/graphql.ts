import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDate: { input: string; output: string; }
  AWSDateTime: { input: string; output: string; }
  AWSEmail: { input: string; output: string; }
  AWSIPAddress: { input: string; output: string; }
  AWSJSON: { input: string; output: string; }
  AWSPhone: { input: string; output: string; }
  AWSTime: { input: string; output: string; }
  AWSTimestamp: { input: number; output: number; }
  AWSURL: { input: string; output: string; }
};

export type Cart = {
  __typename?: 'Cart';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  cartActions?: Maybe<Array<Maybe<CartAction>>>;
  type: Scalars['String']['output'];
};

export type CartAction = {
  __typename?: 'CartAction';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  action: Scalars['String']['output'];
  photoId: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  quantity?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCart?: Maybe<Cart>;
  createCartAction?: Maybe<CartAction>;
};


export type MutationCreateCartArgs = {
  PK: Scalars['ID']['input'];
  SK: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationCreateCartActionArgs = {
  PK: Scalars['ID']['input'];
  SK: Scalars['String']['input'];
  action: Scalars['String']['input'];
  photoId: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  time: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getCart?: Maybe<Cart>;
};


export type QueryGetCartArgs = {
  PK: Scalars['ID']['input'];
};

export type AddCartItemMutationVariables = Exact<{ [key: string]: never; }>;


export type AddCartItemMutation = { __typename?: 'Mutation', createCartAction?: { __typename?: 'CartAction', action: string, photoId: string, productId: string, time?: number | null, quantity?: number | null } | null };

export type CartItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type CartItemsQuery = { __typename?: 'Query', getCart?: { __typename?: 'Cart', cartActions?: Array<{ __typename?: 'CartAction', action: string, photoId: string, productId: string, quantity?: number | null, time?: number | null } | null> | null } | null };


export const AddCartItemDocument = `
    mutation AddCartItem {
  createCartAction(
    action: ""
    photoId: ""
    PK: ""
    productId: ""
    quantity: 10
    SK: ""
    time: 10
    type: ""
  ) {
    action
    photoId
    productId
    time
    quantity
  }
}
    `;
export const useAddCartItemMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AddCartItemMutation, TError, AddCartItemMutationVariables, TContext>
    ) =>
    useMutation<AddCartItemMutation, TError, AddCartItemMutationVariables, TContext>(
      ['AddCartItem'],
      (variables?: AddCartItemMutationVariables) => fetcher<AddCartItemMutation, AddCartItemMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AddCartItemDocument, variables)(),
      options
    );
export const CartItemsDocument = `
    query CartItems {
  getCart(PK: "") {
    cartActions {
      action
      photoId
      productId
      quantity
      time
    }
  }
}
    `;
export const useCartItemsQuery = <
      TData = CartItemsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: CartItemsQueryVariables,
      options?: UseQueryOptions<CartItemsQuery, TError, TData>
    ) =>
    useQuery<CartItemsQuery, TError, TData>(
      variables === undefined ? ['CartItems'] : ['CartItems', variables],
      fetcher<CartItemsQuery, CartItemsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CartItemsDocument, variables),
      options
    );