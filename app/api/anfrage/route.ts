import { company } from "@/lib/content";
import { handleInquiry } from "@/lib/inquiry";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleInquiry(request, {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_FROM_EMAIL,
    recipient: company.email,
  });
}
