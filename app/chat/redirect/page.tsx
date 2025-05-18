import { redirectToConversation } from "@/actions/chat";

export default async function RedirectPage({ searchParams }: { searchParams: Promise<{ clientId?: string; providerId?: string }> }) {
  const params = await searchParams;
  await redirectToConversation({
    clientId: params.clientId ? Number(params.clientId) : undefined,
    providerId: params.providerId ? Number(params.providerId) : undefined,
  });
  return null;
}