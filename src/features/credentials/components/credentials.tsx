"use client";
// ! this component get all credentials using suspence

import React from "react";
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useRouter } from "next/navigation";
import { CredentialType, type Credential } from "@/generated/prisma/browser";
import { KeyIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useCredentialsParams } from "../hooks/use-credentials-params";
import {
  useCreateCredential,
  useRemoveCredential,
  useSuspenseCredentials,
} from "../hooks/use-credentials";
import Image from "next/image";

export const CredentialsPagination = () => {
  const credentials = useSuspenseCredentials();
  const [params, setParams] = useCredentialsParams();

  return (
    <EntityPagination
      disabled={credentials.isPending}
      totalPages={credentials.data.totalPages}
      page={credentials.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    ></EntityPagination>
  );
};

export const CredentialsSearch = () => {
  const [params, setParams] = useCredentialsParams();
  const { searchValue, onSearchChange } = useEntitySearch(params, setParams);

  return (
    <EntitySearch
      value={searchValue}
      placeholder="Search Credentials"
      onChange={onSearchChange}
    ></EntitySearch>
  );
};

export const CredentialsList = () => {
  const credentials = useSuspenseCredentials();

  return (
    <>
      <EntityList
        items={credentials.data.items}
        getKey={(credential) => credential.id}
        renderItem={(credential) => <CredentialsItem data={credential} />}
        emptyView={<CredentialsEmpty />}
      />
    </>
  );
};

export const CredentialsHeader = ({ disabled }: { disabled?: boolean }) => {
  return (
    <>
      <EntityHeader
        title="Credentials"
        description="Create and Manage your credentials"
        newButtonHref={"/credentials/new"}
        newButtonLabel="New credential"
        disabled={disabled}
      />
    </>
  );
};

export const CredentialsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<CredentialsHeader />}
      search={<CredentialsSearch />}
      pagination={<CredentialsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const CredentialsLoading = () => {
  return <LoadingView message="Loading Credentials ..." />;
};

export const CredentialsError = () => {
  return <ErrorView message="Error loading credentials ..." />;
};

export const CredentialsEmpty = () => {
  const createCredential = useCreateCredential();
  const router = useRouter();

  const handleCreate = () => {
    router.push(`/credentials/new`);
  };

  return (
    <>
      <EmptyView
        message="You haven't created any credentials yet. Get started by creating your first credential"
        onNew={handleCreate}
      />
    </>
  );
};

const credentialLogos = {
  [CredentialType.ANTHROPIC]: "/logos/anthropic.svg",
  [CredentialType.GEMINI]: "/logos/gemini.svg",
  [CredentialType.OPENAI]: "/logos/openai.svg",
};

export const CredentialsItem = ({
  data,
}: {
  data: Pick<Credential, "id" | "name" | "type" | "createdAt" | "updatedAt">;
}) => {
  const removeCredentials = useRemoveCredential();
  const handleRemove = () => {
    removeCredentials.mutate({ id: data.id });
  };

  const logo = credentialLogos[data.type];
  return (
    <EntityItem
      href={`/credentials/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <Image src={logo} alt={data.type} width={20} height={20} />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeCredentials.isPending}
    />
  );
};
