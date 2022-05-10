import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Contact = {
  __typename?: 'Contact';
  contactNumbers: Array<PhoneNumber>;
  createdBy: Scalars['String'];
  createdOn: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  phoneNumbers: PhoneNumber;
  role: Scalars['String'];
  updatedBy: Scalars['String'];
  updatedOn: Scalars['String'];
};

export type ContactInput = {
  createdBy: Scalars['String'];
  name: Scalars['String'];
  role: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContact: Contact;
  createPhoneNumber: PhoneNumber;
  deleteContact: Scalars['Boolean'];
  deletePhoneNumber: Scalars['Boolean'];
  updateContact?: Maybe<Contact>;
  updatePhoneNumber?: Maybe<PhoneNumber>;
};


export type MutationCreateContactArgs = {
  input: ContactInput;
};


export type MutationCreatePhoneNumberArgs = {
  input: PhoneNumberInput;
};


export type MutationDeleteContactArgs = {
  id: Scalars['Float'];
};


export type MutationDeletePhoneNumberArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateContactArgs = {
  id: Scalars['Float'];
  name: Scalars['String'];
  role: Scalars['String'];
  updatedBy: Scalars['String'];
};


export type MutationUpdatePhoneNumberArgs = {
  id: Scalars['Float'];
  phoneNumber: Scalars['String'];
  phoneNumberType: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  contactId: Scalars['Float'];
  createdBy: Scalars['String'];
  createdOn: Scalars['String'];
  id: Scalars['Float'];
  phoneNumber?: Maybe<Scalars['String']>;
  phoneNumberType: Scalars['String'];
  updatedBy: Scalars['String'];
  updatedOn: Scalars['String'];
};

export type PhoneNumberInput = {
  contactId: Scalars['Float'];
  createdBy: Scalars['String'];
  phoneNumber: Scalars['String'];
  phoneNumberType: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  contact?: Maybe<Contact>;
  contacts: Array<Contact>;
  phoneNumber?: Maybe<PhoneNumber>;
  phoneNumbers: Array<PhoneNumber>;
};


export type QueryContactArgs = {
  id: Scalars['Float'];
};


export type QueryPhoneNumberArgs = {
  id: Scalars['Float'];
};

export type UpdateContactMutationVariables = Exact<{
  updatedBy: Scalars['String'];
  role: Scalars['String'];
  name: Scalars['String'];
  updateContactId: Scalars['Float'];
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact?: { __typename?: 'Contact', id: number, name: string, role: string } | null };

export type ContactQueryVariables = Exact<{
  contactId: Scalars['Float'];
}>;


export type ContactQuery = { __typename?: 'Query', contact?: { __typename?: 'Contact', id: number, name: string, role: string, createdBy: string, createdOn: string, updatedBy: string, updatedOn: string } | null };

export type ContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactsQuery = { __typename?: 'Query', contacts: Array<{ __typename?: 'Contact', id: number, name: string, role: string, contactNumbers: Array<{ __typename?: 'PhoneNumber', phoneNumber?: string | null, phoneNumberType: string }> }> };


export const UpdateContactDocument = gql`
    mutation UpdateContact($updatedBy: String!, $role: String!, $name: String!, $updateContactId: Float!) {
  updateContact(
    updatedBy: $updatedBy
    role: $role
    name: $name
    id: $updateContactId
  ) {
    id
    name
    role
  }
}
    `;

export function useUpdateContactMutation() {
  return Urql.useMutation<UpdateContactMutation, UpdateContactMutationVariables>(UpdateContactDocument);
};
export const ContactDocument = gql`
    query Contact($contactId: Float!) {
  contact(id: $contactId) {
    id
    name
    role
    createdBy
    createdOn
    updatedBy
    updatedOn
  }
}
    `;

export function useContactQuery(options: Omit<Urql.UseQueryArgs<ContactQueryVariables>, 'query'>) {
  return Urql.useQuery<ContactQuery>({ query: ContactDocument, ...options });
};
export const ContactsDocument = gql`
    query Contacts {
  contacts {
    id
    name
    role
    contactNumbers {
      phoneNumber
      phoneNumberType
    }
  }
}
    `;

export function useContactsQuery(options?: Omit<Urql.UseQueryArgs<ContactsQueryVariables>, 'query'>) {
  return Urql.useQuery<ContactsQuery>({ query: ContactsDocument, ...options });
};