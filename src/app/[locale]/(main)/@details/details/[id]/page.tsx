import { DetailsPanel } from '~/components/details-panel';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function DetailsPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { page } = await searchParams;

  console.log('DetailsPage id:', id);

  return <DetailsPanel characterId={id} currentPage={page ?? '1'} />;
}
