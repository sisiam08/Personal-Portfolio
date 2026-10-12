"use server";

import { revalidatePath } from "next/cache";

/**
 * Called by admin clients after a successful write so the public page reflects
 * changes immediately, without removing the 60s ISR cache on the fetchers.
 */
export async function revalidatePublic() {
  revalidatePath("/");
}
