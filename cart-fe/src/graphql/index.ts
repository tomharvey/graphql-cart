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
  cartEvents?: Maybe<Array<Maybe<CartEvent>>>;
  cookieId: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
};

export enum CartAction {
  Add = 'ADD',
  Remove = 'REMOVE'
}

export type CartEvent = {
  __typename?: 'CartEvent';
  action: CartAction;
  cookieId: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  photoId: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCart?: Maybe<Cart>;
  createCartEvent?: Maybe<CartEvent>;
};


export type MutationCreateCartArgs = {
  cookieId: Scalars['String']['input'];
  createdAt: Scalars['String']['input'];
};


export type MutationCreateCartEventArgs = {
  action: CartAction;
  cookieId: Scalars['String']['input'];
  createdAt: Scalars['String']['input'];
  photoId: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  getCart?: Maybe<Cart>;
};


export type QueryGetCartArgs = {
  cookieId: Scalars['String']['input'];
};

export type AddCartMutationVariables = Exact<{ [key: string]: never; }>;


export type AddCartMutation = { __typename?: 'Mutation', createCart?: { __typename?: 'Cart', cookieId: string, createdAt: string } | null };

export type AddCartEventMutationVariables = Exact<{ [key: string]: never; }>;


export type AddCartEventMutation = { __typename?: 'Mutation', createCartEvent?: { __typename?: 'CartEvent', action: CartAction, cookieId: string, createdAt: string, photoId: string, productId: string, quantity: number } | null };

export type GetCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartQuery = { __typename?: 'Query', getCart?: { __typename?: 'Cart', cartEvents?: Array<{ __typename?: 'CartEvent', action: CartAction, cookieId: string, createdAt: string, photoId: string, productId: string, quantity: number } | null> | null } | null };


export const AddCartDocument = `
    mutation addCart {
  createCart(cookieId: "", createdAt: "") {
    cookieId
    createdAt
  }
}
    `;
export const useAddCartMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AddCartMutation, TError, AddCartMutationVariables, TContext>
    ) =>
    useMutation<AddCartMutation, TError, AddCartMutationVariables, TContext>(
      ['addCart'],
      (variables?: AddCartMutationVariables) => fetcher<AddCartMutation, AddCartMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AddCartDocument, variables)(),
      options
    );
export const AddCartEventDocument = `
    mutation addCartEvent {
  createCartEvent(
    action: ADD
    cookieId: ""
    createdAt: ""
    photoId: ""
    productId: ""
    quantity: 1
  ) {
    action
    cookieId
    createdAt
    photoId
    productId
    quantity
  }
}
    `;
export const useAddCartEventMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AddCartEventMutation, TError, AddCartEventMutationVariables, TContext>
    ) =>
    useMutation<AddCartEventMutation, TError, AddCartEventMutationVariables, TContext>(
      ['addCartEvent'],
      (variables?: AddCartEventMutationVariables) => fetcher<AddCartEventMutation, AddCartEventMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AddCartEventDocument, variables)(),
      options
    );
export const GetCartDocument = `
    query getCart {
  getCart(cookieId: "") {
    cartEvents {
      action
      cookieId
      createdAt
      photoId
      productId
      quantity
    }
  }
}
    `;
export const useGetCartQuery = <
      TData = GetCartQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetCartQueryVariables,
      options?: UseQueryOptions<GetCartQuery, TError, TData>
    ) =>
    useQuery<GetCartQuery, TError, TData>(
      variables === undefined ? ['getCart'] : ['getCart', variables],
      fetcher<GetCartQuery, GetCartQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCartDocument, variables),
      options
    );