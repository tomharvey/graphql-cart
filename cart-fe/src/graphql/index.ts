import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("https://mvmree46bve3lnx2sprqrzel2a.appsync-api.eu-west-1.amazonaws.com/graphql", {
    method: "POST",
    ...({"headers":{"x-api-key":"da2-aa3oncl2frbixh6whaongp6kdq"}}),
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

export type Subscription = {
  __typename?: 'Subscription';
  onCartEvent?: Maybe<CartEvent>;
};


export type SubscriptionOnCartEventArgs = {
  cookieId: Scalars['String']['input'];
};

export type AddCartMutationVariables = Exact<{
  cookieId: Scalars['String']['input'];
  createdAt: Scalars['String']['input'];
}>;


export type AddCartMutation = { __typename?: 'Mutation', createCart?: { __typename?: 'Cart', cookieId: string, createdAt: string } | null };

export type AddCartEventMutationVariables = Exact<{
  cookieId: Scalars['String']['input'];
  createdAt: Scalars['String']['input'];
  action: CartAction;
  photoId: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type AddCartEventMutation = { __typename?: 'Mutation', createCartEvent?: { __typename?: 'CartEvent', action: CartAction, cookieId: string, createdAt: string, photoId: string, productId: string, quantity: number } | null };

export type GetCartQueryVariables = Exact<{
  cookieId: Scalars['String']['input'];
}>;


export type GetCartQuery = { __typename?: 'Query', getCart?: { __typename?: 'Cart', cartEvents?: Array<{ __typename?: 'CartEvent', action: CartAction, cookieId: string, createdAt: string, photoId: string, productId: string, quantity: number } | null> | null } | null };

export type SubscribeCartEventSubscriptionVariables = Exact<{
  cookieId: Scalars['String']['input'];
}>;


export type SubscribeCartEventSubscription = { __typename?: 'Subscription', onCartEvent?: { __typename?: 'CartEvent', action: CartAction, cookieId: string, createdAt: string, photoId: string, productId: string, quantity: number } | null };


export const AddCartDocument = `
    mutation addCart($cookieId: String!, $createdAt: String!) {
  createCart(cookieId: $cookieId, createdAt: $createdAt) {
    cookieId
    createdAt
  }
}
    `;
export const useAddCartMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddCartMutation, TError, AddCartMutationVariables, TContext>) =>
    useMutation<AddCartMutation, TError, AddCartMutationVariables, TContext>(
      ['addCart'],
      (variables?: AddCartMutationVariables) => fetcher<AddCartMutation, AddCartMutationVariables>(AddCartDocument, variables)(),
      options
    );
export const AddCartEventDocument = `
    mutation addCartEvent($cookieId: String!, $createdAt: String!, $action: CartAction!, $photoId: String!, $productId: String!, $quantity: Int!) {
  createCartEvent(
    cookieId: $cookieId
    createdAt: $createdAt
    action: $action
    photoId: $photoId
    productId: $productId
    quantity: $quantity
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
    >(options?: UseMutationOptions<AddCartEventMutation, TError, AddCartEventMutationVariables, TContext>) =>
    useMutation<AddCartEventMutation, TError, AddCartEventMutationVariables, TContext>(
      ['addCartEvent'],
      (variables?: AddCartEventMutationVariables) => fetcher<AddCartEventMutation, AddCartEventMutationVariables>(AddCartEventDocument, variables)(),
      options
    );
export const GetCartDocument = `
    query getCart($cookieId: String!) {
  getCart(cookieId: $cookieId) {
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
      variables: GetCartQueryVariables,
      options?: UseQueryOptions<GetCartQuery, TError, TData>
    ) =>
    useQuery<GetCartQuery, TError, TData>(
      ['getCart', variables],
      fetcher<GetCartQuery, GetCartQueryVariables>(GetCartDocument, variables),
      options
    );
export const SubscribeCartEventDocument = `
    subscription SubscribeCartEvent($cookieId: String!) {
  onCartEvent(cookieId: $cookieId) {
    action
    cookieId
    createdAt
    photoId
    productId
    quantity
  }
}
    `;