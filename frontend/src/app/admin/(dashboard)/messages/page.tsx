import MessagesManager from "@/src/components/admin/MessagesManager";

export const metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
};

export default function AdminMessagesPage() {
  return <MessagesManager />;
}
